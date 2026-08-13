/* ========================================
   Okvy MusiQ - Configuration
   ======================================== */

const CONFIG = {
    appName: 'Okvy MusiQ',
    version: '2.0.0',

    // Audio settings
    audio: {
        preload: 'metadata',
        crossOrigin: 'anonymous',
        volumeStep: 0.05,
        defaultVolume: 0.8
    },

    // UI settings
    ui: {
        sidebarBreakpoint: 1024,
        toastDuration: 3000,
        pageTransitionDuration: 350,
        debounceDelay: 150
    },

    // Storage keys
    storage: {
        favorites: 'okvy_favorites',
        playlists: 'okvy_playlists',
        volume: 'okvy_volume',
        lastPlayed: 'okvy_last_played',
        queue: 'okvy_queue'
    },

    // Demo tracks (royalty-free / sample URLs)
    // Using reliable public domain / creative commons sources
    demoTracks: [
        {
            id: 'demo-1',
            title: 'Midnight Groove',
            artist: 'Okvy Beats',
            album: 'Night Sessions',
            duration: 184,
            cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
            id: 'demo-2',
            title: 'Golden Hour',
            artist: 'Luna Wave',
            album: 'Sunset Vibes',
            duration: 210,
            cover: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
            id: 'demo-3',
            title: 'Urban Dreams',
            artist: 'Metro Soul',
            album: 'City Lights',
            duration: 195,
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        },
        {
            id: 'demo-4',
            title: 'Velvet Night',
            artist: 'Okvy Beats',
            album: 'Night Sessions',
            duration: 172,
            cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
        {
            id: 'demo-5',
            title: 'Neon Pulse',
            artist: 'Cyber Funk',
            album: 'Digital Heart',
            duration: 225,
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
        },
        {
            id: 'demo-6',
            title: 'Ocean Breeze',
            artist: 'Luna Wave',
            album: 'Coastal Dreams',
            duration: 198,
            cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'
        },
        {
            id: 'demo-7',
            title: 'Deep Focus',
            artist: 'Mindful Audio',
            album: 'Flow State',
            duration: 240,
            cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
        },
        {
            id: 'demo-8',
            title: 'Electric Soul',
            artist: 'Metro Soul',
            album: 'City Lights',
            duration: 205,
            cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=400&h=400&fit=crop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
        }
    ],

    // Demo albums
    demoAlbums: [
        {
            id: 'album-1',
            title: 'Night Sessions',
            artist: 'Okvy Beats',
            cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
            year: 2024,
            tracks: ['demo-1', 'demo-4']
        },
        {
            id: 'album-2',
            title: 'Sunset Vibes',
            artist: 'Luna Wave',
            cover: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=400&h=400&fit=crop',
            year: 2024,
            tracks: ['demo-2', 'demo-6']
        },
        {
            id: 'album-3',
            title: 'City Lights',
            artist: 'Metro Soul',
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
            year: 2023,
            tracks: ['demo-3', 'demo-8']
        },
        {
            id: 'album-4',
            title: 'Digital Heart',
            artist: 'Cyber Funk',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
            year: 2024,
            tracks: ['demo-5']
        }
    ],

    // Demo playlists
    demoPlaylists: [
        {
            id: 'pl-chill',
            name: 'Chill Vibes',
            cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
            tracks: ['demo-2', 'demo-6', 'demo-7']
        },
        {
            id: 'pl-energy',
            name: 'Energy Boost',
            cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=200&h=200&fit=crop',
            tracks: ['demo-3', 'demo-5', 'demo-8']
        },
        {
            id: 'pl-night',
            name: 'Late Night',
            cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
            tracks: ['demo-1', 'demo-4', 'demo-7']
        }
    ]
};

// Prevent modification
Object.freeze(CONFIG);
Object.freeze(CONFIG.audio);
Object.freeze(CONFIG.ui);
Object.freeze(CONFIG.storage);
Object.freeze(CONFIG.demoTracks);
Object.freeze(CONFIG.demoAlbums);
Object.freeze(CONFIG.demoPlaylists);
CONFIG.demoTracks.forEach(t => Object.freeze(t));
CONFIG.demoAlbums.forEach(a => Object.freeze(a));
CONFIG.demoPlaylists.forEach(p => Object.freeze(p));
