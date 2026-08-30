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
  currentBlobUrl: null,
  currentArtworkUrl: null,

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

    document.addEventListener('visibilitychange', () => {
      if (SettingsManager.get('playback.smartPause.onAppSwitch') && document.hidden && this.isPlaying) {
        this.pause();
      }
    });

    this.audio.addEventListener('volumechange', () => {
      if (SettingsManager.get('playback.smartPause.onVolumeZero') && this.audio.volume === 0 && this.isPlaying) {
        this.pause();
      }
    });
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

    this.buildEQ();

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

  getTrackUrl(track) {
    if (!track) return null;
    if (track.blob) {
      return URL.createObjectURL(track.blob);
    }
    if (track.url) {
      return track.url;
    }
    return null;
  },

  getTrackArtwork(track) {
    if (!track) return null;
    if (track.artworkBlob) {
      return URL.createObjectURL(track.artworkBlob);
    }
    if (track.artwork) {
      return track.artwork;
    }
    return null;
  },

  revokeCurrentUrls() {
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }
    if (this.currentArtworkUrl) {
      URL.revokeObjectURL(this.currentArtworkUrl);
      this.currentArtworkUrl = null;
    }
  },

  async loadTrack(track, autoPlay = true) {
    if (!track) return;

    this.revokeCurrentUrls();
    this.saveListenProgress();

    this.currentTrack = track;
    this.currentPosition = 0;
    this.repeatCount = 0;

    const url = this.getTrackUrl(track);
    if (!url) {
      console.error('No audio source for track:', track.title);
      console.warn('Cannot play: file not available');
      setTimeout(() => this.next(), 500);
      return;
    }
    this.currentBlobUrl = url;

    const artwork = this.getTrackArtwork(track);
    if (artwork && artwork.startsWith('blob:')) {
      this.currentArtworkUrl = artwork;
    }

    if (!this.audioCtx) this.initAudioContext();
    if (this.audioCtx.state === 'suspended') await this.audioCtx.resume();

    this.audio.src = url;
    this.audio.load();

    if (SettingsManager.get('ui.dynamicTheming')) {
      const artSrc = artwork || 'assets/default-art.png';
      if (artSrc.startsWith('blob:') || artSrc.startsWith('http') || artSrc.startsWith('data:')) {
        try {
          const colors = await Utils.extractColors(artSrc);
          window.dispatchEvent(new CustomEvent('theme-colors', { detail: colors }));
        } catch(e) {}
      }
    }

    this.updateMediaSession(track, artwork);
    this.startListenTracking();

    if (autoPlay) {
      await this.play();
    }

    window.dispatchEvent(new CustomEvent('track-changed', { detail: { ...track, artwork } }));
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

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.isPaused = false;

      if (SettingsManager.get('audio.skipSilence')) this.startSkipSilence();

      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: true } }));
      Utils.vibrate(15);
    } catch(err) {
      console.error('Play failed:', err);
      if (err.name !== 'AbortError') {
        console.warn('Playback error:', err.message || 'Unknown');
      }
    }
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

  resetTrack() {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.currentPosition = 0;
      if (this.isPlaying) {
        this.play();
      }
    }
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

    const url = this.getTrackUrl(nextTrack);
    if (!url) { this.next(); return; }

    const duration = SettingsManager.get('audio.crossfadeDuration');

    this.nextAudio = new Audio(url);
    this.nextAudio.preload = 'auto';

    await new Promise((resolve, reject) => {
      this.nextAudio.addEventListener('canplay', resolve, { once: true });
      this.nextAudio.addEventListener('error', reject, { once: true });
      setTimeout(reject, 5000);
    });

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
      this.revokeCurrentUrls();

      this.audio = this.nextAudio;
      this.sourceNode = this.nextSource;
      this.gainNode = this.nextGain;
      this.gainNode.disconnect();

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
      this.currentBlobUrl = url;
      this.setupAudioEvents();

      const artwork = this.getTrackArtwork(nextTrack);
      window.dispatchEvent(new CustomEvent('track-changed', { detail: { ...nextTrack, artwork } }));
    }, duration * 1000);
  },

  async preloadNext() {
    const nextIdx = this.queueIndex + 1;
    if (nextIdx >= this.queue.length) return;
    const nextTrack = this.queue[nextIdx];
    if (!nextTrack) return;
    const url = this.getTrackUrl(nextTrack);
    if (!url) return;

    const preload = new Audio();
    preload.src = url;
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
    const err = this.audio.error;
    if (err) {
      const msgs = {
        1: 'Aborted',
        2: 'Network error',
        3: 'Decode error',
        4: 'Format not supported'
      };
      console.warn('Audio error code:', msgs[err.code] || 'Unknown');
    }
    setTimeout(() => this.next(), 1000);
  },

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
        const current = this.audio.currentTime;
        const duration = this.audio.duration;
        if (current + 0.5 < duration) {
          this.audio.currentTime += 0.5;
        }
      }
    }, 500);
  },

  stopSkipSilence() {
    if (this.skipSilenceInterval) { clearInterval(this.skipSilenceInterval); this.skipSilenceInterval = null; }
  },

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

  setQueue(tracks, startIndex = 0) {
    this.queue = tracks;
    this.queueIndex = startIndex;
    this.shuffleHistory = [];
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
  },

  addToQueue(tracks, position = 'end') {
    if (position === 'next') {
      const before = this.queue.slice(0, this.queueIndex + 1);
      const after = this.queue.slice(this.queueIndex + 1);
      this.queue = [...before, ...tracks, ...after];
    } else {
      this.queue = [...this.queue, ...tracks];
    }
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
  },

  removeFromQueue(index) {
    if (index === this.queueIndex) return;
    this.queue.splice(index, 1);
    if (index < this.queueIndex) this.queueIndex--;
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
    window.dispatchEvent(new CustomEvent('queue-updated'));
  },

  moveQueueItem(from, to) {
    const item = this.queue.splice(from, 1)[0];
    this.queue.splice(to, 0, item);
    if (from === this.queueIndex) this.queueIndex = to;
    else if (from < this.queueIndex && to >= this.queueIndex) this.queueIndex--;
    else if (from > this.queueIndex && to <= this.queueIndex) this.queueIndex++;
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
    window.dispatchEvent(new CustomEvent('queue-updated'));
  },

  saveQueue() {
    try {
      const data = this.queue.map(t => ({
        id: t.id,
        title: t.title,
        artist: t.artist,
        album: t.album,
        duration: t.duration,
        artwork: t.artwork,
        path: t.path,
        hash: t.hash
      }));
      localStorage.setItem('okvy_queue', JSON.stringify({ tracks: data, index: this.queueIndex }));
    } catch(e) {}
  },

  loadQueue() {
    try {
      const saved = localStorage.getItem('okvy_queue');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.queue = parsed.tracks || [];
        this.queueIndex = parsed.index || 0;
      }
    } catch(e) {}
  },

  startListenTracking() {
    if (!this.currentTrack) return;
    this.listenStartTime = Date.now();
    this.listenPositionStart = this.audio.currentTime;
  },

  saveListenProgress(completed = false) {
    if (!this.currentTrack || !this.listenStartTime) return;

    const listenDuration = (Date.now() - this.listenStartTime) / 1000;
    const trackDuration = this.audio.duration || 0;
    const minSeconds = SettingsManager.get('history.minListenSeconds');
    const minPercent = SettingsManager.get('history.minListenPercent');

    const percentListened = trackDuration > 0 ? (listenDuration / trackDuration) * 100 : 0;

    if (completed || (listenDuration >= minSeconds && percentListened >= minPercent)) {
      this.currentTrack.playCount = (this.currentTrack.playCount || 0) + 1;
      this.currentTrack.lastPlayed = Date.now();
      Data.saveTrack(this.currentTrack);

      if (SettingsManager.get('history.scrobbleEnabled')) {
        this.scrobbleTrack(this.currentTrack);
      }
    }

    this.listenStartTime = null;
  },

  async scrobbleTrack(track) {
    const creds = SettingsManager.get('history.lastFm');
    if (!creds.sessionKey) return;

    const params = {
      method: 'track.scrobble',
      api_key: creds.apiKey,
      sk: creds.sessionKey,
      artist: track.artist,
      track: track.title,
      timestamp: Math.floor(Date.now() / 1000),
      format: 'json'
    };

    params.api_sig = this.lastFmSign(params, creds.apiSecret);

    try {
      await fetch('https://ws.audioscrobbler.com/2.0/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params)
      });
    } catch(e) {}
  },

  lastFmSign(params, secret) {
    const sorted = Object.keys(params).sort().map(k => k + params[k]).join('');
    return Utils.md5(sorted + secret);
  },

  setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
      navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        this.seekSeconds(this.audio.currentTime - (details.seekOffset || 10));
      });
      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        this.seekSeconds(this.audio.currentTime + (details.seekOffset || 10));
      });
    }
  },

  updateMediaSession(track, artwork) {
    if ('mediaSession' in navigator && track) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title || 'Unknown',
        artist: track.artist || '-',
        album: track.album || '',
        artwork: artwork ? [{ src: artwork, sizes: '512x512', type: 'image/jpeg' }] : []
      });
    }
  },

  setSleepTimer(mode, value) {
    this.stopSleepTimer();
    if (mode === 'tracks') {
      this.sleepTracksRemaining = value;
    } else {
      this.sleepTimer = setTimeout(() => {
        this.pause();
        this.stopSleepTimer();
      }, value * 60000);
    }
  },

  stopSleepTimer() {
    if (this.sleepTimer) { clearTimeout(this.sleepTimer); this.sleepTimer = null; }
    this.sleepTracksRemaining = 0;
  }
};
