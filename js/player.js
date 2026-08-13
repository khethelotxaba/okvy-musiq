const Player = {
  audio: null,
  audioCtx: null,
  sourceNode: null,
  gainNode: null,
  eqNodes: [],
  analyser: null,
  compressor: null,
  crossfadeGain: null,
  nextAudio: null,
  nextSource: null,
  nextGain: null,

  queue: [],
  queueIndex: 0,
  currentTrack: null,
  isPlaying: false,
  isPaused: false,
  repeatCount: 0,
  shuffleHistory: [],

  sleepTimer: null,
  sleepTracksRemaining: 0,

  fadeInterval: null,
  crossfadeInterval: null,
  skipSilenceInterval: null,

  peakValue: 0,
  peakSmooth: 0,

  currentPosition: 0,

  async init() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.setupAudioEvents();
    this.loadQueue();
    this.setupMediaSession();
    this.startPeakLoop();
  },

  setupAudioEvents() {
    this.audio.addEventListener('ended', () => this.onTrackEnded());
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('error', (e) => this.onError(e));
    this.audio.addEventListener('loadedmetadata', () => {
      if (SettingsManager.get('audio.gaplessPlayback') && this.queueIndex < this.queue.length - 1) {
        this.preloadNext();
      }
    });

    // Smart pause
    document.addEventListener('visibilitychange', () => {
      if (SettingsManager.get('playback.smartPause.onAppSwitch') && document.hidden && this.isPlaying) {
        this.pause();
      }
    });

    // Volume zero detection
    if ('onvolumechange' in this.audio) {
      this.audio.addEventListener('volumechange', () => {
        if (SettingsManager.get('playback.smartPause.onVolumeZero') && this.audio.volume === 0 && this.isPlaying) {
          this.pause();
        }
      });
    }
  },

  initAudioContext() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
    this.gainNode = this.audioCtx.createGain();
    this.crossfadeGain = this.audioCtx.createGain();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;

    this.compressor = this.audioCtx.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;

    // Build EQ chain
    this.buildEQ();

    // Connect: source -> EQ -> compressor -> gain -> analyser -> destination
    let lastNode = this.sourceNode;
    if (SettingsManager.get('audio.equalizerEnabled') && this.eqNodes.length > 0) {
      lastNode.connect(this.eqNodes[0]);
      for (let i = 0; i < this.eqNodes.length - 1; i++) {
        this.eqNodes[i].connect(this.eqNodes[i+1]);
      }
      lastNode = this.eqNodes[this.eqNodes.length - 1];
    }

    lastNode.connect(this.compressor);
    this.compressor.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.crossfadeGain.connect(this.gainNode);

    this.applyEQPreset();
  },

  buildEQ() {
    this.eqNodes = [];
    const freqs = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    freqs.forEach(f => {
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = f;
      filter.Q.value = 1.4;
      filter.gain.value = 0;
      this.eqNodes.push(filter);
    });
  },

  applyEQPreset() {
    if (!this.audioCtx) return;
    const presetName = SettingsManager.get('audio.eqCurrentPreset');
    const presets = SettingsManager.get('audio.eqPresets');
    const custom = SettingsManager.get('audio.eqCustomValues');
    let values;

    if (presetName === 'Custom') values = custom;
    else {
      const preset = presets.find(p => p.name === presetName);
      values = preset ? preset.values : custom;
    }

    this.eqNodes.forEach((node, i) => {
      if (values[i] !== undefined) node.gain.value = values[i];
    });
  },

  setEQBand(index, value) {
    if (this.eqNodes[index]) this.eqNodes[index].gain.value = value;
  },

  async loadTrack(track, autoPlay = true) {
    if (!track) return;
    this.currentTrack = track;
    this.currentPosition = 0;
    this.repeatCount = 0;

    if (!this.audioCtx) this.initAudioContext();
    if (this.audioCtx.state === 'suspended') await this.audioCtx.resume();

    this.audio.src = track.url;
    this.audio.load();

    // Dynamic theming
    if (SettingsManager.get('ui.dynamicTheming') && track.artwork) {
      const colors = await Utils.extractColors(track.artwork);
      window.dispatchEvent(new CustomEvent('theme-colors', { detail: colors }));
    }

    // Media session
    this.updateMediaSession(track);

    // History
    this.startListenTracking();

    if (autoPlay) {
      await this.play();
    }

    window.dispatchEvent(new CustomEvent('track-changed', { detail: track }));
  },

  async play() {
    if (!this.audio.src) return;
    if (this.audioCtx?.state === 'suspended') await this.audioCtx.resume();

    const fadeDur = SettingsManager.get('audio.playPauseFadeDuration') || 0;
    if (fadeDur > 0 && this.gainNode) {
      this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + fadeDur);
    }

    await this.audio.play();
    this.isPlaying = true;
    this.isPaused = false;

    if (SettingsManager.get('audio.skipSilence')) this.startSkipSilence();

    window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: true } }));
    Utils.vibrate(15);
  },

  async pause() {
    const fadeDur = SettingsManager.get('audio.playPauseFadeDuration') || 0;
    if (fadeDur > 0 && this.gainNode && this.audioCtx) {
      this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + fadeDur);
      await new Promise(r => setTimeout(r, fadeDur * 1000));
    }

    this.audio.pause();
    this.isPlaying = false;
    this.isPaused = true;
    this.stopSkipSilence();
    this.saveListenProgress();
    window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false } }));
  },

  async togglePlay() {
    if (this.isPlaying) await this.pause();
    else await this.play();
  },

  async next() {
    if (this.queue.length === 0) return;

    const crossfade = SettingsManager.get('audio.crossfadeDuration');
    if (crossfade > 0 && this.isPlaying) {
      await this.crossfadeToNext();
      return;
    }

    this.queueIndex = this.getNextIndex();
    const nextTrack = this.queue[this.queueIndex];
    if (nextTrack) await this.loadTrack(nextTrack);
  },

  async prev() {
    if (this.queue.length === 0) return;
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    this.queueIndex = this.getPrevIndex();
    const prevTrack = this.queue[this.queueIndex];
    if (prevTrack) await this.loadTrack(prevTrack);
  },

  getNextIndex() {
    const mode = SettingsManager.get('playback.repeatMode');
    if (mode === 'one') return this.queueIndex;
    if (mode === 'n' && this.repeatCount < (SettingsManager.get('playback.repeatNTimes') || 1) - 1) {
      this.repeatCount++;
      return this.queueIndex;
    }
    this.repeatCount = 0;

    if (SettingsManager.get('playback.shuffleMode')) {
      let idx;
      do { idx = Math.floor(Math.random() * this.queue.length); }
      while (idx === this.queueIndex && this.queue.length > 1);
      return idx;
    }

    let next = this.queueIndex + 1;
    if (next >= this.queue.length) {
      if (mode === 'all') next = 0;
      else next = this.queue.length - 1;
    }
    return next;
  },

  getPrevIndex() {
    if (SettingsManager.get('playback.shuffleMode')) {
      return Math.max(0, this.queueIndex - 1);
    }
    let prev = this.queueIndex - 1;
    if (prev < 0) prev = SettingsManager.get('playback.repeatMode') === 'all' ? this.queue.length - 1 : 0;
    return prev;
  },

  async crossfadeToNext() {
    const nextIdx = this.getNextIndex();
    const nextTrack = this.queue[nextIdx];
    if (!nextTrack) return;

    const duration = SettingsManager.get('audio.crossfadeDuration');

    // Setup next audio
    this.nextAudio = new Audio(nextTrack.url);
    this.nextAudio.preload = 'auto';
    await new Promise(r => this.nextAudio.addEventListener('canplay', r, { once: true }));

    this.nextSource = this.audioCtx.createMediaElementSource(this.nextAudio);
    this.nextGain = this.audioCtx.createGain();
    this.nextGain.gain.value = 0;
    this.nextSource.connect(this.nextGain);
    this.nextGain.connect(this.crossfadeGain);

    this.nextAudio.play();

    const startTime = this.audioCtx.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    this.nextGain.gain.linearRampToValueAtTime(1, startTime + duration);

    setTimeout(() => {
      this.audio.pause();
      this.audio.src = '';
      this.sourceNode.disconnect();

      this.audio = this.nextAudio;
      this.sourceNode = this.nextSource;
      this.gainNode = this.nextGain;
      this.gainNode.disconnect();

      // Reconnect to chain
      let lastNode = this.sourceNode;
      if (SettingsManager.get('audio.equalizerEnabled') && this.eqNodes.length > 0) {
        lastNode.connect(this.eqNodes[0]);
        for (let i = 0; i < this.eqNodes.length - 1; i++) {
          this.eqNodes[i].connect(this.eqNodes[i+1]);
        }
        lastNode = this.eqNodes[this.eqNodes.length - 1];
      }
      lastNode.connect(this.compressor);
      this.compressor.connect(this.gainNode);
      this.gainNode.connect(this.analyser);

      this.nextAudio = null;
      this.nextSource = null;
      this.nextGain = null;

      this.queueIndex = nextIdx;
      this.currentTrack = nextTrack;
      this.setupAudioEvents();
      window.dispatchEvent(new CustomEvent('track-changed', { detail: nextTrack }));
    }, duration * 1000);
  },

  async preloadNext() {
    const nextIdx = this.queueIndex + 1;
    if (nextIdx >= this.queue.length) return;
    const nextTrack = this.queue[nextIdx];
    if (!nextTrack?.url) return;

    const preload = new Audio();
    preload.src = nextTrack.url;
    preload.preload = 'metadata';
    preload.load();
  },

  seek(percent) {
    if (!this.audio.duration) return;
    this.audio.currentTime = (percent / 100) * this.audio.duration;
  },

  seekSeconds(seconds) {
    if (!this.audio.duration) return;
    this.audio.currentTime = Utils.clamp(seconds, 0, this.audio.duration);
  },

  setVolume(vol) {
    this.audio.volume = Utils.clamp(vol, 0, 1);
  },

  getCurrentTime() { return this.audio?.currentTime || 0; },
  getDuration() { return this.audio?.duration || 0; },
  getProgress() {
    const d = this.getDuration();
    return d > 0 ? (this.getCurrentTime() / d) * 100 : 0;
  },

  onTrackEnded() {
    this.saveListenProgress(true);

    if (this.sleepTimer) {
      this.sleepTracksRemaining--;
      if (this.sleepTracksRemaining <= 0) {
        this.stopSleepTimer();
        this.pause();
        return;
      }
    }

    const mode = SettingsManager.get('playback.repeatMode');
    if (mode === 'one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }

    if (this.queueIndex >= this.queue.length - 1 && mode !== 'all') {
      this.isPlaying = false;
      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false, ended: true } }));
      return;
    }

    this.next();
  },

  onTimeUpdate() {
    this.currentPosition = this.audio.currentTime;
    window.dispatchEvent(new CustomEvent('time-update', { 
      detail: { current: this.audio.currentTime, duration: this.audio.duration, progress: this.getProgress() }
    }));
  },

  onError(e) {
    console.error('Audio error:', e);
    window.dispatchEvent(new CustomEvent('player-error', { detail: e }));
  },

  // Skip silence
  startSkipSilence() {
    if (!this.analyser) return;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    const threshold = SettingsManager.get('audio.skipSilenceThreshold');

    this.skipSilenceInterval = setInterval(() => {
      if (!this.isPlaying) return;
      this.analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a,b) => a+b, 0) / dataArray.length;
      const db = 20 * Math.log10(avg / 255);

      if (db < threshold) {
        // Find next non-silent section
        const current = this.audio.currentTime;
        const duration = this.audio.duration;
        // Simple approach: jump ahead 0.5s and check again
        if (current + 0.5 < duration) {
          this.audio.currentTime += 0.5;
        }
      }
    }, 500);
  },

  stopSkipSilence() {
    if (this.skipSilenceInterval) { clearInterval(this.skipSilenceInterval); this.skipSilenceInterval = null; }
  },

  // Peak visualization
  startPeakLoop() {
    const loop = () => {
      requestAnimationFrame(loop);
      if (!this.analyser || !this.isPlaying) {
        this.peakValue = 0;
        this.peakSmooth = this.peakSmooth * 0.9;
        return;
      }
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      const avg = data.reduce((a,b) => a+b, 0) / data.length;
      this.peakValue = avg / 255;
      this.peakSmooth = this.peakSmooth * 0.8 + this.peakValue * 0.2;

      window.dispatchEvent(new CustomEvent('audio-peak', { detail: { peak: this.peakValue, smooth: this.peakSmooth } }));
    };
    requestAnimationFrame(loop);
  },

  // Queue management
  setQueue(tracks, startIndex = 0) {
    this.queue = tracks;
    this.queueIndex = startIndex;
    this.shuffleHistory = [];
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
  },

  addToQueue(tracks, position = 'end') {
    if (position === 'end') this.queue.push(...tracks);
    else if (position === 'next') this.queue.splice(this.queueIndex + 1, 0, ...tracks);
    else if (position === 'now') {
      this.queue.splice(this.queueIndex + 1, 0, ...tracks);
      if (this.isPlaying) this.next();
    }
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
    window.dispatchEvent(new CustomEvent('queue-updated', { detail: this.queue }));
  },

  removeFromQueue(index) {
    if (index === this.queueIndex) return;
    if (index < this.queueIndex) this.queueIndex--;
    this.queue.splice(index, 1);
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
    window.dispatchEvent(new CustomEvent('queue-updated', { detail: this.queue }));
  },

  moveQueueItem(from, to) {
    const item = this.queue.splice(from, 1)[0];
    this.queue.splice(to, 0, item);
    if (from === this.queueIndex) this.queueIndex = to;
    else if (from < this.queueIndex && to >= this.queueIndex) this.queueIndex--;
    else if (from > this.queueIndex && to <= this.queueIndex) this.queueIndex++;
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
    window.dispatchEvent(new CustomEvent('queue-updated', { detail: this.queue }));
  },

  clearQueue() {
    this.queue = [];
    this.queueIndex = 0;
    if (SettingsManager.get('playback.persistentQueue')) Data.saveQueue([], 0, 0);
    window.dispatchEvent(new CustomEvent('queue-updated', { detail: this.queue }));
  },

  async saveQueue() {
    await Data.saveQueue(this.queue.map(t => t.id), this.queueIndex, this.currentPosition);
  },

  async loadQueue() {
    if (!SettingsManager.get('playback.persistentQueue')) return;
    const saved = await Data.loadQueue();
    if (!saved || !saved.queue) return;
    const tracks = await Data.getTracks();
    this.queue = saved.queue.map(id => tracks.find(t => t.id === id)).filter(Boolean);
    this.queueIndex = saved.index || 0;
    this.currentPosition = saved.position || 0;
    if (this.queue[this.queueIndex]) {
      this.currentTrack = this.queue[this.queueIndex];
      this.audio.src = this.currentTrack.url;
      if (this.currentPosition > 0) this.audio.currentTime = this.currentPosition;
    }
  },

  // Listen tracking
  listenStartTime: 0,
  listenTracked: false,

  startListenTracking() {
    this.listenStartTime = Date.now();
    this.listenTracked = false;
  },

  async saveListenProgress(completed = false) {
    if (!this.currentTrack || this.listenTracked) return;
    const elapsed = (Date.now() - this.listenStartTime) / 1000;
    const duration = this.getDuration();
    const percent = duration > 0 ? (elapsed / duration) * 100 : 0;

    const minSec = SettingsManager.get('history.minListenSeconds');
    const minPct = SettingsManager.get('history.minListenPercent');

    if (completed || (elapsed >= minSec && percent >= minPct)) {
      this.listenTracked = true;
      await Data.addHistoryEntry(this.currentTrack.id, Math.round(elapsed * 1000), Math.round(this.currentPosition * 1000), completed);

      // Scrobble
      if (SettingsManager.get('history.scrobbleEnabled')) {
        this.scrobbleTrack(this.currentTrack);
      }

      // Update auto playlists
      if (SettingsManager.get('smart.mostPlayedAutoUpdate')) {
        await Data.refreshAutoPlaylists();
      }
    }

    if (SettingsManager.get('playback.persistentQueue')) {
      this.saveQueue();
    }
  },

  // Last.fm scrobbling
  async scrobbleTrack(track) {
    const session = SettingsManager.get('history.lastFm.sessionKey');
    if (!session) return;
    const apiKey = SettingsManager.get('history.lastFm.apiKey');
    const apiSecret = SettingsManager.get('history.lastFm.apiSecret');
    if (!apiKey || !apiSecret) return;

    const params = {
      method: 'track.scrobble',
      api_key: apiKey,
      sk: session,
      artist: track.artist || 'Unknown',
      track: track.title || 'Unknown',
      timestamp: Math.floor(Date.now() / 1000)
    };
    if (track.album) params.album = track.album;

    const sig = this.lastFmSign(params, apiSecret);
    params.api_sig = sig;
    params.format = 'json';

    try {
      await fetch('https://ws.audioscrobbler.com/2.0/', {
        method: 'POST',
        body: new URLSearchParams(params)
      });
    } catch(e) {}
  },

  lastFmSign(params, secret) {
    const sorted = Object.keys(params).sort().map(k => k + params[k]).join('');
    return CryptoJS ? CryptoJS.MD5(sorted + secret).toString() : '';
  },

  // Sleep timer
  startSleepTimer(minutes) {
    this.stopSleepTimer();
    if (SettingsManager.get('playback.sleepTimer.mode') === 'tracks') {
      this.sleepTracksRemaining = minutes;
    } else {
      this.sleepTimer = setTimeout(() => {
        this.pause();
        this.stopSleepTimer();
      }, minutes * 60000);
    }
  },

  stopSleepTimer() {
    if (this.sleepTimer) { clearTimeout(this.sleepTimer); this.sleepTimer = null; }
    this.sleepTracksRemaining = 0;
  },

  // Media Session
  updateMediaSession(track) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title || 'Unknown',
      artist: track.artist || 'Unknown Artist',
      album: track.album || 'Unknown Album',
      artwork: track.artwork ? [{ src: track.artwork, sizes: '512x512', type: 'image/jpeg' }] : []
    });

    navigator.mediaSession.setActionHandler('play', () => this.play());
    navigator.mediaSession.setActionHandler('pause', () => this.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
    navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime) this.seekSeconds(details.seekTime);
    });
  },

  setupMediaSession() {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.setActionHandler('play', () => this.play());
    navigator.mediaSession.setActionHandler('pause', () => this.pause());
  }
};
