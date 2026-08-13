/* ========================================
   Okvy MusiQ - Main Application
   ======================================== */

const App = (function() {
    'use strict';

    let isInitialized = false;
    let isDraggingProgress = false;

    function safeInit(name, fn) {
        try {
            const result = fn();
            console.log('✓', name, 'initialized');
            return result;
        } catch (e) {
            console.error('✗', name, 'failed:', e);
            return false;
        }
    }

    function init() {
        if (isInitialized) {
            console.warn('App already initialized');
            return;
        }

        try {
            console.log('=== Okvy MusiQ v' + CONFIG.version + ' ===');

            safeInit('UI Elements', () => UI.cacheElements());
            safeInit('Data', () => Data.init());
            safeInit('Player', () => Player.init());
            safeInit('Event Listeners', () => setupEventListeners());
            safeInit('Player Events', () => setupPlayerEvents());
            safeInit('Scanner Events', () => setupScannerEvents());
            safeInit('Initial Render', () => {
                UI.updateSidebarPlaylists();
                UI.renderPage('home');
            });
            safeInit('State Restore', () => restoreState());

            isInitialized = true;
            console.log('=== App ready ===');

        } catch (e) {
            console.error('FATAL: App.init failed:', e);
            showCriticalError('Failed to start application: ' + e.message);
        }
    }

    function restoreState() {
        const state = Data.getState();
        if (state.currentTrack && state.hasLibrary) {
            // For restored state, we only have metadata — user needs to re-scan to play
            // But we can show the last played track info
            UI.updateNowPlaying(state.currentTrack, false);
            UI.updateFullPlayer(state.currentTrack, false);
        }
    }

    function showCriticalError(msg) {
        const errEl = document.getElementById('critical-error');
        const msgEl = document.getElementById('error-message');
        const appEl = document.getElementById('app');
        if (errEl) errEl.classList.remove('hidden');
        if (msgEl) msgEl.textContent = msg;
        if (appEl) appEl.style.display = 'none';
    }

    // SCANNER HANDLER
    function handleScan(fileList) {
        if (!fileList || fileList.length === 0) return;
        if (Scanner.isScanningNow()) {
            UI.showToast('Scan already in progress');
            return;
        }

        UI.showToast('Scanning ' + fileList.length + ' files...');

        Scanner.scanFiles(fileList).then(tracks => {
            if (tracks.length === 0) {
                UI.showToast('No audio files found');
                UI.hideScanProgress();
                return;
            }

            Data.setTracks(tracks);
            Scanner.saveLibrary(tracks);

            UI.showToast('Found ' + tracks.length + ' songs');
            UI.hideScanProgress();
            UI.renderPage('home');
            UI.updateSidebarPlaylists();
        }).catch(err => {
            console.error('Scan error:', err);
            UI.showToast('Scan failed: ' + (err.message || 'Unknown error'));
            UI.hideScanProgress();
        });
    }

    function setupScannerEvents() {
        Scanner.on('scanProgress', (data) => {
            UI.showScanProgress(data.current, data.total);
        });

        Scanner.on('scanComplete', (data) => {
            console.log('Scan complete:', data.count, 'tracks');
        });
    }

    // EVENT LISTENERS
    function setupEventListeners() {
        bindSafe(UI.el.menuToggle, 'click', () => UI.toggleSidebar());
        bindSafe(UI.el.closeSidebar, 'click', () => UI.closeSidebar());
        bindSafe(UI.el.sidebarOverlay, 'click', () => UI.closeSidebar());

        document.querySelectorAll('.nav-item').forEach(item => {
            bindSafe(item, 'click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) UI.renderPage(page);
            });
        });

        bindSafe(UI.el.searchToggle, 'click', () => {
            UI.renderPage('search');
        });

        bindSafe(UI.el.npTrack, 'click', () => UI.openFullPlayer());
        bindSafe(UI.el.npPlay, 'click', (e) => {
            e.stopPropagation();
            togglePlayback();
        });
        bindSafe(UI.el.npPrev, 'click', (e) => {
            e.stopPropagation();
            playPrev();
        });
        bindSafe(UI.el.npNext, 'click', (e) => {
            e.stopPropagation();
            playNext();
        });

        bindSafe(UI.el.fpClose, 'click', () => UI.closeFullPlayer());
        bindSafe(UI.el.fpPlay, 'click', togglePlayback);
        bindSafe(UI.el.fpPrev, 'click', playPrev);
        bindSafe(UI.el.fpNext, 'click', playNext);
        bindSafe(UI.el.fpShuffle, 'click', toggleShuffle);
        bindSafe(UI.el.fpRepeat, 'click', toggleRepeat);
        bindSafe(UI.el.fpFavorite, 'click', toggleCurrentFavorite);
        bindSafe(UI.el.fpAdd, 'click', () => {
            const state = Data.getState();
            if (state.currentTrack) {
                UI.openPlaylistModal(state.currentTrack.id);
            }
        });

        setupProgressBar();

        bindSafe(UI.el.closePlaylistModal, 'click', UI.closePlaylistModal);
        bindSafe(UI.el.playlistModal, 'click', (e) => {
            if (e.target === UI.el.playlistModal) UI.closePlaylistModal();
        });
        bindSafe(UI.el.createPlaylistBtn, 'click', createNewPlaylist);
        bindSafe(UI.el.playlistModalList, 'click', (e) => {
            const item = e.target.closest('.modal-playlist-item');
            if (item) {
                const plId = item.dataset.playlistId;
                const trackId = UI.el.playlistModal.dataset.trackId;
                if (plId && trackId) {
                    const added = Data.addToPlaylist(plId, trackId);
                    UI.showToast(added ? 'Added to playlist' : 'Already in playlist');
                    UI.closePlaylistModal();
                }
            }
        });

        bindSafe(UI.el.pageContainer, 'click', handlePageClick);

        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            try {
                switch(e.code) {
                    case 'Space':
                        e.preventDefault();
                        togglePlayback();
                        break;
                    case 'ArrowRight':
                        if (e.ctrlKey || e.metaKey) playNext();
                        break;
                    case 'ArrowLeft':
                        if (e.ctrlKey || e.metaKey) playPrev();
                        break;
                }
            } catch (err) {
                console.error('Keyboard handler error:', err);
            }
        });

        window.addEventListener('popstate', () => {
            const hash = window.location.hash.replace('#', '') || 'home';
            if (['home','search','library','favorites','playlists'].includes(hash)) {
                UI.renderPage(hash);
            }
        });
    }

    function bindSafe(element, event, handler) {
        if (!element) return;
        element.addEventListener(event, function(e) {
            try {
                handler(e);
            } catch (err) {
                console.error('Event handler error:', err);
            }
        });
    }

    function setupProgressBar() {
        if (!UI.el.fpProgressContainer) return;

        const updateFromEvent = (e) => {
            const rect = UI.el.fpProgressContainer.getBoundingClientRect();
            const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const percent = Utils.clamp(((x - rect.left) / rect.width) * 100, 0, 100);
            Player.seekPercent(percent);
        };

        UI.el.fpProgressContainer.addEventListener('mousedown', (e) => {
            isDraggingProgress = true;
            UI.el.fpProgressContainer.classList.add('dragging');
            updateFromEvent(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDraggingProgress) updateFromEvent(e);
        });

        document.addEventListener('mouseup', () => {
            if (isDraggingProgress) {
                isDraggingProgress = false;
                UI.el.fpProgressContainer.classList.remove('dragging');
            }
        });

        UI.el.fpProgressContainer.addEventListener('touchstart', (e) => {
            isDraggingProgress = true;
            UI.el.fpProgressContainer.classList.add('dragging');
            updateFromEvent(e);
        }, {passive: true});

        document.addEventListener('touchmove', (e) => {
            if (isDraggingProgress) updateFromEvent(e);
        }, {passive: true});

        document.addEventListener('touchend', () => {
            if (isDraggingProgress) {
                isDraggingProgress = false;
                UI.el.fpProgressContainer.classList.remove('dragging');
            }
        });
    }

    // PLAYER EVENTS
    function setupPlayerEvents() {
        Player.on('timeupdate', (data) => {
            if (!isDraggingProgress && data.duration > 0) {
                const percent = (data.currentTime / data.duration) * 100;
                UI.updateProgress(percent, data.currentTime, data.duration);
            }
        });

        Player.on('play', () => {
            Data.setIsPlaying(true);
            UI.updatePlayButton(true);
        });

        Player.on('pause', () => {
            Data.setIsPlaying(false);
            UI.updatePlayButton(false);
        });

        Player.on('ended', () => {
            handleTrackEnd();
        });

        Player.on('error', (err) => {
            console.error('Player error:', err);
            UI.showToast(err.message || 'Playback error');
            Data.setIsPlaying(false);
            UI.updatePlayButton(false);
        });
    }

    // PLAYBACK CONTROL
    function playTrack(track) {
        if (!track || !track.url) {
            UI.showToast('Track not available. Please re-scan your library.');
            return;
        }
        try {
            Data.setCurrentTrack(track);
            Player.loadTrack(track);
            Player.play().then(success => {
                if (success) {
                    Data.setIsPlaying(true);
                    UI.updateNowPlaying(track, true);
                    UI.updateFullPlayer(track, true);
                }
            });
        } catch (e) {
            console.error('playTrack error:', e);
            UI.showToast('Failed to play track');
        }
    }

    function togglePlayback() {
        try {
            const state = Data.getState();
            if (!state.currentTrack) {
                const tracks = Data.getTracks();
                if (tracks.length > 0) {
                    Data.setQueue(tracks, 0);
                    playTrack(tracks[0]);
                } else {
                    UI.showToast('Scan your music library first');
                }
                return;
            }
            Player.toggle().then(() => {
                const isPlaying = !Player.isPaused();
                Data.setIsPlaying(isPlaying);
                UI.updatePlayButton(isPlaying);
            });
        } catch (e) {
            console.error('togglePlayback error:', e);
        }
    }

    function playNext() {
        try {
            const next = Data.nextTrack();
            if (next) {
                playTrack(next);
            } else {
                Data.setIsPlaying(false);
                UI.updatePlayButton(false);
            }
        } catch (e) {
            console.error('playNext error:', e);
        }
    }

    function playPrev() {
        try {
            if (Player.getCurrentTime() > 3) {
                Player.seek(0);
                return;
            }
            const prev = Data.prevTrack();
            if (prev) {
                playTrack(prev);
            }
        } catch (e) {
            console.error('playPrev error:', e);
        }
    }

    function handleTrackEnd() {
        const state = Data.getState();
        if (state.repeat === 'one') {
            Player.seek(0);
            Player.play();
        } else {
            playNext();
        }
    }

    function toggleShuffle() {
        try {
            const newShuffle = !Data.getState().shuffle;
            Data.setShuffle(newShuffle);

            if (newShuffle) {
                const current = Data.getState().currentTrack;
                const tracks = Data.getTracks();
                const shuffled = Utils.shuffleArray(tracks);
                const idx = current ? shuffled.findIndex(t => t.id === current.id) : 0;
                Data.setQueue(shuffled, Math.max(0, idx));
            } else {
                const tracks = Data.getTracks();
                const current = Data.getState().currentTrack;
                const idx = current ? tracks.findIndex(t => t.id === current.id) : 0;
                Data.setQueue(tracks, Math.max(0, idx));
            }

            UI.el.fpShuffle.classList.toggle('active', newShuffle);
            UI.showToast(newShuffle ? 'Shuffle on' : 'Shuffle off');
        } catch (e) {
            console.error('toggleShuffle error:', e);
        }
    }

    function toggleRepeat() {
        try {
            const modes = ['none', 'all', 'one'];
            const current = Data.getState().repeat;
            const next = modes[(modes.indexOf(current) + 1) % modes.length];
            Data.setRepeat(next);

            UI.el.fpRepeat.classList.toggle('active', next !== 'none');
            const labels = { none: 'Repeat off', all: 'Repeat all', one: 'Repeat one' };
            UI.showToast(labels[next]);
        } catch (e) {
            console.error('toggleRepeat error:', e);
        }
    }

    function toggleCurrentFavorite() {
        try {
            const track = Data.getState().currentTrack;
            if (!track) return;
            const isFav = Data.toggleFavorite(track.id);
            UI.el.fpFavorite.classList.toggle('active', isFav);
            UI.showToast(isFav ? 'Added to favorites' : 'Removed from favorites');
        } catch (e) {
            console.error('toggleCurrentFavorite error:', e);
        }
    }

    function createNewPlaylist() {
        try {
            const name = prompt('Playlist name:');
            if (name && name.trim()) {
                const pl = Data.createPlaylist(name.trim());
                UI.updateSidebarPlaylists();
                UI.showToast('Playlist created: ' + pl.name);

                const trackId = UI.el.playlistModal.dataset.trackId;
                if (trackId) {
                    Data.addToPlaylist(pl.id, trackId);
                    UI.showToast('Song added to ' + pl.name);
                }
                UI.closePlaylistModal();
            }
        } catch (e) {
            console.error('createNewPlaylist error:', e);
        }
    }

    // PAGE CLICK DELEGATION
    function handlePageClick(e) {
        try {
            const trackCard = e.target.closest('[data-track-id]');
            if (trackCard && !e.target.closest('.play-overlay-btn') && !e.target.closest('.favorite-btn') && !e.target.closest('.add-btn')) {
                const trackId = trackCard.dataset.trackId;
                const track = Data.getTrack(trackId);
                if (track) {
                    const allCards = UI.el.pageContainer.querySelectorAll('[data-track-id]');
                    const ids = Array.from(allCards).map(c => c.dataset.trackId);
                    const idx = ids.indexOf(trackId);
                    const tracks = ids.map(id => Data.getTrack(id)).filter(Boolean);
                    Data.setQueue(tracks, Math.max(0, idx));
                    playTrack(track);
                }
                return;
            }

            const playBtn = e.target.closest('.play-overlay-btn');
            if (playBtn) {
                const trackId = playBtn.dataset.trackId;
                const albumId = playBtn.dataset.albumId;
                const playlistId = playBtn.dataset.playlistId;

                if (trackId) {
                    const track = Data.getTrack(trackId);
                    if (track) {
                        Data.setQueue([track], 0);
                        playTrack(track);
                    }
                } else if (albumId) {
                    const tracks = Data.getAlbumTracks(albumId);
                    if (tracks.length > 0) {
                        Data.setQueue(tracks, 0);
                        playTrack(tracks[0]);
                    }
                } else if (playlistId) {
                    const tracks = Data.getPlaylistTracks(playlistId);
                    if (tracks.length > 0) {
                        Data.setQueue(tracks, 0);
                        playTrack(tracks[0]);
                    }
                }
                return;
            }

            const albumCard = e.target.closest('[data-album-id]');
            if (albumCard && !e.target.closest('.play-overlay-btn')) {
                UI.renderAlbumDetail(albumCard.dataset.albumId);
                return;
            }

            const playlistCard = e.target.closest('[data-playlist-id]');
            if (playlistCard && !e.target.closest('.play-overlay-btn') && !e.target.closest('.playlist-item')) {
                UI.renderPlaylistDetail(playlistCard.dataset.playlistId);
                return;
            }

            const sidebarPl = e.target.closest('.playlist-item');
            if (sidebarPl) {
                UI.renderPlaylistDetail(sidebarPl.dataset.playlistId);
                return;
            }

            const favBtn = e.target.closest('.favorite-btn');
            if (favBtn) {
                const trackId = favBtn.dataset.trackId;
                if (trackId) {
                    const isFav = Data.toggleFavorite(trackId);
                    favBtn.classList.toggle('active', isFav);
                    const svg = favBtn.querySelector('svg');
                    if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
                    UI.showToast(isFav ? 'Added to favorites' : 'Removed from favorites');
                }
                return;
            }

            const addBtn = e.target.closest('.add-btn');
            if (addBtn) {
                const trackId = addBtn.dataset.trackId;
                if (trackId) {
                    UI.openPlaylistModal(trackId);
                }
                return;
            }

            const playAlbumBtn = e.target.closest('#play-album-btn');
            if (playAlbumBtn) {
                const tracks = Data.getAlbumTracks(playAlbumBtn.dataset.albumId);
                if (tracks.length > 0) {
                    Data.setQueue(tracks, 0);
                    playTrack(tracks[0]);
                }
                return;
            }

            const playPlaylistBtn = e.target.closest('#play-playlist-btn');
            if (playPlaylistBtn) {
                const tracks = Data.getPlaylistTracks(playPlaylistBtn.dataset.playlistId);
                if (tracks.length > 0) {
                    Data.setQueue(tracks, 0);
                    playTrack(tracks[0]);
                }
                return;
            }

            const newPlBtn = e.target.closest('#new-playlist-btn');
            if (newPlBtn) {
                createNewPlaylist();
                return;
            }

            const hero = e.target.closest('.hero-card');
            if (hero) {
                const trackId = hero.dataset.trackId;
                const track = Data.getTrack(trackId);
                if (track) {
                    Data.setQueue(Data.getTracks(), 0);
                    playTrack(track);
                }
            }

        } catch (e) {
            console.error('handlePageClick error:', e);
        }
    }

    return { init, handleScan };
})();

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        App.init();
    }, 50);
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
        App.init();
    }, 50);
}
