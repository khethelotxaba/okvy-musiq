/* ========================================
   Okvy MusiQ - Data & State Management
   ======================================== */

const Data = (function() {
    'use strict';

    // Internal state
    let state = {
        tracks: [],
        albums: [],
        playlists: [],
        favorites: new Set(),
        queue: [],
        queueIndex: -1,
        currentTrack: null,
        isPlaying: false,
        shuffle: false,
        repeat: 'none', // 'none', 'all', 'one'
        volume: 0.8,
        searchQuery: '',
        currentPage: 'home'
    };

    // Initialize with demo data
    function init() {
        try {
            state.tracks = CONFIG.demoTracks.map(t => ({...t}));
            state.albums = CONFIG.demoAlbums.map(a => ({...a}));

            // Load user playlists from storage or use defaults
            const savedPlaylists = Utils.getStorage(CONFIG.storage.playlists, null);
            if (savedPlaylists && Array.isArray(savedPlaylists)) {
                state.playlists = savedPlaylists;
            } else {
                state.playlists = CONFIG.demoPlaylists.map(p => ({...p, isDefault: true}));
            }

            // Load favorites
            const savedFavs = Utils.getStorage(CONFIG.storage.favorites, []);
            state.favorites = new Set(savedFavs);

            // Load volume
            const savedVol = Utils.getStorage(CONFIG.storage.volume, null);
            if (savedVol !== null && typeof savedVol === 'number') {
                state.volume = Utils.clamp(savedVol, 0, 1);
            }

            // Load last played
            const lastPlayed = Utils.getStorage(CONFIG.storage.lastPlayed, null);
            if (lastPlayed) {
                const track = state.tracks.find(t => t.id === lastPlayed.id);
                if (track) {
                    state.currentTrack = track;
                }
            }

            // Load queue
            const savedQueue = Utils.getStorage(CONFIG.storage.queue, null);
            if (savedQueue && Array.isArray(savedQueue)) {
                state.queue = savedQueue;
            }

            return true;
        } catch (e) {
            console.error('Data.init error:', e);
            // Fallback to minimal state
            state.tracks = CONFIG.demoTracks.map(t => ({...t}));
            state.albums = CONFIG.demoAlbums.map(a => ({...a}));
            state.playlists = CONFIG.demoPlaylists.map(p => ({...p}));
            return false;
        }
    }

    // Getters
    function getState() {
        return {
            tracks: [...state.tracks],
            albums: [...state.albums],
            playlists: [...state.playlists],
            favorites: new Set(state.favorites),
            queue: [...state.queue],
            queueIndex: state.queueIndex,
            currentTrack: state.currentTrack ? {...state.currentTrack} : null,
            isPlaying: state.isPlaying,
            shuffle: state.shuffle,
            repeat: state.repeat,
            volume: state.volume,
            searchQuery: state.searchQuery,
            currentPage: state.currentPage
        };
    }

    function getTrack(id) {
        return state.tracks.find(t => t.id === id) || null;
    }

    function getTracks() {
        return [...state.tracks];
    }

    function getAlbum(id) {
        return state.albums.find(a => a.id === id) || null;
    }

    function getAlbumTracks(albumId) {
        const album = getAlbum(albumId);
        if (!album) return [];
        return album.tracks.map(tid => getTrack(tid)).filter(Boolean);
    }

    function getPlaylist(id) {
        return state.playlists.find(p => p.id === id) || null;
    }

    function getPlaylistTracks(playlistId) {
        const pl = getPlaylist(playlistId);
        if (!pl) return [];
        return pl.tracks.map(tid => getTrack(tid)).filter(Boolean);
    }

    function getFavorites() {
        return state.tracks.filter(t => state.favorites.has(t.id));
    }

    function isFavorite(trackId) {
        return state.favorites.has(trackId);
    }

    function searchTracks(query) {
        if (!query) return [];
        const q = query.toLowerCase().trim();
        return state.tracks.filter(t => 
            t.title.toLowerCase().includes(q) ||
            t.artist.toLowerCase().includes(q) ||
            t.album.toLowerCase().includes(q)
        );
    }

    // Setters
    function setCurrentTrack(track) {
        state.currentTrack = track;
        if (track) {
            Utils.setStorage(CONFIG.storage.lastPlayed, {id: track.id, timestamp: Date.now()});
        }
    }

    function setIsPlaying(playing) {
        state.isPlaying = !!playing;
    }

    function setVolume(vol) {
        state.volume = Utils.clamp(vol, 0, 1);
        Utils.setStorage(CONFIG.storage.volume, state.volume);
    }

    function setShuffle(shuffle) {
        state.shuffle = !!shuffle;
    }

    function setRepeat(mode) {
        if (['none', 'all', 'one'].includes(mode)) {
            state.repeat = mode;
        }
    }

    function setCurrentPage(page) {
        state.currentPage = page;
    }

    function setSearchQuery(query) {
        state.searchQuery = query;
    }

    // Queue management
    function setQueue(tracks, startIndex) {
        state.queue = tracks.map(t => typeof t === 'string' ? t : t.id);
        state.queueIndex = typeof startIndex === 'number' ? startIndex : 0;
        saveQueue();
    }

    function getQueue() {
        return state.queue.map(id => getTrack(id)).filter(Boolean);
    }

    function getQueueIndex() {
        return state.queueIndex;
    }

    function setQueueIndex(index) {
        state.queueIndex = Utils.clamp(index, 0, Math.max(0, state.queue.length - 1));
    }

    function nextTrack() {
        if (state.queue.length === 0) return null;

        if (state.repeat === 'one') {
            return getTrack(state.queue[state.queueIndex]);
        }

        let nextIndex = state.queueIndex + 1;
        if (nextIndex >= state.queue.length) {
            if (state.repeat === 'all') {
                nextIndex = 0;
            } else {
                return null;
            }
        }
        state.queueIndex = nextIndex;
        saveQueue();
        return getTrack(state.queue[nextIndex]);
    }

    function prevTrack() {
        if (state.queue.length === 0) return null;

        let prevIndex = state.queueIndex - 1;
        if (prevIndex < 0) {
            if (state.repeat === 'all') {
                prevIndex = state.queue.length - 1;
            } else {
                prevIndex = 0;
            }
        }
        state.queueIndex = prevIndex;
        saveQueue();
        return getTrack(state.queue[prevIndex]);
    }

    function saveQueue() {
        Utils.setStorage(CONFIG.storage.queue, state.queue);
    }

    // Favorites
    function toggleFavorite(trackId) {
        if (state.favorites.has(trackId)) {
            state.favorites.delete(trackId);
        } else {
            state.favorites.add(trackId);
        }
        Utils.setStorage(CONFIG.storage.favorites, Array.from(state.favorites));
        return state.favorites.has(trackId);
    }

    // Playlists
    function createPlaylist(name) {
        const pl = {
            id: Utils.generateId(),
            name: Utils.escapeHtml(name),
            cover: '',
            tracks: [],
            isDefault: false
        };
        state.playlists.push(pl);
        savePlaylists();
        return pl;
    }

    function addToPlaylist(playlistId, trackId) {
        const pl = state.playlists.find(p => p.id === playlistId);
        if (!pl) return false;
        if (!pl.tracks.includes(trackId)) {
            pl.tracks.push(trackId);
            savePlaylists();
            return true;
        }
        return false;
    }

    function removeFromPlaylist(playlistId, trackId) {
        const pl = state.playlists.find(p => p.id === playlistId);
        if (!pl) return false;
        const idx = pl.tracks.indexOf(trackId);
        if (idx > -1) {
            pl.tracks.splice(idx, 1);
            savePlaylists();
            return true;
        }
        return false;
    }

    function deletePlaylist(playlistId) {
        const idx = state.playlists.findIndex(p => p.id === playlistId);
        if (idx > -1 && !state.playlists[idx].isDefault) {
            state.playlists.splice(idx, 1);
            savePlaylists();
            return true;
        }
        return false;
    }

    function savePlaylists() {
        Utils.setStorage(CONFIG.storage.playlists, state.playlists);
    }

    return {
        init,
        getState,
        getTrack,
        getTracks,
        getAlbum,
        getAlbumTracks,
        getPlaylist,
        getPlaylistTracks,
        getFavorites,
        isFavorite,
        searchTracks,
        setCurrentTrack,
        setIsPlaying,
        setVolume,
        setShuffle,
        setRepeat,
        setCurrentPage,
        setSearchQuery,
        setQueue,
        getQueue,
        getQueueIndex,
        setQueueIndex,
        nextTrack,
        prevTrack,
        toggleFavorite,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        deletePlaylist
    };
})();
