const UI = {
  currentPage: 'home',
  selectedTracks: new Set(),
  selectionMode: false,
  lastInsertedIndex: -1,
  toastTimer: null,

  async init() {
    this.bindGlobalEvents();
    this.bindTabBar();
    this.renderSidebarPlaylists();
    this.navigate('home');
    this.initParticles();
    this.initMiniplayerGlow();
    this.checkLandscape();
    window.addEventListener('resize', Utils.debounce(() => this.checkLandscape(), 200));
  },

  artworkCache: new Map(),

  getArtworkUrl(track) {
    if (!track) return 'assets/default-art.png';
    if (track.artwork && (track.artwork.startsWith('data:') || track.artwork.startsWith('http'))) {
      return track.artwork;
    }
    if (track.artworkBlob) {
      if (this.artworkCache.has(track.id)) {
        return this.artworkCache.get(track.id);
      }
      const url = URL.createObjectURL(track.artworkBlob);
      this.artworkCache.set(track.id, url);
      return url;
    }
    if (track.artwork && track.artwork.startsWith('blob:')) {
      return 'assets/default-art.png';
    }
    return track.artwork || 'assets/default-art.png';
  },

  clearArtworkCache() {
    this.artworkCache.forEach(url => URL.revokeObjectURL(url));
    this.artworkCache.clear();
  },

  bindGlobalEvents() {
    document.getElementById('menu-toggle').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('close-sidebar').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('sidebar-overlay').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('search-toggle').addEventListener('click', () => this.navigate('search'));

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page) this.navigate(page);
        this.toggleSidebar(false);
      });
    });

    document.getElementById('np-track').addEventListener('click', () => this.openFullPlayer());
    this.setupPlayButton(document.getElementById('np-play'));
    document.getElementById('np-prev').addEventListener('click', () => Player.prev());
    document.getElementById('np-next').addEventListener('click', () => Player.next());

    document.getElementById('fp-close').addEventListener('click', () => this.closeFullPlayer());
    this.setupPlayButton(document.getElementById('fp-play'));
    document.getElementById('fp-prev').addEventListener('click', () => Player.prev());
    document.getElementById('fp-next').addEventListener('click', () => Player.next());
    document.getElementById('fp-shuffle').addEventListener('click', () => this.toggleShuffle());
    document.getElementById('fp-repeat').addEventListener('click', () => this.toggleRepeat());
    document.getElementById('fp-favorite').addEventListener('click', () => this.toggleFavorite());
    document.getElementById('fp-add').addEventListener('click', () => this.showPlaylistModal());
    document.getElementById('fp-share').addEventListener('click', () => this.shareTrack());

    const fpProgress = document.getElementById('fp-progress-container');
    if (fpProgress) {
      fpProgress.addEventListener('click', (e) => {
        const rect = fpProgress.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        Player.seek(pct);
      });
    }

    document.getElementById('close-playlist-modal').addEventListener('click', () => this.hidePlaylistModal());
    document.getElementById('create-playlist-btn').addEventListener('click', () => this.createPlaylistFromModal());

    window.addEventListener('track-changed', (e) => this.onTrackChanged(e.detail));
    window.addEventListener('playback-state', (e) => this.onPlaybackState(e.detail));
    window.addEventListener('time-update', (e) => this.onTimeUpdate(e.detail));
    window.addEventListener('audio-peak', (e) => this.onAudioPeak(e.detail));
    window.addEventListener('theme-colors', (e) => this.onThemeColors(e.detail));
    window.addEventListener('scan-progress', (e) => this.onScanProgress(e.detail));
    window.addEventListener('scan-complete', (e) => this.onScanComplete(e.detail));
    window.addEventListener('queue-updated', () => this.renderQueue());
    window.addEventListener('setting-changed', (e) => this.onSettingChanged(e.detail));
  },

  bindTabBar() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) {
          this.navigate(tab);
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });
  },

  updateTabBar(page) {
    const tabMap = {
      'home': 'home', 'tracks': 'tracks', 'albums': 'tracks', 'artists': 'tracks',
      'genres': 'tracks', 'playlists': 'tracks', 'search': 'search',
      'settings': 'settings', 'favorites': 'tracks', 'queue': 'tracks', 'folders': 'tracks'
    };
    const activeTab = tabMap[page] || 'home';
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === activeTab);
    });
  },

  toggleSidebar(show) {
    const sb = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (show === undefined) show = !sb.classList.contains('open');
    sb.classList.toggle('open', show);
    overlay.classList.toggle('active', show);
  },

  navigate(page, params = {}) {
    this.currentPage = page;
    this.selectedTracks.clear();
    this.selectionMode = false;
    document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.page === page));
    document.getElementById('page-title').textContent = this.capitalize(page);
    this.updateTabBar(page);
    const container = document.getElementById('page-container');
    container.innerHTML = '';
    container.className = 'page-container page-' + page;
    switch(page) {
      case 'home': this.renderHome(container); break;
      case 'tracks': this.renderTracks(container, params); break;
      case 'albums': this.renderAlbums(container); break;
      case 'artists': this.renderArtists(container); break;
      case 'genres': this.renderGenres(container); break;
      case 'playlists': this.renderPlaylists(container); break;
      case 'queue': this.renderQueue(container); break;
      case 'folders': this.renderFolders(container); break;
      case 'search': this.renderSearch(container); break;
      case 'favorites': this.renderFavorites(container); break;
      case 'settings': this.renderSettings(container); break;
      case 'lyrics': this.renderLyrics(container); break;
      case 'equalizer': this.renderEqualizer(container); break;
    }
    window.scrollTo(0, 0);
  },

  capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); },

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  },

  async renderHome(container) {
    const tracks = await Data.getTracks();
    const stats = await Data.getAll('stats');
    const totalTime = await Data.getTotalListenTime();
    const history = await Data.getHistory();
    const recentTracks = [];
    const seen = new Set();
    for (let i = history.length - 1; i >= 0 && recentTracks.length < 10; i--) {
      const t = await Data.getTrack(history[i].trackId);
      if (t && !seen.has(t.id)) { seen.add(t.id); recentTracks.push(t); }
    }
    container.innerHTML = `
      <div class="hero-section">
        <div class="hero-greeting">${this.getGreeting()}</div>
        <div class="hero-sub">${tracks.length > 0 ? 'Your music, your way.' : 'Ready to discover your sound?'}</div>
        <div class="hero-card">
          <div class="hero-stats">
            <div class="stat-item"><span class="stat-value">${tracks.length}</span><span class="stat-label">Tracks</span></div>
            <div class="stat-item"><span class="stat-value">${Utils.formatDuration(totalTime)}</span><span class="stat-label">Listened</span></div>
            <div class="stat-item"><span class="stat-value">${stats.length}</span><span class="stat-label">Played</span></div>
          </div>
          ${tracks.length === 0 ? `<button class="btn-gold btn-large" onclick="UI.scanMusic()">Scan Music</button>` : ''}
        </div>
      </div>
      ${recentTracks.length > 0 ? `
        <div class="section-header"><h2>Recently Played</h2><button class="section-action" onclick="UI.navigate('tracks')">See All</button></div>
        <div class="h-scroll">
          ${recentTracks.map(t => `
            <div class="h-scroll-item" onclick="UI.playTrackById('${t.id}')">
              <div class="grid-art"><img src="${this.getArtworkUrl(t)}" alt="" loading="lazy"><div class="grid-overlay"><button class="play-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button></div></div>
              <span class="grid-title">${Utils.escapeHtml(t.title || 'Unknown')}</span>
              <span class="grid-subtitle">${Utils.escapeHtml(t.artist || '')}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${tracks.length > 0 ? `
        <div class="section-header"><h2>Browse</h2></div>
        <div class="chip-bar">
          <button class="chip" onclick="UI.navigate('tracks')">Tracks</button>
          <button class="chip" onclick="UI.navigate('albums')">Albums</button>
          <button class="chip" onclick="UI.navigate('artists')">Artists</button>
          <button class="chip" onclick="UI.navigate('genres')">Genres</button>
          <button class="chip" onclick="UI.navigate('playlists')">Playlists</button>
          <button class="chip" onclick="UI.navigate('queue')">Queue</button>
          <button class="chip" onclick="UI.navigate('favorites')">Favorites</button>
        </div>
      ` : ''}
    `;
  },

  async renderTracks(container, params = {}) {
    let tracks = params.tracks || await Data.getTracks();
    if (params.artist) tracks = tracks.filter(t => t.artist === params.artist || (t.featuredArtists || []).includes(params.artist));
    if (params.genre) tracks = tracks.filter(t => t.genre && t.genre.includes(params.genre));
    const sortBy = params.sortBy || 'title';
    const sortDir = params.sortDir || 'asc';
    tracks.sort((a,b) => {
      let va = a[sortBy] || '', vb = b[sortBy] || '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    container.innerHTML = `
      <div class="toolbar">
        <select class="sort-select" onchange="UI.sortTracks(this.value)"><option value="title">Title</option><option value="artist">Artist</option><option value="album">Album</option><option value="year">Year</option><option value="dateAdded">Date Added</option><option value="duration">Duration</option><option value="rating">Rating</option></select>
        <button class="icon-btn" onclick="UI.toggleSortDir()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg></button>
        ${this.selectionMode ? `
          <button class="btn-gold" onclick="UI.playSelected()">Play</button>
          <button class="btn-outline" onclick="UI.addSelectedToQueue()">Queue</button>
          <button class="btn-outline" onclick="UI.clearSelection()">Clear</button>
        ` : `<button class="icon-btn" onclick="UI.toggleSelectionMode()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></button>`}
      </div>
      <div class="track-list">${tracks.map((t, i) => this.renderTrackRow(t, i + 1)).join('')}</div>
    `;
  },

  renderTrackRow(track, num) {
    const selected = this.selectedTracks.has(track.id);
    const isPlaying = Player.currentTrack && Player.currentTrack.id === track.id;
    return `
      <div class="track-row ${selected ? 'selected' : ''} ${isPlaying ? 'playing' : ''}" data-id="${track.id}"
        onclick="UI.handleTrackClick('${track.id}', event)"
        oncontextmenu="UI.showTrackMenu('${track.id}', event); return false;"
      >
        ${this.selectionMode ? `<div class="track-check ${selected ? 'checked' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : ''}
        ${!this.selectionMode && isPlaying && Player.isPlaying ? `
          <div class="playing-bars"><span></span><span></span><span></span></div>
        ` : `<span class="track-num">${num || ''}</span>`}
        <img class="track-art" src="${this.getArtworkUrl(track)}" alt="" loading="lazy">
        <div class="track-info">
          <span class="track-title">${Utils.escapeHtml(track.title || 'Unknown')}</span>
          <span class="track-meta">${Utils.escapeHtml(track.artist || '')} ${track.year ? '· ' + track.year : ''}</span>
        </div>
        <span class="track-duration">${Utils.formatDuration(track.duration)}</span>
        <div class="track-actions">
          <button class="icon-btn small" onclick="event.stopPropagation(); UI.toggleTrackFavorite('${track.id}')">
            <svg viewBox="0 0 24 24" fill="${track.favorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="icon-btn small" onclick="event.stopPropagation(); UI.showTrackMenu('${track.id}', event)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
    `;
  },

  handleTrackClick(id, event) {
    if (this.selectionMode) { this.toggleTrackSelection(id); return; }
    if (event && (event.target.closest('.track-actions') || event.target.closest('.track-check'))) return;
    this.playTrackById(id);
  },

  async playTrackById(id, mode) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const playMode = mode || SettingsManager.get('playback.trackPlayMode');
    const allTracks = await Data.getTracks();
    let queue = [];
    if (playMode === 'selected') queue = [track];
    else if (playMode === 'context') queue = allTracks;
    else if (playMode === 'album' && track.album) queue = allTracks.filter(t => t.album === track.album);
    else if (playMode === 'artist' && track.artist) queue = allTracks.filter(t => t.artist === track.artist || (t.featuredArtists || []).includes(track.artist));
    else if (playMode === 'genre' && track.genre) queue = allTracks.filter(t => t.genre && t.genre.includes(track.genre));
    else queue = allTracks;
    const idx = queue.findIndex(t => t.id === id);
    Player.setQueue(queue, idx >= 0 ? idx : 0);
    Player.loadTrack(track);
  },

   async renderAlbums(container) {
    let albums = await Data.getAll('albums');
    const tracks = await Data.getTracks();
    const sort = SettingsManager.get('ui.albumSort') || 'name';
    const view = SettingsManager.get('ui.gridViewStyle') || 'grid';
    const cols = this.getGridColumns();

    albums = [...albums].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'artist') return (a.artist || '').localeCompare(b.artist || '');
      if (sort === 'year') return (a.year || 0) - (b.year || 0);
      if (sort === 'tracks') return (b.tracks?.length || 0) - (a.tracks?.length || 0);
      return 0;
    });

    const viewClass = view === 'collage' ? 'collage' : `grid-cols-${cols}`;

    container.innerHTML = `
      <div class="view-toolbar">
        <div class="view-toolbar-left">
          <button class="view-toggle-btn ${view === 'grid' && cols === 3 ? 'active' : ''}" onclick="UI.setGridView('grid', 3)" title="3x3 Grid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button class="view-toggle-btn ${view === 'grid' && cols === 4 ? 'active' : ''}" onclick="UI.setGridView('grid', 4)" title="4x4 Grid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="4" height="4" rx="1"/><rect x="9.5" y="3" width="4" height="4" rx="1"/><rect x="16" y="3" width="4" height="4" rx="1"/><rect x="3" y="9.5" width="4" height="4" rx="1"/><rect x="9.5" y="9.5" width="4" height="4" rx="1"/><rect x="16" y="9.5" width="4" height="4" rx="1"/><rect x="3" y="16" width="4" height="4" rx="1"/><rect x="9.5" y="16" width="4" height="4" rx="1"/><rect x="16" y="16" width="4" height="4" rx="1"/></svg>
          </button>
          <button class="view-toggle-btn ${view === 'collage' ? 'active' : ''}" onclick="UI.setGridView('collage', 2)" title="Collage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="9" height="9" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="15" y="12" width="6" height="9" rx="1"/><rect x="3" y="15" width="9" height="6" rx="1"/></svg>
          </button>
        </div>
        <div class="view-toolbar-right">
          <select class="sort-select" onchange="UI.setAlbumSort(this.value)">
            <option value="name" ${sort === 'name' ? 'selected' : ''}>Name</option>
            <option value="artist" ${sort === 'artist' ? 'selected' : ''}>Artist</option>
            <option value="year" ${sort === 'year' ? 'selected' : ''}>Year</option>
            <option value="tracks" ${sort === 'tracks' ? 'selected' : ''}>Track Count</option>
          </select>
        </div>
      </div>
      <div class="grid-container ${viewClass}">${albums.map(a => {
        let art = 'assets/default-art.png';
        for (const tid of a.tracks) { const t = tracks.find(tr => tr.id === tid); if (t) { art = this.getArtworkUrl(t); break; } }
        return `<div class="grid-item" onclick="UI.playAlbum('${a.id}')"><div class="grid-art"><img src="${art}" alt="" loading="lazy"><div class="grid-overlay"><button class="play-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button></div></div><span class="grid-title">${Utils.escapeHtml(a.name)}</span><span class="grid-subtitle">${Utils.escapeHtml(a.artist)}</span></div>`;
      }).join('')}</div>`;
  },

  async playAlbum(albumId) {
    const album = await Data.get('albums', albumId);
    if (!album) return;
    const tracks = await Data.getTracks();
    const albumTracks = album.tracks.map(id => tracks.find(t => t.id === id)).filter(Boolean);
    if (albumTracks.length > 0) { Player.setQueue(albumTracks, 0); Player.loadTrack(albumTracks[0]); }
  },

   async renderArtists(container) {
    let artists = await Data.getAll('artists');
    const tracks = await Data.getTracks();
    const sort = SettingsManager.get('ui.artistSort') || 'name';
    const view = SettingsManager.get('ui.gridViewStyle') || 'grid';
    const cols = this.getGridColumns();

    artists = [...artists].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'tracks') return (b.tracks?.length || 0) - (a.tracks?.length || 0);
      return 0;
    });

    const viewClass = view === 'collage' ? 'collage' : `grid-cols-${cols}`;

    container.innerHTML = `
      <div class="view-toolbar">
        <div class="view-toolbar-left">
          <button class="view-toggle-btn ${view === 'grid' && cols === 3 ? 'active' : ''}" onclick="UI.setGridView('grid', 3)" title="3x3 Grid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button class="view-toggle-btn ${view === 'grid' && cols === 4 ? 'active' : ''}" onclick="UI.setGridView('grid', 4)" title="4x4 Grid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="4" height="4" rx="1"/><rect x="9.5" y="3" width="4" height="4" rx="1"/><rect x="16" y="3" width="4" height="4" rx="1"/><rect x="3" y="9.5" width="4" height="4" rx="1"/><rect x="9.5" y="9.5" width="4" height="4" rx="1"/><rect x="16" y="9.5" width="4" height="4" rx="1"/><rect x="3" y="16" width="4" height="4" rx="1"/><rect x="9.5" y="16" width="4" height="4" rx="1"/><rect x="16" y="16" width="4" height="4" rx="1"/></svg>
          </button>
          <button class="view-toggle-btn ${view === 'collage' ? 'active' : ''}" onclick="UI.setGridView('collage', 2)" title="Collage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="9" height="9" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="15" y="12" width="6" height="9" rx="1"/><rect x="3" y="15" width="9" height="6" rx="1"/></svg>
          </button>
        </div>
        <div class="view-toolbar-right">
          <select class="sort-select" onchange="UI.setArtistSort(this.value)">
            <option value="name" ${sort === 'name' ? 'selected' : ''}>Name</option>
            <option value="tracks" ${sort === 'tracks' ? 'selected' : ''}>Track Count</option>
          </select>
        </div>
      </div>
      <div class="grid-container ${viewClass}">${artists.map(a => {
        let art = 'assets/default-art.png';
        for (const tid of a.tracks) { const t = tracks.find(tr => tr.id === tid); if (t) { art = this.getArtworkUrl(t); break; } }
        return `<div class="grid-item" onclick="UI.navigate('tracks', {artist: '${Utils.escapeHtml(a.name)}'})"><div class="grid-art circle"><img src="${art}" alt="" loading="lazy"></div><span class="grid-title">${Utils.escapeHtml(a.name)}</span><span class="grid-subtitle">${a.tracks.length} tracks</span></div>`;
      }).join('')}</div>`;
  },

  async renderGenres(container) {
    const genres = await Data.getAll('genres');
    const cols = this.getGridColumns();
    container.innerHTML = `<div class="grid-container" style="grid-template-columns: repeat(${cols}, 1fr);">${genres.map(g => `
      <div class="grid-item" onclick="UI.navigate('tracks', {genre: '${Utils.escapeHtml(g.name)}'})"><div class="grid-art gradient"><span class="genre-icon">${g.name.charAt(0).toUpperCase()}</span></div><span class="grid-title">${Utils.escapeHtml(g.name)}</span><span class="grid-subtitle">${g.tracks.length} tracks</span></div>
    `).join('')}</div>`;
  },

  async renderPlaylists(container) {
    const playlists = await Data.getPlaylists();
    const tracks = await Data.getTracks();
    container.innerHTML = `
      <div class="toolbar"><button class="btn-gold" onclick="UI.createPlaylist()">New Playlist</button><button class="btn-outline" onclick="UI.importM3U()">Import M3U</button></div>
      <div class="playlist-list">${await Promise.all(playlists.map(async p => {
        let art = 'assets/default-art.png';
        if (p.tracks.length > 0) { const t = tracks.find(tr => tr.id === p.tracks[0]); if (t) art = this.getArtworkUrl(t); }
        return `<div class="playlist-card" onclick="UI.openPlaylist('${p.id}')"><div class="playlist-art">${p.tracks.length > 0 ? `<img src="${art}" alt="">` : '<div class="playlist-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg></div>'}</div><div class="playlist-info"><span class="playlist-name">${Utils.escapeHtml(p.name)}</span><span class="playlist-count">${p.tracks.length} tracks ${p.auto ? '· Auto' : ''}</span></div><button class="icon-btn" onclick="event.stopPropagation(); UI.playPlaylist('${p.id}')"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button></div>`;
      })).join('')}</div>
    `;
  },

  async openPlaylist(id) {
    const pl = await Data.getPlaylist(id);
    if (!pl) return;
    const tracks = [];
    for (const tid of pl.tracks) { const t = await Data.getTrack(tid); if (t) tracks.push(t); }
    const container = document.getElementById('page-container');
    document.getElementById('page-title').textContent = Utils.escapeHtml(pl.name);
    container.innerHTML = `
      <div class="toolbar"><button class="btn-gold" onclick="UI.playPlaylist('${id}')">Play All</button><button class="btn-outline" onclick="UI.exportPlaylistM3U('${id}')">Export M3U</button>${!pl.auto ? `<button class="btn-outline danger" onclick="UI.deletePlaylist('${id}')">Delete</button>` : ''}</div>
      <div class="track-list">${tracks.map((t, i) => this.renderTrackRow(t, i + 1)).join('')}</div>
    `;
  },

  async renderQueue(container) {
    const queue = Player.queue;
    const idx = Player.queueIndex;
    container.innerHTML = `
      <div class="toolbar"><button class="btn-outline" onclick="Player.clearQueue()">Clear</button><button class="btn-outline" onclick="UI.saveQueueAsPlaylist()">Save as Playlist</button></div>
      <div class="track-list">${queue.map((t, i) => `
        <div class="track-row ${i === idx ? 'playing' : ''}" data-index="${i}">
          ${i === idx && Player.isPlaying ? `<div class="playing-bars"><span></span><span></span><span></span></div>` : `<span class="queue-num">${i + 1}</span>`}
          <img class="track-art" src="${this.getArtworkUrl(t)}" alt="">
          <div class="track-info"><span class="track-title">${Utils.escapeHtml(t.title)}</span><span class="track-meta">${Utils.escapeHtml(t.artist)}</span></div>
          <span class="track-duration">${Utils.formatDuration(t.duration)}</span>
          <div class="track-actions">
            <button class="icon-btn small" onclick="UI.playQueueIndex(${i})"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
            <button class="icon-btn small" onclick="Player.removeFromQueue(${i})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
        </div>
      `).join('')}</div>
    `;
  },

  async renderFolders(container) {
    const folders = await Data.getFolders();
    container.innerHTML = `
      <div class="toolbar"><button class="btn-gold" onclick="UI.addFolder()">Add Folder</button></div>
      <div class="folder-list">${folders.map(f => `
        <div class="folder-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg><span class="folder-path">${Utils.escapeHtml(f.path)}</span><button class="icon-btn" onclick="UI.removeFolder('${f.path}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
      `).join('')}</div>
      <input type="file" id="folder-input" webkitdirectory directory multiple style="display:none" onchange="UI.onFolderSelected(this.files)">
    `;
  },

  async renderSearch(container) {
    container.innerHTML = `
      <div class="search-hero">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="search-input" placeholder="Search tracks, albums, artists..." oninput="UI.onSearch(this.value)">
        </div>
      </div>
      <div class="search-filters">
        <select id="filter-artist" onchange="UI.onSearchFilter()"><option value="">All Artists</option></select>
        <select id="filter-genre" onchange="UI.onSearchFilter()"><option value="">All Genres</option></select>
        <select id="filter-year" onchange="UI.onSearchFilter()"><option value="">All Years</option></select>
      </div>
      <div id="search-results" class="track-list"></div>
    `;
    const artists = await Data.getAll('artists');
    const genres = await Data.getAll('genres');
    const years = [...new Set((await Data.getTracks()).map(t => t.year).filter(Boolean))].sort((a,b) => b-a);
    document.getElementById('filter-artist').innerHTML += artists.map(a => `<option value="${Utils.escapeHtml(a.name)}">${Utils.escapeHtml(a.name)}</option>`).join('');
    document.getElementById('filter-genre').innerHTML += genres.map(g => `<option value="${Utils.escapeHtml(g.name)}">${Utils.escapeHtml(g.name)}</option>`).join('');
    document.getElementById('filter-year').innerHTML += years.map(y => `<option value="${y}">${y}</option>`).join('');
  },

  async onSearch(query) {
    const artist = document.getElementById('filter-artist')?.value;
    const genre = document.getElementById('filter-genre')?.value;
    const year = document.getElementById('filter-year')?.value;
    const filters = {};
    if (artist) filters.artist = artist;
    if (genre) filters.genre = genre;
    if (year) { filters.yearMin = parseInt(year); filters.yearMax = parseInt(year); }
    const results = await Data.searchTracks(query, filters);
    const container = document.getElementById('search-results');
    container.innerHTML = results.map((t, i) => this.renderTrackRow(t, i + 1)).join('');
  },

  onSearchFilter() { this.onSearch(document.getElementById('search-input')?.value || ''); },

  async renderFavorites(container) {
    const tracks = await Data.getTracks();
    const favs = tracks.filter(t => t.favorite);
    container.innerHTML = `<div class="section-header"><h2>Favorites (${favs.length})</h2></div><div class="track-list">${favs.map((t, i) => this.renderTrackRow(t, i + 1)).join('')}</div>`;
  },

  async renderSettings(container) {
    container.innerHTML = `
      <div class="settings-list">
        <div class="settings-group">
          <h3>Library</h3>
          ${this.renderSetting('number', 'library.minFileSizeMB', 'Min File Size (MB)')}
          ${this.renderSetting('number', 'library.minDurationSeconds', 'Min Duration (sec)')}
          ${this.renderSetting('toggle', 'library.extractFeaturedArtists', 'Extract Featured Artists')}
          ${this.renderSetting('toggle', 'library.moodTagsEnabled', 'Mood Tags')}
          ${this.renderSetting('toggle', 'library.allowMultipleAlbums', 'Multiple Albums per Track')}
          <button class="btn-outline" onclick="UI.scanMusic()">Scan Music</button>
          <button class="btn-outline danger" onclick="Data.clearLibrary(); UI.showToast('Library cleared')">Clear Library</button>
        </div>
        <div class="settings-group">
          <h3>Audio</h3>
          ${this.renderSetting('toggle', 'audio.equalizerEnabled', 'Equalizer')}
          <button class="btn-outline" onclick="UI.navigate('equalizer')">Open Equalizer</button>
          ${this.renderSetting('number', 'audio.crossfadeDuration', 'Crossfade (sec)', {min:0, max:10, step:0.5})}
          ${this.renderSetting('number', 'audio.playPauseFadeDuration', 'Play/Pause Fade (sec)', {min:0, max:2, step:0.1})}
          ${this.renderSetting('toggle', 'audio.skipSilence', 'Skip Silence')}
          ${this.renderSetting('toggle', 'audio.gaplessPlayback', 'Gapless Playback')}
          ${this.renderSetting('toggle', 'audio.normalization', 'Volume Normalization')}
        </div>
        <div class="settings-group">
          <h3>Playback</h3>
          ${this.renderSetting('toggle', 'playback.persistentQueue', 'Persistent Queue')}
          ${this.renderSetting('select', 'playback.trackPlayMode', 'Track Play Mode', {options: {selected:'Selected only', context:'All tracks', album:'Same album', artist:'Same artist', genre:'Same genre'}})}
          ${this.renderSetting('select', 'playback.repeatMode', 'Repeat Mode', {options: {none:'None', all:'All', one:'One', n:'N times'}})}
          ${this.renderSetting('number', 'playback.repeatNTimes', 'Repeat N Times', {min:1, max:20})}
          ${this.renderSetting('toggle', 'playback.shuffleMode', 'Shuffle')}
        </div>
        <div class="settings-group">
          <h3>Sleep Timer</h3>
          ${this.renderSetting('toggle', 'playback.sleepTimer.enabled', 'Enable Sleep Timer')}
          ${this.renderSetting('select', 'playback.sleepTimer.mode', 'Mode', {options: {tracks:'Tracks', minutes:'Minutes'}})}
          ${this.renderSetting('number', 'playback.sleepTimer.value', 'Value')}
        </div>
        <div class="settings-group">
          <h3>Smart Pause</h3>
          ${this.renderSetting('toggle', 'playback.smartPause.onCall', 'Pause on Call')}
          ${this.renderSetting('toggle', 'playback.smartPause.onVolumeZero', 'Pause at Volume Zero')}
          ${this.renderSetting('toggle', 'playback.smartPause.onAppSwitch', 'Pause on App Switch')}
          ${this.renderSetting('toggle', 'playback.smartPause.onHeadphoneDisconnect', 'Pause on Headphone Disconnect')}
        </div>
        <div class="settings-group">
          <h3>UI</h3>
          ${this.renderSetting('toggle', 'ui.dynamicTheming', 'Dynamic Theming')}
          ${this.renderSetting('toggle', 'ui.particlesEnabled', 'Particles Effect')}
          ${this.renderSetting('number', 'ui.particlesIntensity', 'Particles Intensity', {min:0, max:1, step:0.1})}
          ${this.renderSetting('toggle', 'ui.miniplayerGlow', 'Miniplayer Glow')}
          ${this.renderSetting('select', 'ui.miniplayerGlowMode', 'Glow Mode', {options: {static:'Static', dynamic:'Dynamic', off:'Off'}})}
          ${this.renderSetting('select', 'ui.vibrationMode', 'Vibration', {options: {none:'None', vibrate:'Vibrate', haptic:'Haptic'}})}
          ${this.renderSetting('toggle', 'ui.waveformSeekbar', 'Waveform Seekbar')}
          ${this.renderSetting('number', 'ui.waveformBars', 'Waveform Bars', {min:40, max:160, step:10})}
          ${this.renderSetting('toggle', 'ui.animatingThumbnail', 'Animating Thumbnail')}
                    ${this.renderSetting('select', 'ui.gridColumns', 'Grid Columns', {options: {auto:'Auto', 2:'2 columns', 3:'3 columns', 4:'4 columns', 5:'5 columns'}})}
          ${this.renderSetting('select', 'ui.gridViewStyle', 'Grid View Style', {options: {grid:'Grid', collage:'Collage'}})}
        </div>
        <div class="settings-group">
          <h3>Smart Features</h3>
          ${this.renderSetting('toggle', 'smart.smortEnabled', 'Smort Mix')}
          ${this.renderSetting('toggle', 'smart.mostPlayedAutoUpdate', 'Auto-update Most Played')}
          ${this.renderSetting('toggle', 'smart.lostMemoriesEnabled', 'Lost Memories')}
        </div>
        <div class="settings-group">
          <h3>History & Scrobbling</h3>
          ${this.renderSetting('number', 'history.minListenSeconds', 'Min Listen Seconds')}
          ${this.renderSetting('number', 'history.minListenPercent', 'Min Listen %')}
          ${this.renderSetting('toggle', 'history.scrobbleEnabled', 'Last.fm Scrobbling')}
          ${this.renderSetting('text', 'history.lastFm.apiKey', 'Last.fm API Key')}
          ${this.renderSetting('text', 'history.lastFm.apiSecret', 'Last.fm API Secret')}
          ${this.renderSetting('toggle', 'history.totalListenTimer', 'Track Total Listen Time')}
        </div>
        <div class="settings-group">
          <h3>Lyrics</h3>
          ${this.renderSetting('toggle', 'lyrics.enabled', 'Enable Lyrics')}
          ${this.renderSetting('text', 'lyrics.ignoreEmbeddedPrefix', 'Ignore Prefix')}
          ${this.renderSetting('select', 'lyrics.preferredFormat', 'Preferred Format', {options: {auto:'Auto', lrc:'LRC', ttml:'TTML', embedded:'Embedded'}})}
          ${this.renderSetting('toggle', 'lyrics.highlightCurrentLine', 'Highlight Current Line')}
        </div>
        <button class="btn-gold btn-full" onclick="SettingsManager.save(); UI.showToast('Settings saved')">Save Settings</button>
        <button class="btn-outline danger btn-full" onclick="SettingsManager.reset()">Reset All Settings</button>
      </div>
    `;
    this.bindSettings();
  },

  renderSetting(type, path, label, opts = {}) {
    const val = SettingsManager.get(path);
    const id = 'setting-' + path.replace(/\./g, '-');
    if (type === 'toggle') {
      return `<label class="setting-row"><span>${label}</span><div class="toggle-switch"><input type="checkbox" id="${id}" data-path="${path}" ${val ? 'checked' : ''}><span class="toggle-slider"></span></div></label>`;
    } else if (type === 'select') {
      return `<label class="setting-row"><span>${label}</span><select id="${id}" data-path="${path}">${Object.entries(opts.options || {}).map(([k,v]) => `<option value="${k}" ${val===k?'selected':''}>${v}</option>`).join('')}</select></label>`;
    } else if (type === 'number') {
      return `<label class="setting-row"><span>${label}</span><input type="number" id="${id}" data-path="${path}" value="${val}" min="${opts.min||0}" max="${opts.max||9999}" step="${opts.step||1}"></label>`;
    } else if (type === 'text') {
      return `<label class="setting-row"><span>${label}</span><input type="text" id="${id}" data-path="${path}" value="${val||''}"></label>`;
    }
    return '';
  },

  bindSettings() {
    document.querySelectorAll('[data-path]').forEach(el => {
      el.addEventListener('change', (e) => {
        const path = e.target.dataset.path;
        let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        if (e.target.type === 'number') val = parseFloat(val);
        SettingsManager.set(path, val);
      });
    });
  },

  renderEqualizer(container) {
    const preset = SettingsManager.get('audio.eqCurrentPreset');
    const presets = SettingsManager.get('audio.eqPresets');
    const freqs = [32, 64, 125, 250, 500, 1, 2, 4, 8, 16];
    const units = ['Hz','Hz','Hz','Hz','Hz','kHz','kHz','kHz','kHz','kHz'];
    container.innerHTML = `
      <div class="eq-container">
        <div class="eq-presets"><select onchange="UI.loadEQPreset(this.value)">${presets.map(p => `<option value="${p.name}" ${p.name===preset?'selected':''}>${p.name}</option>`).join('')}<option value="Custom" ${preset==='Custom'?'selected':''}>Custom</option></select></div>
        <div class="eq-bands">${freqs.map((f, i) => `<div class="eq-band"><input type="range" min="-12" max="12" step="0.5" value="0" oninput="UI.setEQBand(${i}, this.value)" class="eq-slider" orient="vertical"><span class="eq-freq">${f}${units[i]}</span></div>`).join('')}</div>
      </div>
    `;
    this.loadEQPreset(preset);
  },

  loadEQPreset(name) {
    const presets = SettingsManager.get('audio.eqPresets');
    const preset = presets.find(p => p.name === name);
    const values = preset ? preset.values : SettingsManager.get('audio.eqCustomValues');
    SettingsManager.set('audio.eqCurrentPreset', name);
    document.querySelectorAll('.eq-slider').forEach((slider, i) => {
      if (values[i] !== undefined) { slider.value = values[i]; Player.setEQBand(i, values[i]); }
    });
  },

  setEQBand(index, value) {
    const val = parseFloat(value);
    Player.setEQBand(index, val);
    const custom = SettingsManager.get('audio.eqCustomValues');
    custom[index] = val;
    SettingsManager.set('audio.eqCustomValues', custom);
    SettingsManager.set('audio.eqCurrentPreset', 'Custom');
  },

  async renderLyrics(container) {
    const track = Player.currentTrack;
    if (!track) {
      container.innerHTML = '<div class="empty-state">No track playing</div>';
      return;
    }
    let lyrics = [];
    if (track.lyrics && !track.lyrics.startsWith(SettingsManager.get('lyrics.ignoreEmbeddedPrefix'))) {
      lyrics = Utils.lrcParse(track.lyrics);
    }
    container.innerHTML = `<div class="lyrics-container" id="lyrics-display">${lyrics.length > 0 ? lyrics.map((l, i) => `<div class="lyric-line" data-time="${l.time}" id="lyric-${i}">${Utils.escapeHtml(l.text)}</div>`).join('') : '<div class="empty-state">No lyrics available</div>'}</div>`;
    if (lyrics.length > 0) {
      this.lyricsInterval = setInterval(() => this.highlightLyric(lyrics), 200);
    }
  },

  highlightLyric(lyrics) {
    const current = Player.getCurrentTime();
    const lines = document.querySelectorAll('.lyric-line');
    let activeIdx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= current) activeIdx = i;
    }
    lines.forEach((line, i) => {
      line.classList.toggle('active', i === activeIdx);
      if (i === activeIdx && SettingsManager.get('lyrics.highlightCurrentLine')) {
        line.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  },

  openFullPlayer() {
    document.getElementById('full-player').classList.add('open');
    const waveformContainer = document.getElementById('waveform-container');
    const lineBar = document.getElementById('fp-progress-container');
    if (SettingsManager.get('ui.waveformSeekbar')) {
      if (waveformContainer) waveformContainer.style.display = 'block';
      if (lineBar) lineBar.style.display = 'none';
      this.renderWaveform();
    } else {
      if (waveformContainer) waveformContainer.style.display = 'none';
      if (lineBar) lineBar.style.display = 'block';
    }
  },

  closeFullPlayer() {
    document.getElementById('full-player').classList.remove('open');
    if (this.lyricsInterval) clearInterval(this.lyricsInterval);
  },

  async renderWaveform() {
    const track = Player.currentTrack;
    if (!track) return;
    const container = document.getElementById('waveform-container');
    const canvas = document.getElementById('waveform-canvas');
    if (!container || !canvas) return;
    container.style.display = 'block';

    // Clear old content immediately so stale waveform never shows
    const clearCtx = canvas.getContext('2d');
    clearCtx.clearRect(0, 0, canvas.width || 1, canvas.height || 1);

    // One-time click-to-seek listener
    if (!this._waveformClickBound) {
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        Player.seek(pct);
      });
      this._waveformClickBound = true;
    }

    try {
      const url = Player.getTrackUrl(track);
      if (!url) return;
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuf = await audioCtx.decodeAudioData(buf);
      const barCount = Math.max(40, Math.min(160, SettingsManager.get('ui.waveformBars') || 80));
      const peaks = Utils.getAudioPeaks(audioBuf, barCount);
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      const w = rect.width / peaks.length;
      const h = rect.height;
      const barW = Math.max(w - 1, 1);
      this.waveformPeaks = peaks;
      this.waveformBarW = barW;
      this.waveformBarCount = peaks.length;
      this.drawWaveform(ctx, peaks, barW, rect.width, h, 0);
      if (url !== track.url) URL.revokeObjectURL(url);
    } catch(e) {
      console.error('Waveform render failed:', e);
      container.style.display = 'none';
    }
  },

  drawWaveform(ctx, peaks, barW, totalW, h, progress) {
    ctx.clearRect(0, 0, totalW, h);
    const progressX = progress * totalW;
    const { r, g, b } = this.particleColors;
    peaks.forEach((p, i) => {
      const x = i * (totalW / peaks.length);
      const barH = Math.max(p * h * 0.85, 2);
      const y = (h - barH) / 2;
      const isPlayed = x < progressX;
      const alpha = isPlayed ? 0.9 : 0.3;
      const brightness = isPlayed ? 1 : 0.6;
      ctx.fillStyle = `rgba(${Math.min(r * brightness, 255)}, ${Math.min(g * brightness, 255)}, ${Math.min(b * brightness, 255)}, ${alpha})`;
      const radius = Math.min(barW / 2, 3);
      this._roundRect(ctx, x, y, barW, barH, radius);
      ctx.fill();
    });
  },

  _roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  },

  updateWaveformProgress(progress) {
    if (!this.waveformPeaks || !SettingsManager.get('ui.waveformSeekbar')) return;
    const canvas = document.getElementById('waveform-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    this.drawWaveform(ctx, this.waveformPeaks, this.waveformBarW, rect.width, rect.height, progress / 100);
  },

  onTrackChanged(track) {
    document.getElementById('now-playing-bar').classList.remove('hidden');
    document.getElementById('np-title').textContent = track.title || 'Unknown';
    document.getElementById('np-artist').textContent = track.artist || '-';
    document.getElementById('np-art').src = track.artwork || 'assets/default-art.png';
    document.getElementById('fp-title').textContent = track.title || 'Unknown';
    document.getElementById('fp-artist').textContent = track.artist || '-';
    document.getElementById('fp-art').src = track.artwork || 'assets/default-art.png';
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
    document.getElementById('sidebar-title').textContent = track.title || 'Not Playing';
    document.getElementById('sidebar-artist').textContent = track.artist || '-';
    document.getElementById('sidebar-art').src = track.artwork || 'assets/default-art.png';
    this.updatePlayerControls();
    if (this.currentPage === 'tracks' || this.currentPage === 'favorites' || this.currentPage === 'queue') {
      this.renderCurrentPage();
    }
    // Re-render waveform on track change if full player is open
    const fp = document.getElementById('full-player');
    if (fp && fp.classList.contains('open') && SettingsManager.get('ui.waveformSeekbar')) {
      this.renderWaveform();
    }
  },

  onPlaybackState(state) {
    const isPlaying = state.playing;
    const npIcon = document.querySelector('#np-play svg');
    if (npIcon) {
      if (isPlaying) { npIcon.innerHTML = '<line x1="10" y1="8" x2="10" y2="16"/><line x1="14" y1="8" x2="14" y2="16"/>'; }
      else { npIcon.innerHTML = '<polygon points="10 8 16 12 10 16 10 8"/>'; }
    }
    const fpIcon = document.querySelector('#fp-play svg');
    if (fpIcon) {
      if (isPlaying) { fpIcon.innerHTML = '<line x1="10" y1="8" x2="10" y2="16"/><line x1="14" y1="8" x2="14" y2="16"/>'; }
      else { fpIcon.innerHTML = '<polygon points="10 8 16 12 10 16 10 8"/>'; }
    }
    const art = document.getElementById('fp-art');
    if (art) art.classList.toggle('playing', isPlaying && SettingsManager.get('ui.animatingThumbnail'));
  },

  onTimeUpdate(detail) {
    document.getElementById('fp-current').textContent = Utils.formatTime(detail.current);
    document.getElementById('fp-duration').textContent = Utils.formatTime(detail.duration);
    document.getElementById('fp-progress-bar').style.width = detail.progress + '%';
    document.getElementById('fp-progress-handle').style.left = detail.progress + '%';
    document.getElementById('np-progress').style.width = detail.progress + '%';
    this.updateWaveformProgress(detail.progress);
  },

  onAudioPeak(detail) {
    if (SettingsManager.get('ui.particlesEnabled')) this.updateParticles(detail.peak);
    if (SettingsManager.get('ui.miniplayerGlow')) this.updateMiniplayerGlow(detail.smooth);
  },

  onThemeColors(colors) {
    if (!SettingsManager.get('ui.dynamicTheming')) return;
    document.documentElement.style.setProperty('--dynamic-primary', colors.dominant);
    document.documentElement.style.setProperty('--dynamic-vibrant', colors.vibrant);
    this.setParticleColors(colors);
  },

  updatePlayerControls() {
    const repeat = SettingsManager.get('playback.repeatMode');
    const shuffle = SettingsManager.get('playback.shuffleMode');
    document.getElementById('fp-repeat').classList.toggle('active', repeat !== 'none');
    document.getElementById('fp-shuffle').classList.toggle('active', shuffle);
  },

  toggleShuffle() {
    SettingsManager.set('playback.shuffleMode', !SettingsManager.get('playback.shuffleMode'));
    this.updatePlayerControls();
  },

  toggleRepeat() {
    const modes = ['none', 'all', 'one', 'n'];
    const current = SettingsManager.get('playback.repeatMode');
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    SettingsManager.set('playback.repeatMode', next);
    this.updatePlayerControls();
    this.showToast('Repeat: ' + next);
  },

  async toggleFavorite() {
    const track = Player.currentTrack;
    if (!track) return;
    track.favorite = !track.favorite;
    await Data.saveTrack(track);
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
    this.showToast(track.favorite ? 'Added to favorites' : 'Removed from favorites');
  },

  async toggleTrackFavorite(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    track.favorite = !track.favorite;
    await Data.saveTrack(track);
    this.renderCurrentPage();
  },

  particleColors: { r: 212, g: 175, b: 55 },
  particleAccent: '#d4af37',

  initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    this.particlesCtx = canvas.getContext('2d');
    this.resizeParticles();
    window.addEventListener('resize', () => this.resizeParticles());
    this.particles = [];
    this.bars = [];
    this.initParticleField();
    this.animateParticles();
  },

  resizeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },

  initParticleField() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const w = canvas.width, h = canvas.height;
    this.particles = [];
    const count = Math.floor((w * h) / 8000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w, y: Math.random() * h,
        baseX: Math.random() * w, baseY: Math.random() * h,
        vx: 0, vy: 0,
        size: Math.random() * 2.5 + 0.5,
        baseSize: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2
      });
    }
    this.bars = [];
    const barCount = Math.floor(w / 12);
    for (let i = 0; i < barCount; i++) {
      this.bars.push({ x: i * 12, height: 0, targetHeight: 0 });
    }
  },

  setParticleColors(colors) {
    if (!colors) return;
    const m = colors.dominant?.match(/\d+/g);
    if (m) {
      this.particleColors = { r: parseInt(m[0]), g: parseInt(m[1]), b: parseInt(m[2]) };
    }
    this.particleAccent = colors.vibrant || colors.dominant || '#d4af37';
  },

  animateParticles() {
    requestAnimationFrame(() => this.animateParticles());
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || !SettingsManager.get('ui.particlesEnabled')) return;
    const ctx = this.particlesCtx;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const peak = Player.peakSmooth || 0;
    const intensity = SettingsManager.get('ui.particlesIntensity') || 0.6;
    const time = Date.now() * 0.001;
    const { r, g, b } = this.particleColors;

    this.particles.forEach(p => {
      const audioForce = peak * intensity * 8;
      p.vx += (Math.random() - 0.5) * 0.1 + Math.sin(time * p.speed + p.phase) * 0.05;
      p.vy += (Math.random() - 0.5) * 0.1 - audioForce * 0.3;
      p.vx *= 0.98; p.vy *= 0.98;
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
      const sizePulse = 1 + peak * intensity * 2;
      const currentSize = p.baseSize * sizePulse;
      const alphaPulse = p.alpha * (0.3 + peak * intensity * 1.5);
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(alphaPulse, 0.8)})`;
      ctx.fill();
    });

    const connectDist = 80 + peak * 60;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.03 + peak * 0.08})`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < connectDist) {
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.stroke();
        }
      }
    }

    if (peak > 0.1) {
      const barCount = this.bars.length;
      const barWidth = w / barCount;
      for (let i = 0; i < barCount; i++) {
        this.bars[i].targetHeight = Math.random() * peak * h * 0.15 * intensity;
        this.bars[i].height += (this.bars[i].targetHeight - this.bars[i].height) * 0.2;
        if (this.bars[i].height > 2) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.04 + peak * 0.06})`;
          ctx.fillRect(i * barWidth, h - this.bars[i].height, barWidth - 1, this.bars[i].height);
        }
      }
    }
  },

  updateParticles(peak) {},

  initMiniplayerGlow() {},

  updateMiniplayerGlow(peak) {
    const bar = document.getElementById('now-playing-bar');
    if (!bar) return;
    const intensity = SettingsManager.get('ui.particlesIntensity') || 0.6;
    const alpha = peak * intensity;
    bar.style.boxShadow = `0 -4px 20px rgba(var(--accent-rgb), ${alpha}), 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)`;
  },

  checkLandscape() {
    const isLandscape = window.innerWidth > window.innerHeight && window.innerWidth >= 768;
    document.body.classList.toggle('landscape', isLandscape);
  },

    getGridColumns() {
    const view = SettingsManager.get('ui.gridViewStyle') || 'grid';
    if (view === 'collage') return 2;
    const setting = SettingsManager.get('ui.gridColumns');
    if (setting !== 'auto') return parseInt(setting);
    const w = window.innerWidth;
    if (w >= 1200) return 5;
    if (w >= 900) return 4;
    if (w >= 600) return 3;
    return 2;
  },

    setGridView(style, cols) {
    SettingsManager.set('ui.gridViewStyle', style);
    SettingsManager.set('ui.gridColumns', cols);
    SettingsManager.save();
    this.renderCurrentPage();
  },

  setAlbumSort(sort) {
    SettingsManager.set('ui.albumSort', sort);
    SettingsManager.save();
    this.renderCurrentPage();
  },

  setArtistSort(sort) {
    SettingsManager.set('ui.artistSort', sort);
    SettingsManager.save();
    this.renderCurrentPage();
  },

  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    this.selectedTracks.clear();
    this.renderCurrentPage();
  },

  toggleTrackSelection(id) {
    if (this.selectedTracks.has(id)) this.selectedTracks.delete(id);
    else this.selectedTracks.add(id);
    this.renderCurrentPage();
  },

  clearSelection() {
    this.selectedTracks.clear();
    this.selectionMode = false;
    this.renderCurrentPage();
  },

  async playSelected() {
    const tracks = await Data.getTracks();
    const selected = tracks.filter(t => this.selectedTracks.has(t.id));
    if (selected.length > 0) {
      Player.setQueue(selected, 0);
      Player.loadTrack(selected[0]);
    }
    this.clearSelection();
  },

  addSelectedToQueue() {},

  async showPlaylistModal() {
    const track = Player.currentTrack;
    if (!track) return;
    const playlists = await Data.getPlaylists();
    const userPls = playlists.filter(p => p.type === 'user');
    document.getElementById('playlist-modal-list').innerHTML = userPls.map(p => `
      <div class="modal-item" onclick="UI.addToPlaylist('${p.id}', '${track.id}')">${Utils.escapeHtml(p.name)}</div>
    `).join('');
    document.getElementById('playlist-modal').classList.add('open');
  },

  hidePlaylistModal() {
    document.getElementById('playlist-modal').classList.remove('open');
  },

  async addToPlaylist(playlistId, trackId) {
    const pl = await Data.getPlaylist(playlistId);
    if (!pl) return;
    if (!pl.tracks.includes(trackId)) {
      pl.tracks.push(trackId);
      await Data.updatePlaylist(pl);
      this.showToast('Added to playlist');
    }
    this.hidePlaylistModal();
  },

  async createPlaylist() {
    const name = prompt('Playlist name:');
    if (name) {
      await Data.createPlaylist(name);
      this.renderSidebarPlaylists();
      this.renderCurrentPage();
    }
  },

  async createPlaylistFromModal() {
    const name = prompt('Playlist name:');
    if (name) {
      await Data.createPlaylist(name);
      this.showPlaylistModal();
      this.renderSidebarPlaylists();
    }
  },

  async deletePlaylist(id) {
    if (confirm('Delete this playlist?')) {
      await Data.deletePlaylist(id);
      this.navigate('playlists');
      this.renderSidebarPlaylists();
    }
  },

  async playPlaylist(id) {
    const pl = await Data.getPlaylist(id);
    if (!pl || pl.tracks.length === 0) return;
    const tracks = [];
    for (const tid of pl.tracks) {
      const t = await Data.getTrack(tid);
      if (t) tracks.push(t);
    }
    Player.setQueue(tracks, 0);
    Player.loadTrack(tracks[0]);
  },

  async exportPlaylistM3U(id) {
    await Scanner.exportM3U(id);
  },

  async saveQueueAsPlaylist() {
    const name = prompt('Playlist name:');
    if (name) {
      const ids = Player.queue.map(t => t.id);
      await Data.createPlaylist(name, ids);
      this.showToast('Queue saved as playlist');
      this.renderSidebarPlaylists();
    }
  },

  setupPlayButton(btn) {
    if (!btn) return;
    let pressTimer = null;
    let isLongPress = false;
    const LONG_PRESS_MS = 500;
    const startPress = (e) => {
      isLongPress = false;
      pressTimer = setTimeout(() => {
        isLongPress = true;
        btn.classList.add('holding');
        Utils.vibrate(20);
      }, LONG_PRESS_MS);
    };
    const endPress = (e) => {
      clearTimeout(pressTimer);
      btn.classList.remove('holding');
      if (isLongPress) { Player.resetTrack(); }
      else { Player.togglePlay(); }
    };
    const cancelPress = () => {
      clearTimeout(pressTimer);
      btn.classList.remove('holding');
    };
    btn.addEventListener('pointerdown', startPress);
    btn.addEventListener('pointerup', endPress);
    btn.addEventListener('pointerleave', cancelPress);
    btn.addEventListener('pointercancel', cancelPress);
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
  },

  async renderSidebarPlaylists() {
    const playlists = await Data.getPlaylists();
    const container = document.getElementById('user-playlists');
    if (!container) return;
    container.innerHTML = playlists.map(p => `
      <a href="#playlists" class="playlist-link" onclick="UI.openPlaylist('${p.id}'); return false;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        <span>${Utils.escapeHtml(p.name)}</span>
      </a>
    `).join('');
  },

  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  scanMusic() {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.directory = true;
    input.multiple = true;
    input.onchange = (e) => {
      this.showToast('Scanning...');
      Scanner.scanFiles(e.target.files);
    };
    input.click();
  },

  onScanProgress(detail) {
    this.showToast(`Scanning: ${detail.progress}%`);
  },

  onScanComplete(detail) {
    this.showToast(`Scan complete. Added ${detail.added} tracks.`);
    this.renderSidebarPlaylists();
    this.renderCurrentPage();
  },

  onSettingChanged(detail) {
    if (detail.path.startsWith('audio.eq')) Player.applyEQPreset();
    if (detail.path === 'ui.themeMode') this.applyTheme();
  },

  applyTheme() {
    const mode = SettingsManager.get('ui.themeMode');
    document.body.classList.remove('theme-dark', 'theme-black', 'theme-gold');
    document.body.classList.add('theme-' + mode);
  },

  renderCurrentPage() {
    this.navigate(this.currentPage);
  },

  addFolder() {
    document.getElementById('folder-input')?.click();
  },

  async onFolderSelected(files) {
    const paths = [...new Set(Array.from(files).map(f => f.webkitRelativePath.split('/')[0]))];
    for (const path of paths) {
      await Data.saveFolder({ path, dateAdded: Date.now() });
    }
    this.renderCurrentPage();
  },

  async removeFolder(path) {
    await Data.deleteFolder(path);
    this.renderCurrentPage();
  },

  showTrackMenu(id, event) {
    event.stopPropagation();
  },

  playQueueIndex(idx) {
    Player.queueIndex = idx;
    Player.loadTrack(Player.queue[idx]);
  },

  shareTrack() {
    const track = Player.currentTrack;
    if (!track) return;
    if (navigator.share) {
      navigator.share({ title: track.title, text: `${track.artist} - ${track.title}` });
    } else {
      navigator.clipboard.writeText(`${track.artist} - ${track.title}`);
      this.showToast('Copied to clipboard');
    }
  },

  importM3U() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.m3u,.m3u8';
    input.onchange = async (e) => {
      for (const file of e.target.files) {
        await Scanner.importM3U(file);
      }
      this.showToast('M3U imported');
      this.renderCurrentPage();
    };
    input.click();
  },

  sortTracks(field) {
    this.navigate('tracks', { sortBy: field, sortDir: 'asc' });
  },

  toggleSortDir() {}
};
