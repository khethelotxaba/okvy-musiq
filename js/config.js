const CONFIG = {
  version: '2.2.3',

  library: {
    minFileSizeMB: 0.5,
    minDurationSeconds: 10,
    excludeFolders: [],
    deduplicateBy: 'hash',
    artistSeparators: [';', '/', ',', ' & ', ' and '],
    genreSeparators: [';', '/', ','],
    extractFeaturedArtists: true,
    featuredArtistPattern: /[\(\[](?:feat\.?|ft\.?|featuring)\s+([^\)\]]+)[\)\]]/i,
    moodTagsEnabled: true,
    allowMultipleAlbums: true,
    autoIndexOnLaunch: false,
    indexThreads: 4
  },

  ui: {
    themeMode: 'dark',
    dynamicTheming: true,
    particlesEnabled: true,
    particlesIntensity: 0.6,
    miniplayerGlow: true,
    miniplayerGlowMode: 'dynamic',
    vibrationMode: 'haptic',
    gridColumns: 'auto',
    landscapeLayout: 'auto',
    waveformSeekbar: true,
    animatingThumbnail: true,
    showUpdateIcon: true,
    glassIntensity: 0.15,
    sidebarCollapsed: false
  },

  audio: {
    equalizerEnabled: true,
    eqPresets: [
      { name: 'Flat', values: [0,0,0,0,0,0,0,0,0,0] },
      { name: 'Bass Boost', values: [6,4,2,0,0,0,0,0,0,0] },
      { name: 'Vocal', values: [0,0,0,2,4,4,2,0,0,0] },
      { name: 'Treble', values: [0,0,0,0,0,0,2,4,6,6] },
      { name: 'Electronic', values: [4,3,1,0,0,2,4,5,3,2] }
    ],
    eqCurrentPreset: 'Flat',
    eqCustomValues: [0,0,0,0,0,0,0,0,0,0],
    crossfadeDuration: 3,
    playPauseFadeDuration: 0.3,
    skipSilence: false,
    skipSilenceThreshold: -40,
    gaplessPlayback: true,
    normalization: false,
    normalizationTarget: -14
  },

  playback: {
    persistentQueue: true,
    trackPlayMode: 'context',
    repeatMode: 'none',
    repeatNTimes: 2,
    sleepTimer: { enabled: false, mode: 'tracks', value: 10 },
    smartPause: { onCall: true, onNotification: false, onVolumeZero: true, onAppSwitch: false, onHeadphoneDisconnect: true },
    autoPlayOnInsert: true,
    shuffleMode: false
  },

  smart: {
    smortEnabled: true,
    smortCriteria: { samePeriod: true, sameEra: true, timeRange: true, ratings: true, moods: true, random: 0.2 },
    mostPlayedAutoUpdate: true,
    mostPlayedMinPlays: 3,
    mostPlayedMaxTracks: 50,
    lostMemoriesEnabled: true,
    lostMemoriesYearsBack: [1, 2, 3]
  },

  history: {
    minListenSeconds: 30,
    minListenPercent: 50,
    scrobbleEnabled: false,
    lastFm: { apiKey: '', apiSecret: '', sessionKey: '', username: '' },
    totalListenTimer: true,
    saveSessions: true
  },

  lyrics: {
    enabled: true,
    ignoreEmbeddedPrefix: 'IGNORE',
    preferredFormat: 'auto',
    autoFetch: true,
    fontSize: 16,
    alignCenter: true,
    highlightCurrentLine: true
  },

  folders: {
    rootPaths: [],
    showHidden: false,
    scanDepth: 3
  }
};

const SettingsManager = {
  get(path) {
    const keys = path.split('.');
    let val = CONFIG;
    for (const k of keys) { if (val === undefined) return undefined; val = val[k]; }
    return val;
  },

  set(path, value) {
    const keys = path.split('.');
    let obj = CONFIG;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj[keys[i]] === undefined) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.save();
    this.notify(path, value);
  },

  async save() {
    try { localStorage.setItem('okvy_config_v2', JSON.stringify(CONFIG)); } catch(e) {}
  },

  async load() {
    try {
      const saved = localStorage.getItem('okvy_config_v2');
      if (saved) { const parsed = JSON.parse(saved); this.merge(CONFIG, parsed); }
    } catch(e) {}
  },

  merge(target, source) {
    for (const key in source) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        this.merge(target[key], source[key]);
      } else { target[key] = source[key]; }
    }
  },

  notify(path, value) {
    window.dispatchEvent(new CustomEvent('setting-changed', { detail: { path, value } }));
  },

  reset() { localStorage.removeItem('okvy_config_v2'); location.reload(); }
};

SettingsManager.load();
