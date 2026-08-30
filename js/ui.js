const UI = {
  currentPage: 'home',
  currentPageParams: {},
  isSelectionMode: false,
  selectedTracks: new Set(),
  currentTrackParams: {},
  lastLyricIndex: -1,
  trackMenuTargetId: null,
  trackMenuActions: null,
  currentSortDir: 'asc',

  getArtworkUrl(track) {
    if (!track) return 'assets/default-art.png';
    if (track.artworkBlob) {
      return URL.createObjectURL(track.artworkBlob);
    }
    return track.artwork || 'assets/default-art.png';
  },

  async init() {
    this.bindGlobalEvents();
    this.bindPlayerControls();
    this.bindFullPlayer();
    this.bindSidebar();
    this.bindTabBar();
    this.bindPlaylistModal();
    this.bindParticles();
    this.bindKeyboard();
    this.bindTouchGestures();

    window.addEventListener('track-changed', (e) => this.onTrackChanged(e.detail));
    window.addEventListener('playback-state', (e) => this.onPlaybackState(e.detail));
    window.addEventListener('time-update', (e) => this.onTimeUpdate(e.detail));
    window.addEventListener('audio-peak', (e) => this.onAudioPeak(e.detail));
    window.addEventListener('theme-colors', (e) => this.onThemeColors(e.detail));
    window.addEventListener('setting-changed', (e) => this.onSettingChanged(e.detail));
    window.addEventListener('scan-progress', (e) => this.onScanProgress(e.detail));
    window.addEventListener('scan-complete', (e) => this.onScanComplete(e.detail));

    if (Player.currentTrack) {
      this.onTrackChanged(Player.currentTrack);
    }
    this.updatePlayerControls();
    this.renderSidebarPlaylists();
    this.navigate('home');
  },

  bindGlobalEvents() {
    document.getElementById('menu-toggle').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('close-sidebar').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('sidebar-overlay').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('search-toggle').addEventListener('click', () => this.navigate('search'));
    document.getElementById('close-playlist-modal').addEventListener('click', () => this.hidePlaylistModal());
    document.getElementById('create-playlist-btn').addEventListener('click', () => this.createPlaylist());
    document.getElementById('close-track-menu').addEventListener('click', () => this.hideTrackMenu());

    document.getElementById('playlist-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('playlist-modal')) this.hidePlaylistModal();
    });
    document.getElementById('track-menu-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('track-menu-modal')) this.hideTrackMenu();
    });
  },

  bindPlayerControls() {
    const npPlay = document.getElementById('np-play');
    const npPrev = document.getElementById('np-prev');
    const npNext = document.getElementById('np-next');
    const npTrack = document.getElementById('np-track');

    npPlay.addEventListener('click', () => Player.togglePlay());
    npPrev.addEventListener('click', () => Player.prev());
    npNext.addEventListener('click', () => Player.next());
    npTrack.addEventListener('click', () => this.openFullPlayer());
  },

  bindFullPlayer() {
    const fp = document.getElementById('full-player');
    const fpClose = document.getElementById('fp-close');
    const fpPlay = document.getElementById('fp-play');
    const fpPrev = document.getElementById('fp-prev');
    const fpNext = document.getElementById('fp-next');
    const fpShuffle = document.getElementById('fp-shuffle');
    const fpRepeat = document.getElementById('fp-repeat');
    const fpFavorite = document.getElementById('fp-favorite');
    const fpProgress = document.getElementById('fp-progress-container');
    const fpAdd = document.getElementById('fp-add');
    const fpShare = document.getElementById('fp-share');

    fpClose.addEventListener('click', () => this.closeFullPlayer());
    fpPlay.addEventListener('click', () => Player.togglePlay());
    fpPrev.addEventListener('click', () => Player.prev());
    fpNext.addEventListener('click', () => Player.next());
    fpShuffle.addEventListener('click', () => this.toggleShuffle());
    fpRepeat.addEventListener('click', () => this.toggleRepeat());
    fpFavorite.addEventListener('click', () => this.toggleFavorite());
    fpAdd.addEventListener('click', () => this.showPlaylistModal());
    fpShare.addEventListener('click', () => this.shareTrack());

    let isDragging = false;
    fpProgress.addEventListener('click', (e) => {
      const rect = fpProgress.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      Player.seek(percent);
    });

    const handleDrag = (e) => {
      if (!isDragging) return;
      const rect = fpProgress.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      Player.seek(percent);
    };

    fpProgress.addEventListener('mousedown', () => isDragging = true);
    fpProgress.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);

    let touchStartY = 0;
    let touchStartX = 0;
    fp.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    });
    fp.addEventListener('touchmove', (e) => {
      const diffY = e.touches[0].clientY - touchStartY;
      const diffX = e.touches[0].clientX - touchStartX;
      if (diffY > 80 && Math.abs(diffX) < 50) {
        this.closeFullPlayer();
      }
    });
  },

  bindSidebar() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.navigate(page);
        this.toggleSidebar();
      });
    });
  },

  bindTabBar() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.navigate(tab);
      });
    });
  },

  bindPlaylistModal() {
    document.getElementById('playlist-modal').addEventListener('click', (e) => {
      if (e.target.id === 'playlist-modal') this.hidePlaylistModal();
    });
  },

  bindParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || !SettingsManager.get('ui.particlesEnabled')) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const intensity = SettingsManager.get('ui.particlesIntensity') || 0.6;
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4af37';

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.008;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse)) * intensity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = pulseOpacity;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = pulseOpacity * 0.15;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  },

  bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch(e.code) {
        case 'Space': e.preventDefault(); Player.togglePlay(); break;
        case 'ArrowRight': Player.next(); break;
        case 'ArrowLeft': Player.prev(); break;
        case 'ArrowUp': Player.setVolume(Math.min(1, Player.audio.volume + 0.1)); break;
        case 'ArrowDown': Player.setVolume(Math.max(0, Player.audio.volume - 0.1)); break;
        case 'KeyF': if (Player.currentTrack) this.toggleFavorite(); break;
        case 'KeyS': this.toggleShuffle(); break;
        case 'KeyR': this.toggleRepeat(); break;
        case 'KeyM': this.toggleSidebar(); break;
      }
    });
  },

  bindTouchGestures() {
    let startX = 0;
    let startY = 0;
    const app = document.getElementById('app');

    app.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    app.addEventListener('touchmove', (e) => {
      const diffX = e.touches[0].clientX - startX;
      const diffY = e.touches[0].clientY - startY;

      if (Math.abs(diffX) > 80 && Math.abs(diffY) < 50) {
        if (diffX > 0 && startX < 30) {
          this.toggleSidebar();
        }
      }
    });
  },

  updatePlayerControls() {
    const isPlaying = Player.isPlaying;
    const playIcon = `<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"9 6 19 12 9 18 9 6\"/></svg>`;
    const pauseIcon = `<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>`;

    document.getElementById('np-play-icon').innerHTML = isPlaying ? pauseIcon : playIcon;
    document.getElementById('fp-play-icon').innerHTML = isPlaying ? pauseIcon : playIcon;

    document.getElementById('fp-shuffle').classList.toggle('active', SettingsManager.get('playback.shuffleMode'));
    document.getElementById('fp-repeat').classList.toggle('active', SettingsManager.get('playback.repeatMode') !== 'none');
  },

  onTrackChanged(track) {
    const artwork = this.getArtworkUrl(track);
    document.getElementById('now-playing-bar').classList.remove('hidden');
    document.getElementById('np-title').textContent = track.title || 'Unknown';
    document.getElementById('np-artist').textContent = track.artist || '-';
    document.getElementById('np-art').src = artwork;
    document.getElementById('fp-title').textContent = track.title || 'Unknown';
    document.getElementById('fp-artist').textContent = track.artist || '-';
    document.getElementById('fp-art').src = artwork;
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
    document.getElementById('sidebar-title').textContent = track.title || 'Not Playing';
    document.getElementById('sidebar-artist').textContent = track.artist || '-';
    document.getElementById('sidebar-art').src = artwork;
    this.updatePlayerControls();
    if (this.currentPage === 'tracks' || this.currentPage === 'favorites' || this.currentPage === 'queue') {
      this.renderCurrentPage();
    }
    const fp = document.getElementById('full-player');
    if (fp && fp.classList.contains('open') && SettingsManager.get('ui.waveformSeekbar')) {
      this.renderWaveform();
    }
  },

  onPlaybackState(detail) {
    this.updatePlayerControls();
    document.getElementById('fp-art').classList.toggle('playing', detail.playing);
  },

  onTimeUpdate(detail) {
    const progress = detail.progress || 0;
    document.getElementById('np-progress').style.width = progress + '%';
    document.getElementById('fp-progress-bar').style.width = progress + '%';
    document.getElementById('fp-progress-handle').style.left = progress + '%';
    document.getElementById('fp-current').textContent = Utils.formatTime(detail.current);
    document.getElementById('fp-duration').textContent = Utils.formatTime(detail.duration);
  },

  onAudioPeak(detail) {
    const peak = detail.smooth || 0;
    const npBar = document.getElementById('now-playing-bar');
    if (npBar && SettingsManager.get('ui.miniplayerGlow')) {
      const intensity = peak * 15;
      const mode = SettingsManager.get('ui.miniplayerGlowMode');
      if (mode === 'dynamic') {
        npBar.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 ${intensity}px rgba(var(--accent-rgb), ${peak * 0.3})`;
      } else {
        npBar.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 ${intensity}px rgba(255,255,255, ${peak * 0.15})`;
      }
    }
  },

  onThemeColors(detail) {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-primary', detail.dominant);
    root.style.setProperty('--dynamic-vibrant', detail.vibrant);
    const rgb = detail.dominant.match(/\d+/g);
    if (rgb) root.style.setProperty('--accent-rgb', rgb.join(', '));
  },

  onSettingChanged(detail) {
    if (detail.path.startsWith('audio.eq')) {
      Player.applyEQPreset();
    }
    if (detail.path === 'ui.themeMode') {
      document.body.classList.toggle('light', detail.value === 'light');
    }
    if (detail.path === 'ui.particlesEnabled') {
      location.reload();
    }
  },

  onScanProgress(detail) {
    console.log(`Scanning: ${detail.progress}% - ${detail.current}`);
  },

  onScanComplete(detail) {
    console.log(`Scan complete. Added ${detail.added} tracks.`);
    this.renderSidebarPlaylists();
    this.renderCurrentPage();
  },

  navigate(page, params = {}) {
    this.currentPage = page;
    this.currentPageParams = params;
    if (page === 'tracks' || page === 'favorites') {
      this.currentTrackParams = params;
    }
    this.renderCurrentPage();
    this.updateActiveNav();
    this.updatePageTitle();
    document.getElementById('page-container').scrollTop = 0;
    Utils.vibrate(8);
  },

  renderCurrentPage() {
    const container = document.getElementById('page-container');
    switch(this.currentPage) {
      case 'home': this.renderHome(container); break;
      case 'search': this.renderSearch(container); break;
      case 'tracks': this.renderTracks(container, this.currentPageParams); break;
      case 'albums': this.renderAlbums(container); break;
      case 'artists': this.renderArtists(container); break;
      case 'genres': this.renderGenres(container); break;
      case 'playlists': this.renderPlaylists(container); break;
      case 'playlist-detail': this.renderPlaylistDetail(container, this.currentPageParams); break;
      case 'queue': this.renderQueue(container); break;
      case 'lyrics': this.renderLyrics(container); break;
      case 'folders': this.renderFolders(container); break;
      case 'favorites': this.renderFavorites(container); break;
      case 'settings': this.renderSettings(container); break;
      case 'album-detail': this.renderAlbumDetail(container, this.currentPageParams); break;
      case 'artist-detail': this.renderArtistDetail(container, this.currentPageParams); break;
      case 'genre-detail': this.renderGenreDetail(container, this.currentPageParams); break;
      default: this.renderHome(container);
    }
  },

  updatePageTitle() {
    const titles = {
      home: 'Home', search: 'Search', tracks: 'Tracks', albums: 'Albums',
      artists: 'Artists', genres: 'Genres', playlists: 'Playlists',
      queue: 'Queue', lyrics: 'Lyrics', folders: 'Folders',
      favorites: 'Favorites', settings: 'Settings'
    };
    document.getElementById('page-title').textContent = titles[this.currentPage] || 'Okvy MusiQ';
  },

  updateActiveNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === this.currentPage);
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === this.currentPage);
    });
  },

  async renderHome(container) {
    const tracks = await Data.getTracks();
    const albums = await Data.getAll('albums');
    const artists = await Data.getAll('artists');
    const playlists = await Data.getPlaylists();
    const favorites = tracks.filter(t => t.favorite);
    const recent = [...tracks].sort((a,b) => (b.lastPlayed||0) - (a.lastPlayed||0)).slice(0, 10);
    const mostPlayed = [...tracks].sort((a,b) => (b.playCount||0) - (a.playCount||0)).slice(0, 10);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    let html = `
      <div class="hero-section">
        <div class="hero-greeting">${greeting}</div>
        <div class="hero-sub">${tracks.length} songs in your library</div>
        <div class="hero-card">
          <div class="hero-stats">
            <div class="stat-item"><div class="stat-value">${tracks.length}</div><div class="stat-label">Songs</div></div>
            <div class="stat-item"><div class="stat-value">${albums.size}</div><div class="stat-label">Albums</div></div>
            <div class="stat-item"><div class="stat-value">${artists.size}</div><div class="stat-label">Artists</div></div>
            <div class="stat-item"><div class="stat-value">${favorites.length}</div><div class="stat-label">Favorites</div></div>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn-gold btn-large" onclick="UI.scanMusic()">Scan Music</button>
            <button class="btn-outline" onclick="UI.navigate('tracks')">View All</button>
          </div>
        </div>
      </div>
    `;

    if (recent.length > 0) {
      html += `<div class="section-header"><h2>Recently Played</h2></div><div class="h-scroll">`;
      recent.forEach(track => {
        html += `<div class="h-scroll-item" onclick="Player.loadTrack(Data.getTrack('${track.id}'))">${this.renderAlbumCard(track, 'small')}</div>`;
      });
      html += `</div>`;
    }

    if (mostPlayed.length > 0) {
      html += `<div class="section-header"><h2>Most Played</h2></div><div class="h-scroll">`;
      mostPlayed.forEach(track => {
        html += `<div class="h-scroll-item" onclick="Player.loadTrack(Data.getTrack('${track.id}'))">${this.renderAlbumCard(track, 'small')}</div>`;
      });
      html += `</div>`;
    }

    const autoPlaylists = playlists.filter(p => p.type === 'auto');
    if (autoPlaylists.length > 0) {
      html += `<div class="section-header"><h2>Smart Playlists</h2></div><div class="h-scroll">`;
      for (const pl of autoPlaylists) {
        const plTracks = await this.getAutoPlaylistTracks(pl.id);
        html += `<div class="h-scroll-item" onclick="UI.navigate('playlist-detail', {playlistId: '${pl.id}'})">
          <div class="grid-art" style="background:linear-gradient(135deg, rgba(var(--accent-rgb),0.2), var(--bg-elevated));display:flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;font-weight:900;color:var(--accent);">${pl.name[0]}</span>
          </div>
          <span class="grid-title">${Utils.escapeHtml(pl.name)}</span>
          <span class="grid-subtitle">${plTracks.length} tracks</span>
        </div>`;
      }
      html += `</div>`;
    }

    if (favorites.length > 0) {
      html += `<div class="section-header"><h2>Favorites</h2><button class="section-action" onclick="UI.navigate('favorites')">View All</button></div>`;
      html += `<div class="grid-container grid-cols-2">`;
      favorites.slice(0, 6).forEach(track => {
        html += `<div class="grid-item" onclick="Player.loadTrack(Data.getTrack('${track.id}'))">${this.renderAlbumCard(track)}</div>`;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
  },

  renderSearch(container) {
    container.innerHTML = `
      <div class="search-hero">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="search-input" placeholder="Search songs, albums, artists..." oninput="UI.handleSearch(this.value)">
        </div>
        <div class="search-filters">
          <select id="search-type" onchange="UI.handleSearch(document.getElementById('search-input').value)">
            <option value="all">All</option>
            <option value="tracks">Tracks</option>
            <option value="albums">Albums</option>
            <option value="artists">Artists</option>
          </select>
        </div>
      </div>
      <div id="search-results"></div>
    `;
  },

  async handleSearch(query) {
    if (!query.trim()) {
      document.getElementById('search-results').innerHTML = '';
      return;
    }
    const type = document.getElementById('search-type').value;
    const results = await Data.search(query, type);
    const container = document.getElementById('search-results');

    if (results.length === 0) {
      container.innerHTML = '<div class="empty-state">No results found</div>';
      return;
    }

    let html = '<div class="track-list">';
    results.forEach((track, i) => {
      html += this.renderTrackRow(track, i + 1);
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderTracks(container, params = {}) {
    let tracks = await this.getFilteredTracks(params);
    tracks = this.getSortedTracks(tracks, params.sortBy, params.sortDir);

    const viewStyle = SettingsManager.get('ui.gridViewStyle') || 'list';
    const isGrid = viewStyle === 'grid';

    let html = '<div class="view-toolbar">';
    html += '<div class="view-toolbar-left">';
    if (this.isSelectionMode) {
      html += `<button class="icon-btn small" onclick="UI.clearSelection()" title="Clear"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
      html += `<span style="font-size:13px;color:var(--text-secondary);font-weight:600;">${this.selectedTracks.size} selected</span>`;
      html += `<button class="icon-btn small" onclick="UI.addSelectedToQueue()" title="Add to Queue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>`;
      html += `<button class="icon-btn small" onclick="UI.showPlaylistModal()" title="Add to Playlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></button>`;
    } else {
      html += `<select class="sort-select" onchange="UI.sortTracks(this.value)">`;
      html += `<option value="title">Title</option><option value="artist">Artist</option><option value="album">Album</option><option value="duration">Duration</option><option value="playCount">Plays</option><option value="dateAdded">Date Added</option>`;
      html += `</select>`;
      html += `<button class="icon-btn small" onclick="UI.toggleSortDir()" title="Toggle sort direction"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 15l5 5 5-5"/><path d="M7 9l5-5 5 5"/></svg></button>`;
    }
    html += '</div>';
    html += '<div class="view-toolbar-right">';
    html += `<button class="view-toggle-btn ${!isGrid ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'list'); UI.renderCurrentPage()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>`;
    html += `<button class="view-toggle-btn ${isGrid ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'grid'); UI.renderCurrentPage()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>`;
    html += '</div></div>';

    if (tracks.length === 0) {
      html += this.renderEmptyState('No tracks found');
      container.innerHTML = html;
      return;
    }

    if (isGrid) {
      const cols = SettingsManager.get('ui.gridColumns');
      let colClass = 'grid-cols-2';
      if (cols === '3') colClass = 'grid-cols-3';
      else if (cols === '4') colClass = 'grid-cols-4';
      else if (cols === '5') colClass = 'grid-cols-5';
      html += `<div class="grid-container ${colClass}">`;
      tracks.forEach(track => {
        html += `<div class="grid-item" onclick="Player.loadTrack(Data.getTrack('${track.id}'))">${this.renderAlbumCard(track)}</div>`;
      });
      html += '</div>';
    } else {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }

    container.innerHTML = html;
  },

  async renderAlbums(container) {
    const albums = await Data.getAll('albums');
    const viewStyle = SettingsManager.get('ui.gridViewStyle') || 'grid';
    const isCollage = viewStyle === 'collage';

    let html = '<div class="view-toolbar">';
    html += '<div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Albums</h2></div>';
    html += '<div class="view-toolbar-right">';
    html += `<button class="view-toggle-btn ${!isCollage ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'grid'); UI.renderCurrentPage()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>`;
    html += `<button class="view-toggle-btn ${isCollage ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'collage'); UI.renderCurrentPage()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg></button>`;
    html += '</div></div>';

    if (albums.size === 0) {
      html += this.renderEmptyState('No albums yet');
      container.innerHTML = html;
      return;
    }

    const albumList = [...albums].sort((a,b) => a.name.localeCompare(b.name));
    html += `<div class="grid-container ${isCollage ? 'collage' : 'grid-cols-2'}">`;
    albumList.forEach(album => {
      html += `<div class="grid-item" onclick="UI.navigate('album-detail', {albumId: '${album.id}'})">${this.renderAlbumCard(album)}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderArtists(container) {
    const artists = await Data.getAll('artists');
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Artists</h2></div></div>';

    if (artists.size === 0) {
      html += this.renderEmptyState('No artists yet');
      container.innerHTML = html;
      return;
    }

    const artistList = [...artists].sort((a,b) => a.name.localeCompare(b.name));
    html += '<div class="grid-container grid-cols-2">';
    artistList.forEach(artist => {
      html += `<div class="grid-item" onclick="UI.navigate('tracks', {artist: '${Utils.escapeHtml(artist.name)}'})">${this.renderArtistCard(artist)}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderGenres(container) {
    const genres = await Data.getAll('genres');
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Genres</h2></div></div>';

    if (genres.size === 0) {
      html += this.renderEmptyState('No genres yet');
      container.innerHTML = html;
      return;
    }

    const genreList = [...genres].sort((a,b) => a.name.localeCompare(b.name));
    html += '<div class="grid-container grid-cols-2">';
    genreList.forEach(genre => {
      html += `<div class="grid-item" onclick="UI.navigate('tracks', {genre: '${Utils.escapeHtml(genre.name)}'})">${this.renderGenreCard(genre)}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderPlaylists(container) {
    const playlists = await Data.getPlaylists();
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Playlists</h2></div><button class="btn-gold" onclick="UI.createPlaylist()">New Playlist</button></div>';

    if (playlists.length === 0) {
      html += this.renderEmptyState('No playlists yet');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    for (const pl of playlists) {
      html += this.renderPlaylistCard(pl);
    }
    html += '</div>';
    container.innerHTML = html;
  },

  async renderPlaylistDetail(container, params) {
    const pl = await Data.getPlaylist(params.playlistId);
    if (!pl) { this.navigate('playlists'); return; }

    const tracks = await this.getTracksByPlaylist(pl);
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art">${this.getPlaylistArtwork(pl, tracks)}</div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Playlist</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(pl.name)}</div>`;
    html += `<div class="album-detail-meta">${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="Player.setQueue([${tracks.map(t => `Data.getTrack('${t.id}')`).join(',')}], 0); Player.play()">Play</button>`;
    html += `<button class="btn-outline" onclick="UI.shufflePlaylist('${pl.id}')">Shuffle</button>`;
    if (pl.type === 'user') {
      html += `<button class="btn-outline" onclick="UI.exportPlaylistM3U('${pl.id}')">Export</button>`;
      html += `<button class="btn-outline danger" onclick="UI.deletePlaylist('${pl.id}')">Delete</button>`;
    }
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    } else {
      html += this.renderEmptyState('Empty playlist');
    }

    container.innerHTML = html;
  },

  async renderQueue(container) {
    const queue = Player.queue;
    const currentIdx = Player.queueIndex;

    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Queue</h2></div><button class="btn-outline" onclick="Player.setQueue([],0)">Clear</button></div>';

    if (queue.length === 0) {
      html += this.renderEmptyState('Queue is empty');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    queue.forEach((track, i) => {
      const isCurrent = i === currentIdx;
      html += `
        <div class="track-row ${isCurrent ? 'playing' : ''}" draggable="true" ondragstart="UI.dragQueueStart(event, ${i})" ondragover="UI.dragQueueOver(event)" ondrop="UI.dragQueueDrop(event, ${i})">
          <div class="queue-num">${isCurrent ? '<div class=\"playing-bars\"><span></span><span></span><span></span></div>' : (i + 1)}</div>
          <img class="track-art" src="${this.getArtworkUrl(track)}" alt="">
          <div class="track-info">
            <span class="track-title">${Utils.escapeHtml(track.title)}</span>
            <span class="track-meta">${Utils.escapeHtml(track.artist)}</span>
          </div>
          <span class="track-duration">${Utils.formatDuration(track.duration)}</span>
          <div class="track-actions">
            <button class="icon-btn small" onclick="Player.removeFromQueue(${i}); event.stopPropagation();">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  dragQueueStart(e, index) { e.dataTransfer.setData('text/plain', index); },
  dragQueueOver(e) { e.preventDefault(); },
  dragQueueDrop(e, toIndex) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (fromIndex !== toIndex) Player.moveQueueItem(fromIndex, toIndex);
  },

  async renderLyrics(container) {
    const track = Player.currentTrack;
    if (!track) {
      container.innerHTML = this.renderEmptyState('No track playing');
      return;
    }

    let lyrics = null;
    let source = 'none';

    if (track.lyrics) {
      lyrics = track.lyrics;
      source = 'embedded';
    } else if (track.lyricsLrc) {
      lyrics = Utils.lrcParse(track.lyricsLrc);
      source = 'lrc';
    } else if (track.lyricsTtml) {
      lyrics = Utils.ttmlParse(track.lyricsTtml);
      source = 'ttml';
    }

    let html = `<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Lyrics</h2></div></div>`;
    html += `<div style="text-align:center;margin-bottom:20px;"><p style="color:var(--text-secondary);font-size:14px;font-weight:600;">${Utils.escapeHtml(track.title)} - ${Utils.escapeHtml(track.artist)}</p></div>`;

    if (!lyrics || lyrics.length === 0) {
      html += `<div class="lyrics-container"><p style="color:var(--text-tertiary);font-size:16px;">No lyrics available</p></div>`;
      html += `<button class="btn-outline btn-full" onclick="UI.renderLyricsEditor(document.getElementById('page-container'))">Add Lyrics</button>`;
      container.innerHTML = html;
      return;
    }

    html += `<div class="lyrics-container" id="lyrics-container">`;
    lyrics.forEach((line, i) => {
      html += `<div class="lyric-line" id="lyric-${i}" data-time="${line.time}">${Utils.escapeHtml(line.text)}</div>`;
    });
    html += `</div>`;
    html += `<button class="btn-outline btn-full" style="margin-top:20px;" onclick="UI.renderLyricsEditor(document.getElementById('page-container'))">Edit Lyrics</button>`;
    container.innerHTML = html;

    this.lyricsInterval = setInterval(() => this.highlightLyric(lyrics), 200);
  },

  highlightLyric(lyrics) {
    const current = Player.getCurrentTime();
    let activeIdx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= current) activeIdx = i;
    }
    if (activeIdx === this.lastLyricIndex) return;
    this.lastLyricIndex = activeIdx;

    const lines = document.querySelectorAll('.lyric-line');
    lines.forEach((line, i) => {
      line.classList.toggle('active', i === activeIdx);
    });
    if (activeIdx >= 0 && SettingsManager.get('lyrics.highlightCurrentLine')) {
      const activeLine = document.getElementById('lyric-' + activeIdx);
      if (activeLine) activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  renderLyricsEditor(container) {
    const track = Player.currentTrack;
    if (!track) return;
    let html = `<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Edit Lyrics</h2></div></div>`;
    html += `<textarea id="lyrics-editor" style="width:100%;min-height:300px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;color:var(--text-primary);font-family:inherit;font-size:14px;resize:vertical;outline:none;line-height:1.6;" placeholder="Paste lyrics here...">${Utils.escapeHtml(track.lyrics || '')}</textarea>`;
    html += `<div style="display:flex;gap:10px;margin-top:16px;"><button class="btn-gold" onclick="UI.saveLyrics()">Save</button><button class="btn-outline" onclick="UI.navigate('lyrics')">Cancel</button></div>`;
    container.innerHTML = html;
  },

  async saveLyrics() {
    const track = Player.currentTrack;
    if (!track) return;
    const lyrics = document.getElementById('lyrics-editor').value;
    track.lyrics = lyrics;
    await Data.saveTrack(track);
    this.navigate('lyrics');
  },

  async renderFolders(container) {
    const tracks = await Data.getTracks();
    const folders = {};
    tracks.forEach(t => {
      const folder = t.folder || 'Unknown';
      if (!folders[folder]) folders[folder] = [];
      folders[folder].push(t);
    });

    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Folders</h2></div></div>';

    if (Object.keys(folders).length === 0) {
      html += this.renderEmptyState('No folders');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    Object.entries(folders).sort((a,b) => a[0].localeCompare(b[0])).forEach(([folder, folderTracks]) => {
      html += `<div class="folder-card" onclick="UI.navigate('tracks', {folder: '${Utils.escapeHtml(folder)}'})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <span class="folder-path">${Utils.escapeHtml(folder)}</span>
        <span style="color:var(--text-tertiary);font-size:13px;font-weight:600;">${folderTracks.length} tracks</span>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderFavorites(container) {
    const tracks = await Data.getTracks();
    const favorites = tracks.filter(t => t.favorite);
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Favorites</h2></div></div>';

    if (favorites.length === 0) {
      html += this.renderEmptyState('No favorites yet');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    favorites.forEach((track, i) => {
      html += this.renderTrackRow(track, i + 1);
    });
    html += '</div>';
    container.innerHTML = html;
  },

  renderSettings(container) {
    const settings = CONFIG;
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Settings</h2></div></div>';
    html += '<div class="settings-list">';

    html += `<div class="settings-group"><h3>Audio</h3>`;
    html += `<div class="setting-row"><span>Equalizer</span><label class="toggle-switch"><input type="checkbox" ${settings.audio.equalizerEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.equalizerEnabled', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Crossfade (seconds)</span><input type="number" value="${settings.audio.crossfadeDuration}" min="0" max="10" onchange="SettingsManager.set('audio.crossfadeDuration', parseInt(this.value))"></div>`;
    html += `<div class="setting-row"><span>Skip Silence</span><label class="toggle-switch"><input type="checkbox" ${settings.audio.skipSilence ? 'checked' : ''} onchange="SettingsManager.set('audio.skipSilence', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Gapless Playback</span><label class="toggle-switch"><input type="checkbox" ${settings.audio.gaplessPlayback ? 'checked' : ''} onchange="SettingsManager.set('audio.gaplessPlayback', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `</div>`;

    html += `<div class="settings-group"><h3>Playback</h3>`;
    html += `<div class="setting-row"><span>Persistent Queue</span><label class="toggle-switch"><input type="checkbox" ${settings.playback.persistentQueue ? 'checked' : ''} onchange="SettingsManager.set('playback.persistentQueue', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Smart Pause on Call</span><label class="toggle-switch"><input type="checkbox" ${settings.playback.smartPause.onCall ? 'checked' : ''} onchange="SettingsManager.set('playback.smartPause.onCall', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Smart Pause on Headphone Disconnect</span><label class="toggle-switch"><input type="checkbox" ${settings.playback.smartPause.onHeadphoneDisconnect ? 'checked' : ''} onchange="SettingsManager.set('playback.smartPause.onHeadphoneDisconnect', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `</div>`;

    html += `<div class="settings-group"><h3>UI</h3>`;
    html += `<div class="setting-row"><span>Dynamic Theming</span><label class="toggle-switch"><input type="checkbox" ${settings.ui.dynamicTheming ? 'checked' : ''} onchange="SettingsManager.set('ui.dynamicTheming', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Particles</span><label class="toggle-switch"><input type="checkbox" ${settings.ui.particlesEnabled ? 'checked' : ''} onchange="SettingsManager.set('ui.particlesEnabled', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Waveform Seekbar</span><label class="toggle-switch"><input type="checkbox" ${settings.ui.waveformSeekbar ? 'checked' : ''} onchange="SettingsManager.set('ui.waveformSeekbar', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Grid Columns</span><select onchange="SettingsManager.set('ui.gridColumns', this.value)"><option value="auto" ${settings.ui.gridColumns === 'auto' ? 'selected' : ''}>Auto</option><option value="2" ${settings.ui.gridColumns === '2' ? 'selected' : ''}>2</option><option value="3" ${settings.ui.gridColumns === '3' ? 'selected' : ''}>3</option><option value="4" ${settings.ui.gridColumns === '4' ? 'selected' : ''}>4</option></select></div>`;
    html += `</div>`;

    html += `<div class="settings-group"><h3>Library</h3>`;
    html += `<div class="setting-row"><span>Auto Index on Launch</span><label class="toggle-switch"><input type="checkbox" ${settings.library.autoIndexOnLaunch ? 'checked' : ''} onchange="SettingsManager.set('library.autoIndexOnLaunch', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="setting-row"><span>Extract Featured Artists</span><label class="toggle-switch"><input type="checkbox" ${settings.library.extractFeaturedArtists ? 'checked' : ''} onchange="SettingsManager.set('library.extractFeaturedArtists', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `</div>`;

    html += `<div class="settings-group"><h3>Data</h3>`;
    html += `<button class="btn-gold btn-full" onclick="SettingsManager.save()">Save Settings</button>`;
    html += `<button class="btn-outline btn-full" style="margin-top:8px;" onclick="SettingsManager.reset()">Reset All Settings</button>`;
    html += `<button class="btn-outline danger btn-full" style="margin-top:8px;" onclick="Data.clearLibrary()">Clear Library</button>`;
    html += `</div>`;

    html += `<div class="settings-group"><h3>About</h3>`;
    html += `<p style="color:var(--text-secondary);font-size:14px;line-height:1.6;">Okvy MusiQ v${CONFIG.version}<br>Built with love for music.</p>`;
    html += `</div>`;

    html += '</div>';
    container.innerHTML = html;
  },

  async renderAlbumDetail(container, params) {
    const albums = await Data.getAll('albums');
    const album = [...albums].find(a => a.id === params.albumId);
    if (!album) { this.navigate('albums'); return; }

    const tracks = await this.getTracksByAlbum(album);
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art">${this.getAlbumArtwork(album, tracks)}</div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Album</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(album.name)}</div>`;
    html += `<div class="album-detail-meta">${Utils.escapeHtml(album.artist || 'Unknown Artist')} &bull; ${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="Player.setQueue([${tracks.map(t => `Data.getTrack('${t.id}')`).join(',')}], 0); Player.play()">Play</button>`;
    html += `<button class="btn-outline" onclick="UI.shuffleAlbum('${album.id}')">Shuffle</button>`;
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  async renderArtistDetail(container, params) {
    const artistName = params.artist;
    const tracks = await this.getTracksByArtist({ name: artistName });
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art circle">${this.getArtistArtwork({ name: artistName }, tracks)}</div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Artist</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(artistName)}</div>`;
    html += `<div class="album-detail-meta">${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="Player.setQueue([${tracks.map(t => `Data.getTrack('${t.id}')`).join(',')}], 0); Player.play()">Play</button>`;
    html += `<button class="btn-outline" onclick="UI.shuffleArtist('${Utils.escapeHtml(artistName)}')">Shuffle</button>`;
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  async renderGenreDetail(container, params) {
    const genreName = params.genre;
    const tracks = await this.getTracksByGenre({ name: genreName });
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art" style="background:linear-gradient(135deg, rgba(var(--accent-rgb),0.3), var(--bg-elevated));display:flex;align-items:center;justify-content:center;"><span class="genre-icon">${genreName[0]}</span></div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Genre</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(genreName)}</div>`;
    html += `<div class="album-detail-meta">${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="Player.setQueue([${tracks.map(t => `Data.getTrack('${t.id}')`).join(',')}], 0); Player.play()">Play</button>`;
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  renderTrackRow(track, index) {
    const isPlaying = Player.currentTrack && Player.currentTrack.id === track.id;
    const isSelected = this.selectedTracks.has(track.id);
    return `
      <div class="track-row ${isPlaying ? 'playing' : ''} ${isSelected ? 'selected' : ''}" onclick="${this.isSelectionMode ? `UI.toggleTrackSelection('${track.id}')` : `Player.loadTrack(Data.getTrack('${track.id}'))`}" oncontextmenu="UI.showTrackMenu('${track.id}', event)">
        ${this.isSelectionMode ? `<div class="track-check ${isSelected ? 'checked' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : `<div class="track-num">${isPlaying ? '<div class="playing-bars"><span></span><span></span><span></span></div>' : index}</div>`}
        <img class="track-art" src="${this.getArtworkUrl(track)}" alt="">
        <div class="track-info">
          <span class="track-title">${Utils.escapeHtml(track.title)}</span>
          <span class="track-meta">${Utils.escapeHtml(track.artist)}${track.album ? ' &bull; ' + Utils.escapeHtml(track.album) : ''}</span>
        </div>
        <span class="track-duration">${Utils.formatDuration(track.duration)}</span>
        <div class="track-actions">
          <button class="icon-btn small" onclick="event.stopPropagation(); UI.toggleTrackFavorite('${track.id}')">
            <svg viewBox="0 0 24 24" fill="${track.favorite ? '#ff4444' : 'none'}" stroke="${track.favorite ? '#ff4444' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="icon-btn small" onclick="event.stopPropagation(); UI.showTrackMenu('${track.id}', event)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
    `;
  },

  renderAlbumCard(item, size = 'normal') {
    const art = item.artwork || (item.tracks && item.tracks[0] ? this.getArtworkUrl(item.tracks[0]) : 'assets/default-art.png');
    const title = item.title || item.name || 'Unknown';
    const subtitle = item.artist || item.subtitle || (item.tracks ? `${item.tracks.length} tracks` : '');
    return `
      <div class="grid-art">
        <img src="${art}" alt="" loading="lazy">
        <div class="grid-overlay">
          <button class="play-overlay" onclick="event.stopPropagation(); ${item.id ? `Player.loadTrack(Data.getTrack('${item.id}'))` : ''}">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="9 6 19 12 9 18 9 6"/></svg>
          </button>
        </div>
      </div>
      <span class="grid-title">${Utils.escapeHtml(title)}</span>
      <span class="grid-subtitle">${Utils.escapeHtml(subtitle)}</span>
    `;
  },

  renderArtistCard(artist) {
    return `
      <div class="grid-art circle">
        <img src="${this.getArtistArtwork(artist)}" alt="" loading="lazy">
        <div class="grid-overlay">
          <button class="play-overlay" onclick="event.stopPropagation(); UI.navigate('tracks', {artist: '${Utils.escapeHtml(artist.name)}'})">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="9 6 19 12 9 18 9 6"/></svg>
          </button>
        </div>
      </div>
      <span class="grid-title">${Utils.escapeHtml(artist.name)}</span>
      <span class="grid-subtitle">${artist.trackCount || 0} tracks</span>
    `;
  },

  renderGenreCard(genre) {
    return `
      <div class="grid-art gradient">
        <span class="genre-icon">${genre.name[0]}</span>
      </div>
      <span class="grid-title">${Utils.escapeHtml(genre.name)}</span>
      <span class="grid-subtitle">${genre.trackCount || 0} tracks</span>
    `;
  },

  renderPlaylistCard(pl) {
    return `
      <div class="playlist-card" onclick="UI.navigate('playlist-detail', {playlistId: '${pl.id}'})">
        <div class="playlist-art">${this.getPlaylistArtwork(pl)}</div>
        <div class="playlist-info">
          <span class="playlist-name">${Utils.escapeHtml(pl.name)}</span>
          <span class="playlist-count">${pl.tracks.length} tracks &bull; ${pl.type === 'auto' ? 'Smart' : 'User'}</span>
        </div>
      </div>
    `;
  },

  renderEmptyState(message) {
    return `<div class="empty-state"><p>${message}</p></div>`;
  },

  updateMiniPlayer() {
    // Handled by onTrackChanged
  },

  updateFullPlayer() {
    // Handled by onTrackChanged and onTimeUpdate
  },

  openFullPlayer() {
    document.getElementById('full-player').classList.add('open');
    if (SettingsManager.get('ui.waveformSeekbar')) {
      setTimeout(() => this.renderWaveform(), 100);
    }
  },

  closeFullPlayer() {
    document.getElementById('full-player').classList.remove('open');
    if (this.lyricsInterval) {
      clearInterval(this.lyricsInterval);
      this.lyricsInterval = null;
    }
  },

  toggleFavorite() {
    const track = Player.currentTrack;
    if (!track) return;
    track.favorite = !track.favorite;
    Data.saveTrack(track);
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
  },

  async toggleTrackFavorite(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    track.favorite = !track.favorite;
    await Data.saveTrack(track);
    this.renderCurrentPage();
  },

  toggleRepeat() {
    const modes = ['none', 'all', 'one', 'n'];
    const current = SettingsManager.get('playback.repeatMode');
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    SettingsManager.set('playback.repeatMode', next);
    this.updatePlayerControls();
  },

  toggleShuffle() {
    const current = SettingsManager.get('playback.shuffleMode');
    SettingsManager.set('playback.shuffleMode', !current);
    this.updatePlayerControls();
  },

  showPlaylistModal() {
    const modal = document.getElementById('playlist-modal');
    const list = document.getElementById('playlist-modal-list');
    Data.getPlaylists().then(playlists => {
      const userPls = playlists.filter(p => p.type === 'user');
      list.innerHTML = userPls.map(p => `
        <div class="modal-item" onclick="UI.addToPlaylist('${p.id}')">${Utils.escapeHtml(p.name)}</div>
      `).join('');
      modal.classList.add('open');
    });
  },

  hidePlaylistModal() {
    document.getElementById('playlist-modal').classList.remove('open');
  },

  async addToPlaylist(playlistId, trackId) {
    const pl = await Data.getPlaylist(playlistId);
    if (!pl) return;
    const targetId = trackId || (this.trackMenuTargetId);
    if (targetId && !pl.tracks.includes(targetId)) {
      pl.tracks.push(targetId);
      await Data.updatePlaylist(pl);
    } else if (!targetId && this.isSelectionMode) {
      this.selectedTracks.forEach(id => {
        if (!pl.tracks.includes(id)) pl.tracks.push(id);
      });
      await Data.updatePlaylist(pl);
      this.clearSelection();
    }
    this.hidePlaylistModal();
    this.hideTrackMenu();
  },

  async createPlaylist() {
    const name = prompt('Playlist name:');
    if (!name) return;
    const pl = {
      id: Utils.generateId(),
      name: name.trim(),
      type: 'user',
      tracks: [],
      created: Date.now()
    };
    await Data.savePlaylist(pl);
    this.renderSidebarPlaylists();
    this.renderCurrentPage();
    this.hidePlaylistModal();
  },

  async deletePlaylist(id) {
    if (!confirm('Delete this playlist?')) return;
    await Data.deletePlaylist(id);
    this.renderSidebarPlaylists();
    this.navigate('playlists');
  },

  async saveQueueAsPlaylist() {
    const name = prompt('Playlist name:');
    if (!name) return;
    const pl = {
      id: Utils.generateId(),
      name: name.trim(),
      type: 'user',
      tracks: Player.queue.map(t => t.id),
      created: Date.now()
    };
    await Data.savePlaylist(pl);
    this.renderSidebarPlaylists();
  },

  async exportPlaylistM3U(playlistId) {
    const pl = await Data.getPlaylist(playlistId);
    if (!pl) return;
    const tracks = await this.getTracksByPlaylist(pl);
    const m3u = Utils.generateM3U(tracks, pl.name);
    Utils.downloadFile(m3u, pl.name + '.m3u');
  },

  async importM3U() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.m3u,.m3u8';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const tracks = Utils.parseM3U(text, '');
      const pl = {
        id: Utils.generateId(),
        name: file.name.replace(/\.m3u8?$/i, ''),
        type: 'user',
        tracks: tracks.map(t => t.path),
        created: Date.now()
      };
      await Data.savePlaylist(pl);
      this.renderSidebarPlaylists();
      this.renderCurrentPage();
    };
    input.click();
  },

  async scanMusic() {
    if (!window.showDirectoryPicker) {
      console.warn('File System Access API not supported');
      return;
    }
    try {
      const dirHandle = await window.showDirectoryPicker();
      await Scanner.scanDirectory(dirHandle);
    } catch(e) {
      console.warn('Scan cancelled or failed:', e.message);
    }
  },

  startSleepTimer() {
    const mode = SettingsManager.get('playback.sleepTimer.mode');
    const value = SettingsManager.get('playback.sleepTimer.value');
    Player.setSleepTimer(mode, value);
  },

  stopSleepTimer() {
    Player.stopSleepTimer();
  },

  showToast(message) {
    console.log('[Okvy]', message);
  },

  showTrackMenu(id, event) {
    if (event) event.stopPropagation();
    this.trackMenuTargetId = id;
    const menuItems = [
      { label: 'Play Next', action: () => this.playTrackNext(id) },
      { label: 'Add to Queue', action: () => this.addTrackToQueue(id) },
      { label: 'Add to Playlist', action: () => this.showPlaylistModalForTrack(id) },
      { label: 'Go to Album', action: () => this.goToAlbum(id) },
      { label: 'Go to Artist', action: () => this.goToArtist(id) },
      { label: 'Share', action: () => this.shareTrackById(id) },
    ];
    const container = document.getElementById('track-menu-list');
    container.innerHTML = menuItems.map((item, i) =>
      `<div class="modal-item" onclick="UI.trackMenuAction(${i})">${Utils.escapeHtml(item.label)}</div>`
    ).join('');
    this.trackMenuActions = menuItems;
    document.getElementById('track-menu-modal').classList.add('open');
  },

  trackMenuAction(index) {
    if (this.trackMenuActions && this.trackMenuActions[index]) {
      this.trackMenuActions[index].action();
    }
    this.hideTrackMenu();
  },

  hideTrackMenu() {
    document.getElementById('track-menu-modal').classList.remove('open');
    this.trackMenuActions = null;
    this.trackMenuTargetId = null;
  },

  async playTrackNext(id) {
    const track = await Data.getTrack(id);
    if (track) Player.addToQueue([track], 'next');
  },

  async addTrackToQueue(id) {
    const track = await Data.getTrack(id);
    if (track) Player.addToQueue([track], 'end');
  },

  async showPlaylistModalForTrack(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const playlists = await Data.getPlaylists();
    const userPls = playlists.filter(p => p.type === 'user');
    document.getElementById('playlist-modal-list').innerHTML = userPls.map(p => `
      <div class="modal-item" onclick="UI.addToPlaylist('${p.id}', '${track.id}'); UI.hidePlaylistModal(); UI.hideTrackMenu()">${Utils.escapeHtml(p.name)}</div>
    `).join('');
    document.getElementById('playlist-modal').classList.add('open');
  },

  async goToAlbum(id) {
    const track = await Data.getTrack(id);
    if (!track || !track.album) return;
    const albums = await Data.getAll('albums');
    const album = [...albums].find(a => a.name === track.album);
    if (album) this.navigate('album-detail', { albumId: album.id });
  },

  async goToArtist(id) {
    const track = await Data.getTrack(id);
    if (track && track.artist) {
      this.navigate('tracks', { artist: track.artist });
    }
  },

  async shareTrackById(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    if (navigator.share) {
      navigator.share({ title: track.title, text: `${track.artist} - ${track.title}` });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${track.artist} - ${track.title}`);
    }
  },

  async addSelectedToQueue() {
    const tracks = await Data.getTracks();
    const selected = tracks.filter(t => this.selectedTracks.has(t.id));
    if (selected.length > 0) {
      Player.addToQueue(selected, 'end');
    }
    this.clearSelection();
  },

  toggleSortDir() {
    const select = document.querySelector('.sort-select');
    const field = select ? select.value : 'title';
    const newDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
    this.currentSortDir = newDir;
    this.navigate('tracks', { sortBy: field, sortDir: newDir });
  },

  async renderWaveform() {
    const canvas = document.getElementById('waveform-canvas');
    const container = document.getElementById('waveform-container');
    if (!canvas || !Player.audio || !Player.audioCtx) return;

    container.style.display = 'block';
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const bars = SettingsManager.get('ui.waveformBars') || 80;
    const barWidth = rect.width / bars;
    const gap = 2;

    const draw = () => {
      requestAnimationFrame(draw);
      if (!Player.isPlaying) return;

      const data = new Uint8Array(Player.analyser.frequencyBinCount);
      Player.analyser.getByteFrequencyData(data);

      ctx.clearRect(0, 0, rect.width, rect.height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4af37';

      for (let i = 0; i < bars; i++) {
        const idx = Math.floor((i / bars) * data.length);
        const value = data[idx] / 255;
        const height = value * rect.height * 0.9;
        const x = i * barWidth + gap / 2;
        const y = (rect.height - height) / 2;

        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.3 + value * 0.7;
        ctx.fillRect(x, y, barWidth - gap, height);
      }
      ctx.globalAlpha = 1;
    };
    draw();
  },

  async renderSidebarPlaylists() {
    const playlists = await Data.getPlaylists();
    const container = document.getElementById('user-playlists');
    const userPls = playlists.filter(p => p.type === 'user');
    container.innerHTML = userPls.map(p => `
      <a href="#playlist-${p.id}" class="playlist-link" onclick="event.preventDefault(); UI.navigate('playlist-detail', {playlistId: '${p.id}'})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        <span>${Utils.escapeHtml(p.name)}</span>
      </a>
    `).join('');
  },

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('active');
  },

  shareTrack() {
    const track = Player.currentTrack;
    if (!track) return;
    if (navigator.share) {
      navigator.share({ title: track.title, text: `${track.artist} - ${track.title}` });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${track.artist} - ${track.title}`);
    }
  },

  clearSelection() {
    this.isSelectionMode = false;
    this.selectedTracks.clear();
    this.renderCurrentPage();
  },

  sortTracks(field) {
    this.currentSortDir = 'asc';
    this.navigate('tracks', { sortBy: field, sortDir: 'asc' });
  },

  filterTracks(tracks, params) {
    if (params.artist) return tracks.filter(t => t.artist === params.artist);
    if (params.album) return tracks.filter(t => t.album === params.album);
    if (params.genre) return tracks.filter(t => t.genre === params.genre);
    if (params.folder) return tracks.filter(t => t.folder === params.folder);
    if (params.favorite) return tracks.filter(t => t.favorite);
    return tracks;
  },

  async getFilteredTracks(params) {
    const tracks = await Data.getTracks();
    return this.filterTracks(tracks, params);
  },

  getSortedTracks(tracks, sortBy, sortDir) {
    const dir = sortDir === 'desc' ? -1 : 1;
    switch(sortBy) {
      case 'title': return [...tracks].sort((a,b) => dir * (a.title || '').localeCompare(b.title || ''));
      case 'artist': return [...tracks].sort((a,b) => dir * (a.artist || '').localeCompare(b.artist || ''));
      case 'album': return [...tracks].sort((a,b) => dir * (a.album || '').localeCompare(b.album || ''));
      case 'duration': return [...tracks].sort((a,b) => dir * ((a.duration || 0) - (b.duration || 0)));
      case 'playCount': return [...tracks].sort((a,b) => dir * ((a.playCount || 0) - (b.playCount || 0)));
      case 'dateAdded': return [...tracks].sort((a,b) => dir * ((a.dateAdded || 0) - (b.dateAdded || 0)));
      default: return tracks;
    }
  },

  async getTracksByAlbum(album) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.album === album.name).sort((a,b) => (a.trackNumber || 0) - (b.trackNumber || 0));
  },

  async getTracksByArtist(artist) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.artist === artist.name);
  },

  async getTracksByGenre(genre) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.genre === genre.name);
  },

  async getTracksByFolder(folder) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.folder === folder);
  },

  async getTracksByPlaylist(playlist) {
    const allTracks = await Data.getTracks();
    return playlist.tracks.map(id => allTracks.find(t => t.id === id)).filter(Boolean);
  },

  async getAutoPlaylistTracks(playlistId) {
    const tracks = await Data.getTracks();
    switch(playlistId) {
      case 'most-played': return [...tracks].sort((a,b) => (b.playCount || 0) - (a.playCount || 0)).slice(0, 50);
      case 'recently-played': return [...tracks].filter(t => t.lastPlayed).sort((a,b) => b.lastPlayed - a.lastPlayed).slice(0, 50);
      case 'never-played': return tracks.filter(t => !t.playCount);
      case 'favorites': return tracks.filter(t => t.favorite);
      case 'lost-memories': {
        const years = SettingsManager.get('smart.lostMemoriesYearsBack') || [1,2,3];
        const now = Date.now();
        return tracks.filter(t => {
          if (!t.lastPlayed) return false;
          const yearsAgo = (now - t.lastPlayed) / (365 * 24 * 60 * 60 * 1000);
          return yearsAgo >= Math.min(...years) && yearsAgo <= Math.max(...years);
        }).slice(0, 50);
      }
      default: return [];
    }
  },

  getAutoPlaylistName(id) {
    const names = {
      'most-played': 'Most Played',
      'recently-played': 'Recently Played',
      'never-played': 'Never Played',
      'favorites': 'Favorites',
      'lost-memories': 'Lost Memories'
    };
    return names[id] || id;
  },

  getAutoPlaylistArtwork(id, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg></div>`;
  },

  getMood(energy) {
    if (energy > 0.8) return 'Energetic';
    if (energy > 0.6) return 'Upbeat';
    if (energy > 0.4) return 'Balanced';
    if (energy > 0.2) return 'Chill';
    return 'Calm';
  },

  getEra(year) {
    if (!year) return 'Unknown';
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '90s';
    if (year >= 1980) return '80s';
    if (year >= 1970) return '70s';
    return 'Classic';
  },

  getTrackMood(track) {
    const energy = track.energy || 0.5;
    return this.getMood(energy);
  },

  getTrackEra(track) {
    return this.getEra(track.year);
  },

  getAlbumArtwork(album, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
  },

  getArtistArtwork(artist, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
  },

  getGenreArtwork(genre) {
    return `<div class="playlist-empty"><span style="font-size:24px;font-weight:900;color:var(--accent);">${genre.name[0]}</span></div>`;
  },

  getFolderArtwork(folder, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div>`;
  },

  getPlaylistArtwork(playlist, tracks) {
    if (playlist.type === 'auto') {
      return this.getAutoPlaylistArtwork(playlist.id, tracks);
    }
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg></div>`;
  },

  shufflePlaylist(id) {
    Data.getPlaylist(id).then(pl => {
      if (!pl) return;
      this.getTracksByPlaylist(pl).then(tracks => {
        const shuffled = [...tracks].sort(() => Math.random() - 0.5);
        Player.setQueue(shuffled, 0);
        Player.play();
      });
    });
  },

  shuffleAlbum(id) {
    Data.getAll('albums').then(albums => {
      const album = [...albums].find(a => a.id === id);
      if (!album) return;
      this.getTracksByAlbum(album).then(tracks => {
        const shuffled = [...tracks].sort(() => Math.random() - 0.5);
        Player.setQueue(shuffled, 0);
        Player.play();
      });
    });
  },

  shuffleArtist(name) {
    this.getTracksByArtist({ name }).then(tracks => {
      const shuffled = [...tracks].sort(() => Math.random() - 0.5);
      Player.setQueue(shuffled, 0);
      Player.play();
    });
  },

  toggleTrackSelection(id) {
    if (this.selectedTracks.has(id)) {
      this.selectedTracks.delete(id);
      if (this.selectedTracks.size === 0) this.isSelectionMode = false;
    } else {
      this.selectedTracks.add(id);
    }
    this.renderCurrentPage();
  },
};
