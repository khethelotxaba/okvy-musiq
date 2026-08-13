/* ========================================
   Okvy MusiQ - UI Controller
   ======================================== */

const UI = (function() {
    'use strict';

    const el = {};

    function cacheElements() {
        try {
            el.app = document.getElementById('app');
            el.sidebar = document.getElementById('sidebar');
            el.sidebarOverlay = document.getElementById('sidebar-overlay');
            el.closeSidebar = document.getElementById('close-sidebar');
            el.menuToggle = document.getElementById('menu-toggle');
            el.searchToggle = document.getElementById('search-toggle');
            el.pageTitle = document.getElementById('page-title');
            el.pageContainer = document.getElementById('page-container');
            el.userPlaylists = document.getElementById('user-playlists');
            el.npBar = document.getElementById('now-playing-bar');
            el.npTrack = document.getElementById('np-track');
            el.npArt = document.getElementById('np-art');
            el.npTitle = document.getElementById('np-title');
            el.npArtist = document.getElementById('np-artist');
            el.npPlay = document.getElementById('np-play');
            el.playIcon = document.getElementById('play-icon');
            el.pauseIcon = document.getElementById('pause-icon');
            el.npPrev = document.getElementById('np-prev');
            el.npNext = document.getElementById('np-next');
            el.npProgress = document.getElementById('np-progress');
            el.fullPlayer = document.getElementById('full-player');
            el.fpClose = document.getElementById('fp-close');
            el.fpArt = document.getElementById('fp-art');
            el.fpBgImg = document.getElementById('fp-bg-img');
            el.fpTitle = document.getElementById('fp-title');
            el.fpArtist = document.getElementById('fp-artist');
            el.fpPlay = document.getElementById('fp-play');
            el.fpPlayIcon = document.getElementById('fp-play-icon');
            el.fpPauseIcon = document.getElementById('fp-pause-icon');
            el.fpPrev = document.getElementById('fp-prev');
            el.fpNext = document.getElementById('fp-next');
            el.fpShuffle = document.getElementById('fp-shuffle');
            el.fpRepeat = document.getElementById('fp-repeat');
            el.fpFavorite = document.getElementById('fp-favorite');
            el.fpAdd = document.getElementById('fp-add');
            el.fpProgressContainer = document.getElementById('fp-progress-container');
            el.fpProgressBar = document.getElementById('fp-progress-bar');
            el.fpProgressHandle = document.getElementById('fp-progress-handle');
            el.fpCurrent = document.getElementById('fp-current');
            el.fpDuration = document.getElementById('fp-duration');
            el.toastContainer = document.getElementById('toast-container');
            el.playlistModal = document.getElementById('playlist-modal');
            el.closePlaylistModal = document.getElementById('close-playlist-modal');
            el.playlistModalList = document.getElementById('playlist-modal-list');
            el.createPlaylistBtn = document.getElementById('create-playlist-btn');
            el.sidebarArt = document.getElementById('sidebar-art');
            el.sidebarTitle = document.getElementById('sidebar-title');
            el.sidebarArtist = document.getElementById('sidebar-artist');
            return true;
        } catch (e) {
            console.error('UI.cacheElements error:', e);
            return false;
        }
    }

    function showToast(message) {
        try {
            if (!el.toastContainer) return;
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            el.toastContainer.appendChild(toast);
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 3000);
        } catch (e) {
            console.error('UI.showToast error:', e);
        }
    }

    function openSidebar() {
        try {
            el.sidebar.classList.add('open');
            el.sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } catch (e) {
            console.error('UI.openSidebar error:', e);
        }
    }

    function closeSidebar() {
        try {
            el.sidebar.classList.remove('open');
            el.sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } catch (e) {
            console.error('UI.closeSidebar error:', e);
        }
    }

    function toggleSidebar() {
        if (el.sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    function openFullPlayer() {
        try {
            el.fullPlayer.classList.add('open');
            document.body.style.overflow = 'hidden';
        } catch (e) {
            console.error('UI.openFullPlayer error:', e);
        }
    }

    function closeFullPlayer() {
        try {
            el.fullPlayer.classList.remove('open');
            document.body.style.overflow = '';
        } catch (e) {
            console.error('UI.closeFullPlayer error:', e);
        }
    }

    function openPlaylistModal(trackId) {
        try {
            el.playlistModal.dataset.trackId = trackId;
            renderPlaylistModal();
            el.playlistModal.classList.add('open');
        } catch (e) {
            console.error('UI.openPlaylistModal error:', e);
        }
    }

    function closePlaylistModal() {
        try {
            el.playlistModal.classList.remove('open');
            el.playlistModal.dataset.trackId = '';
        } catch (e) {
            console.error('UI.closePlaylistModal error:', e);
        }
    }

    function renderPlaylistModal() {
        try {
            const playlists = Data.getState().playlists;
            if (!el.playlistModalList) return;

            el.playlistModalList.innerHTML = playlists.map(pl => `
                <button class="modal-playlist-item" data-playlist-id="${pl.id}">
                    <div class="pl-thumb" style="background:var(--bg-elevated)">
                        ${pl.cover ? `<img src="${pl.cover}" alt="">` : 
                          `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`}
                    </div>
                    <span>${Utils.escapeHtml(pl.name)}</span>
                </button>
            `).join('');
        } catch (e) {
            console.error('UI.renderPlaylistModal error:', e);
        }
    }

    function updateNowPlaying(track, isPlaying) {
        try {
            if (!track) {
                el.npBar.classList.add('hidden');
                return;
            }
            el.npBar.classList.remove('hidden');
            el.npArt.src = track.cover || '';
            el.npArt.alt = track.title || '';
            el.npTitle.textContent = track.title || 'Unknown';
            el.npArtist.textContent = track.artist || 'Unknown artist';

            el.sidebarArt.src = track.cover || '';
            el.sidebarTitle.textContent = track.title || 'Not Playing';
            el.sidebarArtist.textContent = track.artist || '-';

            updatePlayButton(isPlaying);
        } catch (e) {
            console.error('UI.updateNowPlaying error:', e);
        }
    }

    function updatePlayButton(isPlaying) {
        try {
            if (isPlaying) {
                el.playIcon.classList.add('hidden');
                el.pauseIcon.classList.remove('hidden');
                el.fpPlayIcon.classList.add('hidden');
                el.fpPauseIcon.classList.remove('hidden');
            } else {
                el.playIcon.classList.remove('hidden');
                el.pauseIcon.classList.add('hidden');
                el.fpPlayIcon.classList.remove('hidden');
                el.fpPauseIcon.classList.add('hidden');
            }
        } catch (e) {
            console.error('UI.updatePlayButton error:', e);
        }
    }

    function updateProgress(percent, currentTime, duration) {
        try {
            if (el.npProgress) el.npProgress.style.width = percent + '%';
            if (el.fpProgressBar) el.fpProgressBar.style.width = percent + '%';
            if (el.fpProgressHandle) el.fpProgressHandle.style.left = percent + '%';
            if (el.fpCurrent) el.fpCurrent.textContent = Utils.formatTime(currentTime);
            if (el.fpDuration) el.fpDuration.textContent = Utils.formatTime(duration);
        } catch (e) {
            console.error('UI.updateProgress error:', e);
        }
    }

    function updateFullPlayer(track, isPlaying) {
        try {
            if (!track) return;
            el.fpArt.src = track.cover || '';
            el.fpBgImg.src = track.cover || '';
            el.fpTitle.textContent = track.title || 'Unknown';
            el.fpArtist.textContent = track.artist || 'Unknown artist';

            const state = Data.getState();
            el.fpShuffle.classList.toggle('active', state.shuffle);
            el.fpRepeat.classList.toggle('active', state.repeat !== 'none');
            el.fpFavorite.classList.toggle('active', Data.isFavorite(track.id));

            updatePlayButton(isPlaying);
        } catch (e) {
            console.error('UI.updateFullPlayer error:', e);
        }
    }

    // SCAN UI
    function renderScanPrompt() {
        return `
            <div class="page">
                <div class="empty-state" style="padding-top:80px;">
                    <div class="empty-icon" style="font-size:48px;">🎵</div>
                    <h3 style="font-size:1.5rem;margin-bottom:8px;">Your Library is Empty</h3>
                    <p style="color:var(--text-muted);margin-bottom:32px;max-width:320px;">
                        Scan your device for music files to start listening.
                    </p>

                    <div style="display:flex;flex-direction:column;gap:12px;align-items:center;">
                        <label class="btn-gold" style="cursor:pointer;display:flex;align-items:center;gap:8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Scan Folder
                            <input type="file" id="folder-input" webkitdirectory directory multiple 
                                style="display:none;" accept="audio/*">
                        </label>

                        <label class="btn-gold" style="cursor:pointer;display:flex;align-items:center;gap:8px;background:var(--bg-elevated);color:var(--text-primary);box-shadow:none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Select Files
                            <input type="file" id="files-input" multiple 
                                style="display:none;" accept="audio/*">
                        </label>
                    </div>

                    <div id="scan-status" style="margin-top:24px;font-size:0.875rem;color:var(--text-muted);display:none;">
                        <div class="skeleton" style="width:200px;height:8px;border-radius:4px;margin-bottom:8px;"></div>
                        <span id="scan-count">Scanning...</span>
                    </div>
                </div>
            </div>
        `;
    }

    function showScanProgress(current, total) {
        const status = document.getElementById('scan-status');
        const count = document.getElementById('scan-count');
        if (status) status.style.display = 'block';
        if (count) count.textContent = `Found ${current} songs${total ? ' of ' + total : ''}`;
    }

    function hideScanProgress() {
        const status = document.getElementById('scan-status');
        if (status) status.style.display = 'none';
    }

    // PAGES
    function renderPage(pageName) {
        try {
            Data.setCurrentPage(pageName);
            el.pageTitle.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);

            const state = Data.getState();

            if (!state.hasLibrary && pageName !== 'search') {
                el.pageContainer.innerHTML = renderScanPrompt();
                bindScanInputs();
                updateNavActive(pageName);
                return;
            }

            switch(pageName) {
                case 'home': renderHome(); break;
                case 'search': renderSearch(); break;
                case 'library': renderLibrary(); break;
                case 'favorites': renderFavorites(); break;
                case 'playlists': renderPlaylists(); break;
                default: renderHome();
            }

            updateNavActive(pageName);

            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        } catch (e) {
            console.error('UI.renderPage error:', e);
            el.pageContainer.innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><h3>Error loading page</h3><p>Please try again.</p></div>';
        }
    }

    function updateNavActive(pageName) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });
    }

    function bindScanInputs() {
        const folderInput = document.getElementById('folder-input');
        const filesInput = document.getElementById('files-input');

        if (folderInput) {
            folderInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    App.handleScan(e.target.files);
                }
            });
        }

        if (filesInput) {
            filesInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    App.handleScan(e.target.files);
                }
            });
        }
    }

    function renderHome() {
        const tracks = Data.getTracks();
        const albums = Data.getState().albums;
        const playlists = Data.getState().playlists;

        if (tracks.length === 0) {
            el.pageContainer.innerHTML = renderScanPrompt();
            bindScanInputs();
            return;
        }

        el.pageContainer.innerHTML = `
            <div class="page">
                ${renderHero(tracks[0])}
                ${renderSection('Recently Added', tracks.slice(0, 6))}
                ${renderAlbumSection('Albums', albums)}
                ${renderPlaylistSection('Your Playlists', playlists)}
                ${renderTrackListSection('All Songs', tracks)}
            </div>
        `;
    }

    function renderHero(track) {
        if (!track) return '';
        return `
            <div class="hero-card" data-track-id="${track.id}">
                <img src="${track.cover || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&h=400&fit=crop'}" alt="${Utils.escapeHtml(track.title)}">
                <div class="hero-gradient"></div>
                <div class="hero-content">
                    <span class="hero-badge">Now Available</span>
                    <h2 class="hero-title">${Utils.escapeHtml(track.title)}</h2>
                    <p class="hero-subtitle">${Utils.escapeHtml(track.artist)} — ${Utils.escapeHtml(track.album)}</p>
                </div>
            </div>
        `;
    }

    function renderSection(title, tracks) {
        if (!tracks || tracks.length === 0) return '';
        return `
            <div class="section-header">
                <h2 class="section-title">${Utils.escapeHtml(title)}</h2>
            </div>
            <div class="horizontal-scroll">
                ${tracks.map(t => renderMediaCard(t)).join('')}
            </div>
        `;
    }

    function renderAlbumSection(title, albums) {
        if (!albums || albums.length === 0) return '';
        return `
            <div class="section-header">
                <h2 class="section-title">${Utils.escapeHtml(title)}</h2>
            </div>
            <div class="horizontal-scroll">
                ${albums.map(a => `
                    <div class="media-card" data-album-id="${a.id}">
                        <div class="media-art">
                            <img src="${a.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'}" alt="${Utils.escapeHtml(a.title)}">
                            <div class="media-overlay">
                                <button class="play-overlay-btn" data-album-id="${a.id}">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </button>
                            </div>
                        </div>
                        <div class="media-title">${Utils.escapeHtml(a.title)}</div>
                        <div class="media-subtitle">${Utils.escapeHtml(a.artist)}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderPlaylistSection(title, playlists) {
        if (!playlists || playlists.length === 0) return '';
        return `
            <div class="section-header">
                <h2 class="section-title">${Utils.escapeHtml(title)}</h2>
            </div>
            <div class="horizontal-scroll">
                ${playlists.map(p => `
                    <div class="media-card" data-playlist-id="${p.id}">
                        <div class="media-art">
                            <img src="${p.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'}" alt="${Utils.escapeHtml(p.name)}">
                            <div class="media-overlay">
                                <button class="play-overlay-btn" data-playlist-id="${p.id}">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </button>
                            </div>
                        </div>
                        <div class="media-title">${Utils.escapeHtml(p.name)}</div>
                        <div class="media-subtitle">${p.tracks.length} songs</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderMediaCard(track) {
        if (!track) return '';
        return `
            <div class="media-card" data-track-id="${track.id}">
                <div class="media-art">
                    <img src="${track.cover || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop'}" alt="${Utils.escapeHtml(track.title)}">
                    <div class="media-overlay">
                        <button class="play-overlay-btn" data-track-id="${track.id}">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="media-title">${Utils.escapeHtml(track.title)}</div>
                <div class="media-subtitle">${Utils.escapeHtml(track.artist)}</div>
            </div>
        `;
    }

    function renderTrackListSection(title, tracks) {
        if (!tracks || tracks.length === 0) return '';
        return `
            <div class="section-header">
                <h2 class="section-title">${Utils.escapeHtml(title)}</h2>
            </div>
            <div class="track-list">
                ${tracks.map((t, i) => renderTrackItem(t, i + 1)).join('')}
            </div>
        `;
    }

    function renderTrackItem(track, index) {
        if (!track) return '';
        const isActive = Data.getState().currentTrack && Data.getState().currentTrack.id === track.id;
        const isFav = Data.isFavorite(track.id);
        return `
            <div class="track-item ${isActive ? 'active' : ''}" data-track-id="${track.id}">
                <span class="track-num">${index}</span>
                <img class="track-art" src="${track.cover || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100&h=100&fit=crop'}" alt="">
                <div class="track-info">
                    <span class="track-title">${Utils.escapeHtml(track.title)}</span>
                    <span class="track-artist">${Utils.escapeHtml(track.artist)}</span>
                </div>
                <span class="track-duration">${Utils.formatTime(track.duration)}</span>
                <div class="track-actions">
                    <button class="icon-btn favorite-btn ${isFav ? 'active' : ''}" data-track-id="${track.id}" title="Favorite">
                        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </button>
                    <button class="icon-btn add-btn" data-track-id="${track.id}" title="Add to playlist">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <line x1="12" y1="8" x2="12" y2="16"/>
                            <line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    function renderSearch() {
        el.pageContainer.innerHTML = `
            <div class="page">
                <div class="search-container">
                    <div class="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" id="search-input" placeholder="Search songs, artists, albums..." autocomplete="off">
                    </div>
                </div>
                <div id="search-results"></div>
            </div>
        `;

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.addEventListener('input', Utils.debounce((e) => {
                const query = e.target.value.trim();
                Data.setSearchQuery(query);
                renderSearchResults(query);
            }, 200));
        }
    }

    function renderSearchResults(query) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (!query) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>Search your library</h3>
                    <p>Type to find songs, artists, or albums.</p>
                </div>
            `;
            return;
        }

        const results = Data.searchTracks(query);
        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">😕</div>
                    <h3>No results found</h3>
                    <p>Try different keywords.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="section-header">
                <h2 class="section-title">Results</h2>
            </div>
            <div class="track-list">
                ${results.map((t, i) => renderTrackItem(t, i + 1)).join('')}
            </div>
        `;
    }

    function renderLibrary() {
        const albums = Data.getState().albums;
        if (albums.length === 0) {
            el.pageContainer.innerHTML = renderScanPrompt();
            bindScanInputs();
            return;
        }
        el.pageContainer.innerHTML = `
            <div class="page">
                ${renderAlbumSection('All Albums', albums)}
            </div>
        `;
    }

    function renderFavorites() {
        const favorites = Data.getFavorites();
        el.pageContainer.innerHTML = `
            <div class="page">
                ${favorites.length > 0 
                    ? renderTrackListSection('Your Favorites', favorites)
                    : `<div class="empty-state"><div class="empty-icon">💛</div><h3>No favorites yet</h3><p>Tap the heart icon on any song to add it here.</p></div>`
                }
            </div>
        `;
    }

    function renderPlaylists() {
        const playlists = Data.getState().playlists;
        el.pageContainer.innerHTML = `
            <div class="page">
                <div style="margin: 16px 0;">
                    <button id="new-playlist-btn" class="btn-gold btn-full">+ Create New Playlist</button>
                </div>
                ${renderPlaylistSection('Your Playlists', playlists)}
            </div>
        `;
    }

    function renderPlaylistDetail(playlistId) {
        try {
            const pl = Data.getPlaylist(playlistId);
            if (!pl) return;
            const tracks = Data.getPlaylistTracks(playlistId);

            el.pageContainer.innerHTML = `
                <div class="page">
                    <div style="display:flex;align-items:center;gap:16px;margin:20px 0;">
                        <div style="width:120px;height:120px;border-radius:var(--radius-xl);overflow:hidden;background:var(--bg-elevated);flex-shrink:0;">
                            <img src="${pl.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'}" style="width:100%;height:100%;object-fit:cover;" alt="">
                        </div>
                        <div>
                            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:4px;">${Utils.escapeHtml(pl.name)}</h2>
                            <p style="color:var(--text-muted);font-size:0.875rem;">${tracks.length} songs</p>
                            <button class="btn-gold" style="margin-top:12px;padding:10px 20px;font-size:0.875rem;" data-playlist-id="${pl.id}" id="play-playlist-btn">▶ Play</button>
                        </div>
                    </div>
                    ${tracks.length > 0 
                        ? `<div class="track-list">${tracks.map((t, i) => renderTrackItem(t, i + 1)).join('')}</div>`
                        : `<div class="empty-state"><div class="empty-icon">🎵</div><h3>Empty playlist</h3><p>Add songs to get started.</p></div>`
                    }
                </div>
            `;
            el.pageTitle.textContent = Utils.escapeHtml(pl.name);
        } catch (e) {
            console.error('UI.renderPlaylistDetail error:', e);
        }
    }

    function renderAlbumDetail(albumId) {
        try {
            const album = Data.getAlbum(albumId);
            if (!album) return;
            const tracks = Data.getAlbumTracks(albumId);

            el.pageContainer.innerHTML = `
                <div class="page">
                    <div style="display:flex;align-items:center;gap:16px;margin:20px 0;">
                        <div style="width:120px;height:120px;border-radius:var(--radius-xl);overflow:hidden;background:var(--bg-elevated);flex-shrink:0;">
                            <img src="${album.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'}" style="width:100%;height:100%;object-fit:cover;" alt="">
                        </div>
                        <div>
                            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:4px;">${Utils.escapeHtml(album.title)}</h2>
                            <p style="color:var(--text-muted);font-size:0.875rem;">${Utils.escapeHtml(album.artist)} • ${album.year}</p>
                            <button class="btn-gold" style="margin-top:12px;padding:10px 20px;font-size:0.875rem;" data-album-id="${album.id}" id="play-album-btn">▶ Play</button>
                        </div>
                    </div>
                    <div class="track-list">
                        ${tracks.map((t, i) => renderTrackItem(t, i + 1)).join('')}
                    </div>
                </div>
            `;
            el.pageTitle.textContent = Utils.escapeHtml(album.title);
        } catch (e) {
            console.error('UI.renderAlbumDetail error:', e);
        }
    }

    function updateSidebarPlaylists() {
        try {
            const playlists = Data.getState().playlists;
            if (!el.userPlaylists) return;
            el.userPlaylists.innerHTML = playlists.map(p => `
                <button class="playlist-item" data-playlist-id="${p.id}">
                    <div class="pl-thumb">
                        ${p.cover ? `<img src="${p.cover}" alt="">` : 
                          `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`}
                    </div>
                    <span class="pl-name">${Utils.escapeHtml(p.name)}</span>
                </button>
            `).join('');
        } catch (e) {
            console.error('UI.updateSidebarPlaylists error:', e);
        }
    }

    return {
        cacheElements,
        showToast,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        openFullPlayer,
        closeFullPlayer,
        openPlaylistModal,
        closePlaylistModal,
        renderPlaylistModal,
        updateNowPlaying,
        updatePlayButton,
        updateProgress,
        updateFullPlayer,
        renderPage,
        renderHome,
        renderSearch,
        renderSearchResults,
        renderLibrary,
        renderFavorites,
        renderPlaylists,
        renderPlaylistDetail,
        renderAlbumDetail,
        updateSidebarPlaylists,
        renderScanPrompt,
        showScanProgress,
        hideScanProgress,
        get el() { return el; }
    };
})();
