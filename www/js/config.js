const CONFIG = {
  version: '3.0',

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
    gridViewStyle: 'grid',
    albumSort: 'name',
    artistSort: 'name',
    landscapeLayout: 'auto',
    waveformSeekbar: true,
    waveformBars: 80,
    animatingThumbnail: true,
    showUpdateIcon: true,
    glassmorphism: true,
    glassIntensity: 0.28,
    fillAlbumArt: false,
    floatingMiniPlayer: true,
    floatingPlayerBlur: 24
  },

  audio: {
    equalizerEnabled: true,
    eqPresets: [
      { name: 'Flat', values: [0,0,0,0,0] },
      { name: 'Bass Boost', values: [6,4,2,0,0] },
      { name: 'Vocal', values: [0,0,3,4,2] },
      { name: 'Treble', values: [0,0,0,4,6] },
      { name: 'Electronic', values: [4,1,0,5,2] }
    ],
    eqCurrentPreset: 'Flat',
    eqCustomValues: [0,0,0,0,0],
    crossfadeDuration: 3,
    playPauseFadeDuration: 0.3,
    skipSilence: false,
    skipSilenceThreshold: -40,
    gaplessPlayback: true,
    normalization: false,
    normalizationTarget: -14,
    pitchSemitones: 0,
    playbackSpeed: 1,
    volumeBoost: 1,
    volumeBoostEnabled: false
  },

  playback: {
    persistentQueue: true,
    trackPlayMode: 'context',
    timeSkipInterval: 10,
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

function cloneConfig(source) {
  if (typeof structuredClone === 'function') return structuredClone(source);
  const copy = JSON.parse(JSON.stringify(source));
  copy.library.featuredArtistPattern = /[\(\[](?:feat\.?|ft\.?|featuring)\s+([^\)\]]+)[\)\]]/i;
  return copy;
}

const DEFAULT_CONFIG = cloneConfig(CONFIG);

const SETTINGS_RULES = {
  'audio.crossfadeDuration': { type: 'number', min: 0, max: 10 },
  'audio.playPauseFadeDuration': { type: 'number', min: 0, max: 5 },
  'audio.skipSilenceThreshold': { type: 'number', min: -100, max: 0 },
  'audio.normalizationTarget': { type: 'number', min: -30, max: 0 },
  'audio.pitchSemitones': { type: 'number', min: -6, max: 6 },
  'audio.playbackSpeed': { type: 'number', min: 0.5, max: 2 },
  'audio.volumeBoost': { type: 'number', min: 0.5, max: 2.5 },
  'audio.volumeBoostEnabled': { type: 'boolean' },
  'ui.particlesIntensity': { type: 'number', min: 0, max: 2 },
  'ui.waveformBars': { type: 'number', min: 20, max: 300 },
  'ui.glassIntensity': { type: 'number', min: 0, max: 1 },
  'ui.floatingMiniPlayer': { type: 'boolean' },
  'ui.floatingPlayerBlur': { type: 'number', min: 0, max: 60 },
  'ui.glassmorphism': { type: 'boolean' },
  'ui.fillAlbumArt': { type: 'boolean' },
  'ui.gridColumns': { type: 'enum', values: ['auto', '2', '3', '4', '5'] },
  'ui.gridViewStyle': { type: 'enum', values: ['grid', 'list', 'collage'] },
  'ui.albumSort': { type: 'enum', values: ['name', 'artist', 'year', 'dateAdded'] },
  'ui.artistSort': { type: 'enum', values: ['name', 'trackCount', 'dateAdded'] },
  'ui.themeMode': { type: 'enum', values: ['dark', 'light'] },
  'ui.miniplayerGlowMode': { type: 'enum', values: ['dynamic', 'static'] },
  'ui.landscapeLayout': { type: 'enum', values: ['auto', 'compact', 'expanded'] },
  'ui.vibrationMode': { type: 'enum', values: ['haptic', 'none'] },
  'playback.timeSkipInterval': { type: 'enum', values: ['5', '10', '15'] },
  'playback.trackPlayMode': { type: 'enum', values: ['context', 'single', 'continuous'] },
  'playback.repeatMode': { type: 'enum', values: ['none', 'one', 'all', 'n'] },
  'playback.repeatNTimes': { type: 'number', min: 1, max: 20 },
  'playback.sleepTimer.mode': { type: 'enum', values: ['tracks', 'minutes'] },
  'playback.sleepTimer.value': { type: 'number', min: 1, max: 1440 },
  'smart.smortCriteria.random': { type: 'number', min: 0, max: 1 },
  'smart.mostPlayedMinPlays': { type: 'number', min: 1, max: 100 },
  'smart.mostPlayedMaxTracks': { type: 'number', min: 1, max: 500 },
  'history.minListenSeconds': { type: 'number', min: 0, max: 3600 },
  'history.minListenPercent': { type: 'number', min: 0, max: 100 },
  'lyrics.fontSize': { type: 'number', min: 10, max: 40 },
  'folders.scanDepth': { type: 'number', min: 0, max: 20 },
  'library.minFileSizeMB': { type: 'number', min: 0, max: 1000 },
  'library.minDurationSeconds': { type: 'number', min: 0, max: 3600 },
  'library.indexThreads': { type: 'number', min: 1, max: 32 }
};

const SettingsManager = {
  get(path, fallback) {
    const keys = path.split('.');
    let val = CONFIG;
    for (const k of keys) {
      if (val == null || !(k in Object(val))) return fallback;
      val = val[k];
    }
    return val === undefined ? fallback : val;
  },

  set(path, value, options = {}) {
    const keys = path.split('.').filter(Boolean);
    if (!keys.length) return false;

    const rule = SETTINGS_RULES[path];
    let nextValue = this.coerce(value, rule);
    if (nextValue === undefined) return false;

    let obj = CONFIG;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]] || typeof obj[keys[i]] !== 'object' || Array.isArray(obj[keys[i]])) {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }

    const key = keys[keys.length - 1];
    const previous = obj[key];
    obj[key] = nextValue;
    this.save();

    if (options.notify !== false && !this.valuesEqual(previous, nextValue)) {
      this.notify(path, nextValue, previous);
    }
    return true;
  },

  coerce(value, rule) {
    if (!rule) return value;
    if (rule.type === 'boolean') return value === true || value === 'true' || value === 1 || value === '1';
    if (rule.type === 'number') {
      const n = Number(value);
      if (!Number.isFinite(n)) return undefined;
      return Math.min(rule.max, Math.max(rule.min, n));
    }
    if (rule.type === 'enum') {
      return rule.values.includes(String(value)) ? String(value) : rule.values[0];
    }
    if (rule.type === 'boolean') return Boolean(value);
    return value;
  },

  valuesEqual(a, b) {
    if (Object.is(a, b)) return true;
    try { return JSON.stringify(a) === JSON.stringify(b); } catch(e) { return false; }
  },

  async save() {
    try {
      localStorage.setItem('okvy_config_v2', JSON.stringify(CONFIG));
    } catch(e) {
      console.warn('Could not save settings:', e);
    }
  },

  async load() {
    try {
      const saved = localStorage.getItem('okvy_config_v2');
      if (!saved) return;
      const parsed = JSON.parse(saved);
      this.merge(CONFIG, parsed);
      this.normalize();
    } catch(e) {
      console.warn('Could not load saved settings; using defaults.', e);
    }
  },

  merge(target, source) {
    if (!source || typeof source !== 'object') return;
    for (const key of Object.keys(source)) {
      if (!(key in target)) continue;
      const sourceValue = source[key];
      if (sourceValue !== null && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) target[key] = {};
        this.merge(target[key], sourceValue);
      } else {
        target[key] = sourceValue;
      }
    }
  },

  normalize() {
    for (const [path, rule] of Object.entries(SETTINGS_RULES)) {
      const current = this.get(path);
      const normalized = this.coerce(current, rule);
      if (normalized !== undefined) this.set(path, normalized, { notify: false });
    }

    const eqValues = this.get('audio.eqCustomValues');
    if (!Array.isArray(eqValues)) {
      this.set('audio.eqCustomValues', [...DEFAULT_CONFIG.audio.eqCustomValues], { notify: false });
    } else if (eqValues.length !== 5) {
      // Migrate the old 10-band EQ to the new 5-band layout by keeping
      // representative low/mid/high bands instead of simply truncating.
      const migrated = [eqValues[1], eqValues[3], eqValues[5], eqValues[7], eqValues[9]].map(v => Number.isFinite(Number(v)) ? Number(v) : 0);
      this.set('audio.eqCustomValues', migrated, { notify: false });
    }

    const presets = this.get('audio.eqPresets');
    if (Array.isArray(presets)) {
      const normalizedPresets = presets.map(p => {
        if (!p || !Array.isArray(p.values) || p.values.length === 5) return p;
        return { ...p, values: [p.values[1], p.values[3], p.values[5], p.values[7], p.values[9]].map(v => Number.isFinite(Number(v)) ? Number(v) : 0) };
      });
      this.set('audio.eqPresets', normalizedPresets, { notify: false });
    }
    if (!Array.isArray(this.get('smart.lostMemoriesYearsBack'))) {
      this.set('smart.lostMemoriesYearsBack', [...DEFAULT_CONFIG.smart.lostMemoriesYearsBack], { notify: false });
    }
  },

  notify(path, value, previous) {
    window.dispatchEvent(new CustomEvent('setting-changed', {
      detail: { path, value, previous }
    }));
  },

  reset() {
    this.replace(CONFIG, DEFAULT_CONFIG);
    this.save();
    window.dispatchEvent(new CustomEvent('settings-reset'));
    location.reload();
  },

  replace(target, source) {
    for (const key of Object.keys(target)) delete target[key];
    const copy = cloneConfig(source);
    for (const key of Object.keys(copy)) target[key] = copy[key];
  }
};

// Load synchronously before the app starts. localStorage access itself is synchronous.
SettingsManager.load();
