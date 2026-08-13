/* ========================================
   Okvy MusiQ - Configuration
   ======================================== */

const CONFIG = {
    appName: 'Okvy MusiQ',
    version: '2.1.0',

    audio: {
        preload: 'metadata',
        crossOrigin: 'anonymous',
        volumeStep: 0.05,
        defaultVolume: 0.8,
        supportedFormats: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/flac', 'audio/aac', 'audio/m4a']
    },

    ui: {
        sidebarBreakpoint: 1024,
        toastDuration: 3000,
        pageTransitionDuration: 350,
        debounceDelay: 150,
        scanBatchSize: 50
    },

    storage: {
        favorites: 'okvy_favorites',
        playlists: 'okvy_playlists',
        volume: 'okvy_volume',
        lastPlayed: 'okvy_last_played',
        queue: 'okvy_queue',
        library: 'okvy_library',
        libraryVersion: 'okvy_lib_ver'
    },

    // Empty — no demo data. All tracks come from user library scan.
    demoTracks: [],
    demoAlbums: [],
    demoPlaylists: []
};

Object.freeze(CONFIG);
Object.freeze(CONFIG.audio);
Object.freeze(CONFIG.ui);
Object.freeze(CONFIG.storage);
