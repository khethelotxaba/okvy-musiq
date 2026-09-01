const Player = {
  audio: null,
  audioCtx: null,
  sourceNode: null,
  gainNode: null,
  eqNodes: [],
  analyser: null,
  compressor: null,
  boostGain: null,
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
  preloadAudio: null,
  preloadUrl: null,
  deviceSnapshot: null,
  scheduledPlayTimer: null,
  scheduleAfterTrackCount: 0,
  repeatSection: { enabled: false, start: null, end: null },

  peakValue: 0,
  peakSmooth: 0,
  peakData: null,
  peakLastFrame: 0,
  transitionToken: 0,
  _audioEventsBound: false,
  _pauseTimer: null,

  currentPosition: 0,
  currentBlobUrl: null,
  currentArtworkUrl: null,

  async init() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.setupAudioEvents();
    this.loadQueue();
    this.setupMediaSession();
    this.setupAudioDeviceMonitoring();
    this.startPeakLoop();
  },

  setupAudioEvents() {
    if (!this.audio || this._audioEventsBound) return;
    this._audioEventsBound = true;

    this.audio.addEventListener('ended', () => this.onTrackEnded());
    this.audio.addEventListener('timeupdate', () => {
      this.onTimeUpdate();
      this.checkRepeatSection();
    });
    this.audio.addEventListener('error', (e) => this.onError(e));
    this.audio.addEventListener('loadedmetadata', () => {
      if (SettingsManager.get('audio.gaplessPlayback')) this.preloadNext();
    });
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.isPaused = false;
      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: true } }));
    });
    this.audio.addEventListener('pause', () => {
      if (!this.audio.ended) {
        this.isPlaying = false;
        this.isPaused = true;
        window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false } }));
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
    if (!AudioContext) return;

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
    this.boostGain = this.audioCtx.createGain();

    this.buildEQ();
    this.rebuildAudioGraph();
    this.applyEQPreset();
  },

  rebuildAudioGraph() {
    if (!this.audioCtx || !this.sourceNode || !this.compressor || !this.gainNode || !this.analyser) return;

    try { this.sourceNode.disconnect(); } catch(e) {}
    for (const node of this.eqNodes) {
      try { node.disconnect(); } catch(e) {}
    }
    try { this.compressor.disconnect(); } catch(e) {}
    try { this.gainNode.disconnect(); } catch(e) {}
    try { this.boostGain?.disconnect(); } catch(e) {}
    try { this.analyser.disconnect(); } catch(e) {}

    let lastNode = this.sourceNode;
    if (SettingsManager.get('audio.equalizerEnabled') && this.eqNodes.length > 0) {
      lastNode.connect(this.eqNodes[0]);
      for (let i = 0; i < this.eqNodes.length - 1; i++) {
        this.eqNodes[i].connect(this.eqNodes[i + 1]);
      }
      lastNode = this.eqNodes[this.eqNodes.length - 1];
    }

    lastNode.connect(this.compressor);
    if (this.boostGain) {
      this.boostGain.gain.value = SettingsManager.get('audio.volumeBoostEnabled', false) ? SettingsManager.get('audio.volumeBoost', 1) : 1;
      this.compressor.connect(this.boostGain);
      this.boostGain.connect(this.gainNode);
    } else {
      this.compressor.connect(this.gainNode);
    }
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    // Crossfade sources feed the current gain node while a transition is active.
    try { this.crossfadeGain?.disconnect(); } catch(e) {}
    if (this.crossfadeGain) this.crossfadeGain.connect(this.gainNode);
  },

  updateEqualizerEnabled() {
    this.rebuildAudioGraph();
    this.applyEQPreset();
  },

  applyPlaybackEffects() {
    if (!this.audio) return;
    const speed = Utils.clamp(Number(SettingsManager.get('audio.playbackSpeed', 1)) || 1, 0.5, 2);
    const pitch = Utils.clamp(Number(SettingsManager.get('audio.pitchSemitones', 0)) || 0, -12, 12);
    // Native media playback can only shift pitch and tempo together reliably.
    // We keep speed as the primary rate and apply pitch as a semitone rate offset.
    this.audio.playbackRate = speed * Math.pow(2, pitch / 12);
    try { this.audio.preservesPitch = false; } catch (e) {}
    try { this.audio.mozPreservesPitch = false; } catch (e) {}
    try { this.audio.webkitPreservesPitch = false; } catch (e) {}
    if (this.boostGain) this.boostGain.gain.value = SettingsManager.get('audio.volumeBoostEnabled', false) ? SettingsManager.get('audio.volumeBoost', 1) : 1;
  },

  setPitch(value) { SettingsManager.set('audio.pitchSemitones', value); this.applyPlaybackEffects(); },
  setPlaybackSpeed(value) { SettingsManager.set('audio.playbackSpeed', value); this.applyPlaybackEffects(); },
  setVolumeBoost(value) { SettingsManager.set('audio.volumeBoost', value); this.applyPlaybackEffects(); },

  setRepeatSectionStart() {
    if (!this.audio || !Number.isFinite(this.audio.currentTime)) return;
    this.repeatSection.start = this.audio.currentTime;
    if (this.repeatSection.end !== null && this.repeatSection.end <= this.repeatSection.start) this.repeatSection.end = null;
    this.repeatSection.enabled = false;
    window.dispatchEvent(new CustomEvent('repeat-section-changed', { detail: { ...this.repeatSection } }));
  },

  setRepeatSectionEnd() {
    if (!this.audio || this.repeatSection.start === null) return;
    const end = this.audio.currentTime;
    if (end <= this.repeatSection.start) return;
    this.repeatSection.end = end;
    this.repeatSection.enabled = true;
    window.dispatchEvent(new CustomEvent('repeat-section-changed', { detail: { ...this.repeatSection } }));
  },

  clearRepeatSection() {
    this.repeatSection = { enabled: false, start: null, end: null };
    window.dispatchEvent(new CustomEvent('repeat-section-changed', { detail: { ...this.repeatSection } }));
  },

  schedulePlayAfter(seconds) {
    this.clearScheduledPlay();
    const delay = Math.max(0, Number(seconds) || 0);
    if (!delay) return this.play();
    this.scheduledPlayTimer = setTimeout(() => {
      this.scheduledPlayTimer = null;
      this.play();
    }, delay * 1000);
  },

  clearScheduledPlay() {
    if (this.scheduledPlayTimer) { clearTimeout(this.scheduledPlayTimer); this.scheduledPlayTimer = null; }
  },

  updateGaplessPlayback() {
    if (SettingsManager.get('audio.gaplessPlayback')) {
      this.preloadNext();
    } else {
      this.clearPreload();
    }
  },

  clearPreload() {
    if (this.preloadAudio) {
      try {
        this.preloadAudio.pause();
        this.preloadAudio.removeAttribute('src');
        this.preloadAudio.load();
      } catch(e) {}
    }
    if (this.preloadUrl && this.preloadUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(this.preloadUrl); } catch(e) {}
    }
    this.preloadAudio = null;
    this.preloadUrl = null;
  },

  updateSkipSilence() {
    this.stopSkipSilence();
    if (SettingsManager.get('audio.skipSilence') && this.isPlaying) {
      this.startSkipSilence();
    }
  },

  updatePersistentQueue() {
    if (SettingsManager.get('playback.persistentQueue')) {
      this.saveQueue();
    } else {
      try { localStorage.removeItem('okvy_queue'); } catch(e) {}
    }
  },

  updateSmartPause() {
    // Runtime listeners read the current settings on every event, so no
    // listener rebuild is required for visibility/volume based smart pause.
    this.deviceSnapshot = null;
    this.initAudioDeviceMonitoring();
  },

  async initAudioDeviceMonitoring() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.deviceSnapshot = new Set(devices.filter(d => d.kind === 'audiooutput').map(d => d.deviceId));
    } catch(e) {}
  },

  setupAudioDeviceMonitoring() {
    if (!navigator.mediaDevices?.addEventListener) return;
    if (this._deviceMonitoringBound) return;
    this._deviceMonitoringBound = true;
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const outputs = new Set(devices.filter(d => d.kind === 'audiooutput').map(d => d.deviceId));
        if (SettingsManager.get('playback.smartPause.onHeadphoneDisconnect') && this.deviceSnapshot && outputs.size < this.deviceSnapshot.size && this.isPlaying) {
          await this.pause();
        }
        this.deviceSnapshot = outputs;
      } catch(e) {}
    });
    this.initAudioDeviceMonitoring();
  },

  buildEQ() {
    this.eqNodes = [];
    const freqs = [60, 250, 1000, 4000, 16000];
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

  async resolveTrack(track) {
    if (!track) return null;
    if (track.blob || track.url) return track;
    if (track.id && typeof Data?.getTrack === 'function') {
      try {
        const stored = await Data.getTrack(track.id);
        if (stored) return { ...track, ...stored };
      } catch (e) {
        console.warn('Could not restore queued track:', e);
      }
    }
    return track;
  },

  getTrackUrl(track) {
    if (!track) return null;
    if (track.blob) return URL.createObjectURL(track.blob);
    if (track.url) return track.url;
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

    const token = ++this.transitionToken;
    const resolvedTrack = await this.resolveTrack(track);
    if (!resolvedTrack || token !== this.transitionToken) return;

    this.revokeCurrentUrls();
    this.clearPreload();
    this.stopSkipSilence();
    this.saveListenProgress();

    this.currentTrack = resolvedTrack;
    this.currentPosition = 0;
    this.repeatCount = 0;
    this.isPlaying = false;
    this.isPaused = true;

    const url = this.getTrackUrl(resolvedTrack);
    if (!url) {
      console.error('No audio source for track:', resolvedTrack.title);
      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false, error: true } }));
      return;
    }
    this.currentBlobUrl = url;

    const artwork = this.getTrackArtwork(resolvedTrack);
    if (artwork && artwork.startsWith('blob:')) this.currentArtworkUrl = artwork;

    if (!this.audioCtx) this.initAudioContext();
    if (this.audioCtx?.state === 'suspended') {
      try { await this.audioCtx.resume(); } catch (e) {}
    }

    // Keep one HTMLAudioElement for the lifetime of the player. Replacing it
    // was the source of broken controls and stale event handlers during transitions.
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = url;
    this.audio.load();
    this.applyPlaybackEffects();

    if (SettingsManager.get('ui.dynamicTheming')) {
      const artSrc = artwork || 'assets/default-art.png';
      if (artSrc.startsWith('blob:') || artSrc.startsWith('http') || artSrc.startsWith('data:')) {
        try {
          const colors = await Utils.extractColors(artSrc);
          if (token === this.transitionToken) window.dispatchEvent(new CustomEvent('theme-colors', { detail: colors }));
        } catch(e) {}
      }
    }

    if (token !== this.transitionToken) return;
    this.updateMediaSession(resolvedTrack, artwork);
    this.startListenTracking();
    window.dispatchEvent(new CustomEvent('track-changed', { detail: { ...resolvedTrack, artwork } }));

    if (autoPlay) await this.play();
  },

  async play() {
    if (!this.audio.src) return;
    if (this._pauseTimer) {
      clearTimeout(this._pauseTimer);
      this._pauseTimer = null;
    }
    if (this.audioCtx?.state === 'suspended') {
      try { await this.audioCtx.resume(); } catch (e) {}
    }

    const fadeDur = Math.max(0, Number(SettingsManager.get('audio.playPauseFadeDuration')) || 0);
    if (fadeDur > 0 && this.gainNode && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(0, now);
      this.gainNode.gain.linearRampToValueAtTime(1, now + fadeDur);
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.isPaused = false;
      if (SettingsManager.get('audio.skipSilence')) this.startSkipSilence();
      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: true } }));
      Utils.vibrate(15);
    } catch(err) {
      this.isPlaying = false;
      this.isPaused = true;
      console.error('Play failed:', err);
      if (err.name !== 'AbortError') console.warn('Playback error:', err.message || 'Unknown');
    }
  },

  async pause() {
    if (!this.audio || this.audio.paused) {
      this.isPlaying = false;
      this.isPaused = true;
      return;
    }

    // Update state immediately so a rapid second tap cannot queue another pause
    // while the optional fade-out is still running.
    this.isPlaying = false;
    this.isPaused = true;
    this.stopSkipSilence();
    window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false } }));

    const fadeDur = Math.max(0, Number(SettingsManager.get('audio.playPauseFadeDuration')) || 0);
    if (fadeDur > 0 && this.gainNode && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      const currentGain = this.gainNode.gain.value;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(currentGain, now);
      this.gainNode.gain.linearRampToValueAtTime(0, now + fadeDur);
      const token = ++this.transitionToken;
      this._pauseTimer = setTimeout(() => {
        this._pauseTimer = null;
        if (token === this.transitionToken && !this.isPlaying) this.audio.pause();
      }, fadeDur * 1000);
    } else {
      this.audio.pause();
    }
    this.saveListenProgress();
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

    const nextIndex = this.getNextIndex();
    if (SettingsManager.get('audio.crossfadeDuration') > 0 && this.isPlaying) {
      await this.crossfadeToNext();
      return;
    }
    if (nextIndex === this.queueIndex && SettingsManager.get('playback.repeatMode') === 'none') {
      if (this.audio.duration && this.audio.currentTime < this.audio.duration) return;
      this.isPlaying = false;
      this.isPaused = true;
      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false, ended: true } }));
      return;
    }

    this.queueIndex = nextIndex;
    const nextTrack = await this.resolveTrack(this.queue[this.queueIndex]);
    if (nextTrack) await this.loadTrack(nextTrack, true);
  },

  async prev() {
    if (this.queue.length === 0) return;

    // Normal player behaviour: restart the current song when it has already
    // played past the first few seconds; otherwise go to the previous item.
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    this.queueIndex = this.getPrevIndex();
    const prevTrack = await this.resolveTrack(this.queue[this.queueIndex]);
    if (prevTrack) await this.loadTrack(prevTrack, true);
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
      if (this.queue.length <= 1) return this.queueIndex;
      let idx = this.queueIndex;
      while (idx === this.queueIndex) idx = Math.floor(Math.random() * this.queue.length);
      return idx;
    }

    let next = this.queueIndex + 1;
    if (next >= this.queue.length) next = mode === 'all' ? 0 : this.queue.length - 1;
    return next;
  },

  getPrevIndex() {
    if (SettingsManager.get('playback.shuffleMode')) {
      if (this.queue.length <= 1) return this.queueIndex;
      return this.queueIndex === 0 ? this.queue.length - 1 : this.queueIndex - 1;
    }
    let prev = this.queueIndex - 1;
    if (prev < 0) prev = SettingsManager.get('playback.repeatMode') === 'all' ? this.queue.length - 1 : 0;
    return prev;
  },

  async crossfadeToNext() {
    // Use the same media element for transitions. This avoids creating a
    // second MediaElementSource and swapping event handlers mid-playback.
    const nextIndex = this.getNextIndex();
    if (nextIndex === this.queueIndex && SettingsManager.get('playback.repeatMode') === 'none') {
      this.onTrackEnded();
      return;
    }
    const nextTrack = await this.resolveTrack(this.queue[nextIndex]);
    if (!nextTrack) return;

    const duration = Math.max(0, Number(SettingsManager.get('audio.crossfadeDuration')) || 0);
    if (!duration || !this.isPlaying) {
      this.queueIndex = nextIndex;
      await this.loadTrack(nextTrack, true);
      return;
    }

    const token = ++this.transitionToken;
    const fadeSeconds = Math.min(duration, Math.max(0.1, this.audio.currentTime));
    const startVolume = this.gainNode ? this.gainNode.gain.value : 1;
    if (this.gainNode && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(startVolume, now);
      this.gainNode.gain.linearRampToValueAtTime(0, now + fadeSeconds);
    }
    await new Promise(r => setTimeout(r, fadeSeconds * 1000));
    if (token !== this.transitionToken) return;

    this.queueIndex = nextIndex;
    await this.loadTrack(nextTrack, false);
    if (this.gainNode && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(0, now);
      this.gainNode.gain.linearRampToValueAtTime(1, now + fadeSeconds);
    }
    await this.play();
  },

  async preloadNext() {
    this.clearPreload();
    if (!SettingsManager.get('audio.gaplessPlayback')) return;

    const nextIdx = this.queueIndex + 1;
    if (nextIdx >= this.queue.length) return;
    const nextTrack = this.queue[nextIdx];
    if (!nextTrack) return;
    const url = this.getTrackUrl(nextTrack);
    if (!url) return;

    const preload = new Audio();
    // Metadata-only preloading avoids competing with the active track for
    // bandwidth/decoding resources on lower-powered devices.
    preload.preload = 'metadata';
    preload.src = url;
    this.preloadAudio = preload;
    this.preloadUrl = url;
    try { preload.load(); } catch(e) {}
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
    if (!this.currentTrack || !this.audio) return;
    this.isPlaying = false;
    this.isPaused = true;
    this.saveListenProgress(true);

    if (this.sleepTracksRemaining > 0) {
      this.sleepTracksRemaining--;
      if (this.sleepTracksRemaining <= 0) {
        this.stopSleepTimer();
        this.pause();
        return;
      }
    }

    if (this.scheduleAfterTrackCount > 0) {
      this.scheduleAfterTrackCount--;
      if (this.scheduleAfterTrackCount === 0 && this.currentTrack) {
        const idx = this.queue.findIndex(t => t && t.id === this.currentTrack.id);
        if (idx >= 0) {
          this.queueIndex = idx;
          this.loadTrack(this.queue[idx], true);
          return;
        }
      }
    }

    const mode = SettingsManager.get('playback.repeatMode');
    if (mode === 'one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }

    if (mode === 'n' && this.repeatCount < (SettingsManager.get('playback.repeatNTimes') || 1) - 1) {
      this.repeatCount++;
      this.audio.currentTime = 0;
      this.play();
      return;
    }

    this.repeatCount = 0;
    if (this.queueIndex >= this.queue.length - 1 && mode !== 'all' && !SettingsManager.get('playback.shuffleMode')) {
      this.isPlaying = false;
      this.isPaused = true;
      window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false, ended: true } }));
      return;
    }

    // Always advance through the same transition path as the transport button.
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
    const err = this.audio?.error;
    if (err) {
      const msgs = { 1: 'Aborted', 2: 'Network error', 3: 'Decode error', 4: 'Format not supported' };
      console.warn('Audio error code:', msgs[err.code] || 'Unknown');
    }
    // Do not immediately fire next() repeatedly for a transient media error.
    // A single failed track should not lock the transport controls.
    if (this._handlingAudioError) return;
    this._handlingAudioError = true;
    setTimeout(async () => {
      this._handlingAudioError = false;
      if (this.queue.length > 1) await this.next();
      else {
        this.isPlaying = false;
        this.isPaused = true;
        window.dispatchEvent(new CustomEvent('playback-state', { detail: { playing: false, error: true } }));
      }
    }, 250);
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
    const loop = (timestamp = 0) => {
      requestAnimationFrame(loop);
      if (!this.analyser || !this.isPlaying) {
        this.peakValue = 0;
        this.peakSmooth = this.peakSmooth * 0.9;
        return;
      }
      if (timestamp - this.peakLastFrame < 33) return;
      this.peakLastFrame = timestamp;
      if (!this.peakData || this.peakData.length !== this.analyser.frequencyBinCount) this.peakData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(this.peakData);
      let sum = 0;
      for (let i = 0; i < this.peakData.length; i++) sum += this.peakData[i];
      const avg = sum / this.peakData.length;
      this.peakValue = avg / 255;
      this.peakSmooth = this.peakSmooth * 0.8 + this.peakValue * 0.2;

      window.dispatchEvent(new CustomEvent('audio-peak', { detail: { peak: this.peakValue, smooth: this.peakSmooth } }));
    };
    requestAnimationFrame(loop);
  },

  setQueue(tracks, startIndex = 0) {
    this.queue = Array.isArray(tracks) ? tracks : [];
    this.queueIndex = Math.max(0, Math.min(startIndex, Math.max(0, this.queue.length - 1)));
    this.shuffleHistory = [];
    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
  },

  addToQueue(tracks, position = 'end') {
    const incoming = Array.isArray(tracks) ? tracks.filter(Boolean) : [];
    if (incoming.length === 0) return;
    const wasEmpty = this.queue.length === 0;

    if (position === 'next') {
      const before = this.queue.slice(0, this.queueIndex + 1);
      const after = this.queue.slice(this.queueIndex + 1);
      this.queue = [...before, ...incoming, ...after];
    } else {
      this.queue = [...this.queue, ...incoming];
    }

    if (SettingsManager.get('playback.persistentQueue')) this.saveQueue();
    window.dispatchEvent(new CustomEvent('queue-updated'));

    // If the queue was empty, optionally start the first inserted track.
    if (wasEmpty && SettingsManager.get('playback.autoPlayOnInsert')) {
      this.queueIndex = 0;
      this.loadTrack(this.queue[this.queueIndex], true);
    }
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

  checkRepeatSection() {
    const r = this.repeatSection;
    if (r.enabled && r.start !== null && r.end !== null && this.audio.currentTime >= r.end) {
      this.audio.currentTime = r.start;
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
