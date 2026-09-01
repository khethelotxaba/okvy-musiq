
function appIcon(name, extraClass = '', id = '') {
  const files = {
    play: 'play.svg', pause: 'pause.svg', playMini: 'play-for-mini-player.svg', pauseMini: 'pause-for-mini-player.svg',
    playMiniPlayer: 'play-for-mini-player.svg', pauseMiniPlayer: 'pause-for-mini-player.svg',
    previous: 'previous-track.svg', next: 'next-track.svg', previousMini: 'previous-track-for-mini-player.svg', nextMini: 'next-track-for-mini-player.svg', previousFloating: 'previous-track-for-floating-player.svg', nextFloating: 'next-track-for-floating-player.svg',
    search: 'search.svg', options: 'options.svg', menu: 'side-nav-hamburger.svg', home: 'home.svg',
    tracks: 'tracks.svg', albums: 'albums.svg', artists: 'artists.svg', genres: 'genres.svg',
    playlists: 'playlists.svg', queue: 'queue.svg', folders: 'Folders.svg', favorites: 'favourite.svg', favourites: 'favourite.svg', favourite: 'favourite.svg',
    settings: 'setting.svg', shuffle: 'shuffle.svg', 'play-mini': 'play-for-mini-player.svg', 'next-mini': 'next-track-for-mini-player.svg', 'previous-mini': 'previous-track-for-mini-player.svg', 'next-floating': 'next-track-for-floating-player.svg', 'previous-floating': 'previous-track-for-floating-player.svg', repeatNone: 'repeate-all.svg', repeatAll: 'repeate-all.svg',
    repeatOne: 'repeate-one.svg', repeatN: 'repeat-track-x-times.svg', repeat: 'repeate-all.svg', none: 'repeate-all.svg',
    lightMode: 'light-mode.svg', darkMode: 'dark-mode.svg', theme: 'theme.svg',
    share: 'share.svg', addPlaylist: 'add-to-playlist.svg', 'add-playlist': 'add-to-playlist.svg', addPlayNext: 'add-to-play-next.svg', remove: 'delete.svg',
    select: 'select.svg', sort: 'sort.svg', sortPlaylist: 'sort-playlist.svg', grid: 'grid-style.svg', scanner: 'scanner.svg',
    warning: 'warning-info.svg', lyrics: 'lyrics.svg', equalizer: 'equalizer.svg', pitchSpeed: 'pitch-and-speed.svg',
    volumeBoost: 'volume boost.svg', sleepTimer: 'sleep-timer.svg', pauseSleep: 'pause-sleep-timer.svg',
    resumeSleep: 'resume-sleep-timer.svg', repeatSection: 'repeat-this-section.svg', playAfterSeconds: 'play-after-x-seconds.svg',
    playAfterTracks: 'play-track-after-x-tracks.svg', playAlbumAfterTrack: 'play-x-album-after-x-track.svg', comments: 'comments.svg',
    metadata: 'edit-metadata.svg', youtube: 'find on YouTube.svg', favoriteArtist: 'add-to-favourite-artists.svg', playOnly: 'play-only-these-tracks.svg',
    deleteArtist: 'delete-artist-and-related-tracks.svg', removeArtists: 'remove-artists-from-playlist.svg', filter: 'filter.svg', filterSearch: 'filter-search.svg',
    folderAdd: 'folder-add.svg', folderRemove: 'folder-remove.svg', folderIgnore: 'folder-ignore.svg', history: 'history.svg',
    mostPlayed: 'most played.svg', hoursListened: 'hours-listened.svg', nowPlaying: 'now-playing.svg', notifications: 'notifications.svg',
    soundMute: 'sound-mute-status.svg', soundProfile: 'sound-profile.svg', bluetooth: 'bluetooth-device-output-status.svg', aux: 'aux-output-status.svg',
    floatingPlayer: 'floating-mini-music-player.svg', minimizeFloating: 'minimize-floating-player.svg', minimizePlayerUI: 'minimize-music-player-ui.svg',
    minimizeToPlayerUI: 'minimize-to-music-player-ui.svg', expandPlayerTitle: 'expand-to-album-art-and-track-title-only.svg',
    alignLeft: 'title-and-artist-align-left.svg', alignCenter: 'title-and-artist-align-center.svg', alignRight: 'title-and-artist-align-right.svg',
    accent: 'choose-current-accent-colour.svg', palette: 'colorfilter-palette.svg'
  };
  const file = files[name];
  if (!file) return '';
  const src = `Icons/${encodeURI(file)}`;
  return `<img${id ? ` id="${id}"` : ''} class="app-icon ${extraClass}" data-icon="${name}" src="${src}" alt="" aria-hidden="true" decoding="async">`;
}

function hydrateStaticIcons(root = document) {
  root.querySelectorAll('[data-icon].app-icon').forEach(node => {
    if (node.tagName.toLowerCase() === 'img') return;
    const name = node.dataset.icon;
    const extra = [...node.classList].filter(c => c !== 'app-icon').join(' ');
    node.outerHTML = appIcon(name, extra, node.id);
  });
}

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
  particleAnimationId: null,
  particleResizeHandler: null,
  _waveformCache: new Map(),
  _waveformToken: 0,

  getArtworkUrl(track) {
    if (!track) return 'assets/default-art.png';
    if (track.artworkBlob) {
      return URL.createObjectURL(track.artworkBlob);
    }
    return track.artwork || 'assets/default-art.png';
  },

  async init() {
    // Keep UI boot resilient: a missing/changed DOM element in one binder
    // must not prevent the remaining parts of the app from initializing.
    const safeBind = (name, fn) => {
      try {
        fn.call(this);
      } catch (e) {
        console.error(`UI initialization failed in ${name}:`, e);
      }
    };

    safeBind('bindGlobalEvents', this.bindGlobalEvents);
    safeBind('bindPlayerControls', this.bindPlayerControls);
    safeBind('bindFullPlayer', this.bindFullPlayer);
    safeBind('bindSidebar', this.bindSidebar);
    safeBind('bindTabBar', this.bindTabBar);
    safeBind('bindPlaylistModal', this.bindPlaylistModal);
    safeBind('bindParticles', this.bindParticles);
    safeBind('bindKeyboard', this.bindKeyboard);
    safeBind('bindTouchGestures', this.bindTouchGestures);
    safeBind('hydrateStaticIcons', () => hydrateStaticIcons());

    try {
      this.applyThemeMode();
    } catch (e) {
      console.error('UI initialization failed in applyThemeMode:', e);
    }

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
    document.getElementById('close-player-options').addEventListener('click', () => this.hidePlayerOptions());
    document.querySelectorAll('[data-close-overlay]').forEach(el => el.addEventListener('click', () => this.closePlayerOverlay(el.dataset.closeOverlay)));
    document.getElementById('fp-options')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.showPlayerOptions(); });
    document.getElementById('fp-lyrics-btn')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.openLyricsOverlay(false); });
    document.getElementById('fp-audio-effects')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.openAudioEffectsOverlay(); });
    this.bindLyricsLongPress();
    document.getElementById('player-options-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('player-options-modal')) this.hidePlayerOptions();
    });

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
    const fpOptions = document.getElementById('fp-options');

    fpClose.addEventListener('click', () => this.closeFullPlayer());
    fpPlay.addEventListener('click', () => Player.togglePlay());
    fpPrev.addEventListener('click', () => Player.prev());
    fpNext.addEventListener('click', () => Player.next());
    fpShuffle.addEventListener('click', () => this.toggleShuffle());
    fpRepeat.addEventListener('click', () => this.toggleRepeat());
    fpFavorite.addEventListener('click', () => this.toggleFavorite());
    fpOptions.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.showPlayerOptions(); });

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
    this.startParticles();
  },

  startParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    if (this.particleAnimationId) return;
    if (!SettingsManager.get('ui.particlesEnabled')) {
      this.stopParticles();
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    if (!this.particleResizeHandler) {
      this.particleResizeHandler = resize;
      window.addEventListener('resize', resize);
    }

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
      if (!SettingsManager.get('ui.particlesEnabled')) {
        this.particleAnimationId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

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
      this.particleAnimationId = requestAnimationFrame(animate);
    };

    this.particleAnimationId = requestAnimationFrame(animate);
  },

  stopParticles() {
    if (this.particleAnimationId) {
      cancelAnimationFrame(this.particleAnimationId);
      this.particleAnimationId = null;
    }
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
    const npEl = document.getElementById('np-play-icon');
    const fpEl = document.getElementById('fp-play-icon');
    if (npEl) npEl.outerHTML = appIcon(isPlaying ? 'pauseMini' : 'playMini', 'app-icon', 'np-play-icon');
    if (fpEl) fpEl.outerHTML = appIcon(isPlaying ? 'pause' : 'play', 'app-icon', 'fp-play-icon');

    const shuffleButton = document.getElementById('fp-shuffle');
    const repeatButton = document.getElementById('fp-repeat');
    if (shuffleButton) shuffleButton.classList.toggle('active', SettingsManager.get('playback.shuffleMode'));
    this.updateRepeatControl();
  },

  updateRepeatControl() {
    const button = document.getElementById('fp-repeat');
    const icon = document.getElementById('fp-repeat-icon');
    const count = document.getElementById('fp-repeat-count');
    if (!button || !icon) return;

    const mode = SettingsManager.get('playback.repeatMode', 'none');
    const countValue = Math.max(1, Number(SettingsManager.get('playback.repeatNTimes', 1)) || 1);
    const iconMap = {
      none: 'none',
      all: 'repeatAll',
      one: 'repeatOne',
      n: 'repeatN'
    };
    const labels = {
      none: 'Repeat off',
      all: 'Repeat all',
      one: 'Repeat one',
      n: `Repeat track ${countValue} times`
    };

    icon.dataset.icon = mode;
    icon.outerHTML = appIcon(iconMap[mode] || iconMap.none, 'app-icon', 'fp-repeat-icon');
    button.classList.toggle('active', mode !== 'none');
    button.dataset.repeatMode = mode;
    button.setAttribute('aria-label', labels[mode] || labels.none);
    button.title = labels[mode] || labels.none;

    if (count) {
      count.textContent = mode === 'n' ? `×${countValue}` : '';
      count.hidden = mode !== 'n';
    }
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
    const fpSheet = document.querySelector('#full-player .fp-sheet');
    if (fpSheet && artwork) fpSheet.style.setProperty('--fp-art-url', `url(\"${String(artwork).replace(/\"/g, '%22')}\")`);
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
    document.getElementById('sidebar-title').textContent = track.title || 'Not Playing';
    document.getElementById('sidebar-artist').textContent = track.artist || '-';
    document.getElementById('sidebar-art').src = artwork;
    this.updatePlayerControls();
    this._prepareTrackWaveform(track);
    if (this.currentPage === 'tracks' || this.currentPage === 'favorites' || this.currentPage === 'queue') {
      this.renderCurrentPage();
    }
    this.applyWaveformMode();
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
    if (SettingsManager.get('ui.waveformSeekbar')) this.renderWaveform();
  },

  onAudioPeak(detail) {
    const peak = detail.smooth || 0;
    const npBar = document.getElementById('now-playing-bar');
    if (!npBar) return;

    if (!SettingsManager.get('ui.miniplayerGlow')) {
      npBar.style.boxShadow = '';
      return;
    }

    const intensity = peak * 15;
    const mode = SettingsManager.get('ui.miniplayerGlowMode');
    if (mode === 'dynamic') {
      npBar.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 ${intensity}px rgba(var(--accent-rgb), ${peak * 0.3})`;
    } else {
      npBar.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 ${intensity}px rgba(255,255,255, ${peak * 0.15})`;
    }
  },

  onThemeColors(detail) {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-primary', detail.dominant);
    root.style.setProperty('--dynamic-vibrant', detail.vibrant);
    const rgb = detail.dominant.match(/\d+/g);
    if (rgb) root.style.setProperty('--accent-rgb', rgb.join(', '));
    if (SettingsManager.get('ui.waveformSeekbar')) requestAnimationFrame(() => this.renderWaveform());
  },

  async onSettingChanged(detail) {
    const { path, value } = detail;

    try {
      switch (path) {
        case 'audio.equalizerEnabled':
          Player.updateEqualizerEnabled();
          break;
        case 'audio.eqCurrentPreset':
        case 'audio.eqCustomValues':
          Player.applyEQPreset();
          break;
        case 'audio.pitchSemitones':
        case 'audio.playbackSpeed':
        case 'audio.volumeBoost':
          Player.applyPlaybackEffects();
          if (this.currentPage === 'audio-effects') this.renderCurrentPage();
          break;
        case 'audio.skipSilence':
        case 'audio.skipSilenceThreshold':
          Player.updateSkipSilence();
          break;
        case 'audio.gaplessPlayback':
          Player.updateGaplessPlayback();
          break;
        case 'audio.crossfadeDuration':
          if (Number(value) === 0) Player.cancelCrossfade?.();
          break;
        case 'playback.persistentQueue':
          Player.updatePersistentQueue();
          break;
        case 'playback.smartPause.onCall':
        case 'playback.smartPause.onNotification':
        case 'playback.smartPause.onVolumeZero':
        case 'playback.smartPause.onAppSwitch':
        case 'playback.smartPause.onHeadphoneDisconnect':
          Player.updateSmartPause();
          break;
        case 'playback.shuffleMode':
        case 'playback.repeatMode':
        case 'playback.repeatNTimes':
          this.updatePlayerControls();
          break;
        case 'ui.themeMode':
          this.applyThemeMode();
          break;
        case 'ui.dynamicTheming':
          await this.applyDynamicTheme();
          break;
        case 'ui.particlesEnabled':
          if (value) this.startParticles();
          else this.stopParticles();
          break;
        case 'ui.particlesIntensity':
          // The animation reads this value every frame.
          break;
        case 'ui.miniplayerGlow':
        case 'ui.miniplayerGlowMode':
          if (!value && path === 'ui.miniplayerGlow') {
            const bar = document.getElementById('now-playing-bar');
            if (bar) bar.style.boxShadow = '';
          }
          break;
        case 'ui.gridColumns':
        case 'ui.gridViewStyle':
          this.renderCurrentPage();
          break;
        case 'ui.waveformSeekbar':
          this.applyWaveformMode();
          break;
        case 'ui.waveformBars':
          this._waveformCache.clear();
          this.applyWaveformMode();
          break;
        case 'ui.vibrationMode':
        case 'ui.glassmorphism':
        case 'ui.glassIntensity':
          this.applyThemeMode();
          break;
        case 'library.extractFeaturedArtists':
        case 'library.moodTagsEnabled':
        case 'library.artistSeparators':
        case 'library.genreSeparators':
        case 'library.minFileSizeMB':
        case 'library.minDurationSeconds':
        case 'library.excludeFolders':
        case 'library.deduplicateBy':
        case 'library.allowMultipleAlbums':
          this.showToast('Saved. The next library scan will use this setting.');
          break;
        case 'library.autoIndexOnLaunch':
          this.showToast(value ? 'Auto Index enabled for supported folder access.' : 'Auto Index disabled.');
          break;
        case 'smart.lostMemoriesEnabled':
        case 'smart.mostPlayedAutoUpdate':
        case 'smart.mostPlayedMaxTracks':
        case 'smart.mostPlayedMinPlays':
          await Data.refreshAutoPlaylists();
          this.renderSidebarPlaylists();
          this.renderCurrentPage();
          break;
        case 'history.minListenSeconds':
        case 'history.minListenPercent':
        case 'history.scrobbleEnabled':
        case 'lyrics.enabled':
        case 'lyrics.fontSize':
        case 'lyrics.alignCenter':
        case 'lyrics.highlightCurrentLine':
          if (document.getElementById('lyrics-overlay')?.classList.contains('open')) this.openLyricsOverlay(document.getElementById('lyrics-overlay')?.classList.contains('expanded'));
          this.renderCurrentPage();
          break;
      }
    } catch (error) {
      console.error(`Failed to apply setting ${path}:`, error);
    }
  },

  applyThemeMode() {
    const mode = SettingsManager.get('ui.themeMode', 'dark');
    const isLight = mode === 'light';
    document.body.classList.toggle('light', isLight);
    document.body.classList.toggle('glass-enabled', SettingsManager.get('ui.glassmorphism', true));
    document.body.style.setProperty('--glass-intensity', String(SettingsManager.get('ui.glassIntensity', 0.28)));
    document.body.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', isLight ? '#f5f5f5' : '#000000');

    const themeIcon = document.getElementById('theme-setting-icon');
    if (themeIcon) {
      themeIcon.outerHTML = appIcon(isLight ? 'lightMode' : 'darkMode', 'app-icon setting-icon', 'theme-setting-icon');
    }
  },

  async applyDynamicTheme() {
    if (!SettingsManager.get('ui.dynamicTheming')) {
      const root = document.documentElement;
      root.style.removeProperty('--dynamic-primary');
      root.style.removeProperty('--dynamic-vibrant');
      root.style.setProperty('--accent-rgb', '212, 175, 55');
      if (SettingsManager.get('ui.waveformSeekbar')) requestAnimationFrame(() => this.renderWaveform());
      return;
    }

    const track = Player.currentTrack;
    if (!track) return;

    let artwork = Player.currentArtworkUrl || null;
    if (!artwork) artwork = this.getArtworkUrl(track);
    if (!artwork || artwork === 'assets/default-art.png') return;

    try {
      const colors = await Utils.extractColors(artwork);
      this.onThemeColors(colors);
    } catch(e) {
      console.warn('Could not apply dynamic theme:', e);
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
      case 'audio-effects': this.renderAudioEffects(container); break;
      default: this.renderHome(container);
    }
  },

  updatePageTitle() {
    const titles = {
      home: 'Home', search: 'Search', tracks: 'Tracks', albums: 'Albums',
      artists: 'Artists', genres: 'Genres', playlists: 'Playlists',
      queue: 'Queue', lyrics: 'Lyrics', folders: 'Folders',
      favorites: 'Favorites', settings: 'Settings', 'audio-effects': 'Audio Effects'
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
        html += `<div class="h-scroll-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track, 'small')}</div>`;
      });
      html += `</div>`;
    }

    if (mostPlayed.length > 0) {
      html += `<div class="section-header"><h2>Most Played</h2></div><div class="h-scroll">`;
      mostPlayed.forEach(track => {
        html += `<div class="h-scroll-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track, 'small')}</div>`;
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
        html += `<div class="grid-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track)}</div>`;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
  },

  renderSearch(container) {
    container.innerHTML = `
      <div class="search-hero">
        <div class="search-box">
          ${appIcon('search')}
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
      html += `<button class="icon-btn small" onclick="UI.clearSelection()" title="Clear">${appIcon('remove')}</button>`;
      html += `<span style="font-size:13px;color:var(--text-secondary);font-weight:600;">${this.selectedTracks.size} selected</span>`;
      html += `<button class="icon-btn small" onclick="UI.addSelectedToQueue()" title="Add to Queue">${appIcon('addPlayNext')}</button>`;
      html += `<button class="icon-btn small" onclick="UI.showPlaylistModal()" title="Add to Playlist">${appIcon('addPlaylist')}</button>`;
    } else {
      html += `<select class="sort-select" onchange="UI.sortTracks(this.value)">`;
      html += `<option value="title">Title</option><option value="artist">Artist</option><option value="album">Album</option><option value="duration">Duration</option><option value="playCount">Plays</option><option value="dateAdded">Date Added</option>`;
      html += `</select>`;
      html += `<button class="icon-btn small" onclick="UI.toggleSortDir()" title="Toggle sort direction">${appIcon('sort')}</button>`;
    }
    html += '</div>';
    html += '<div class="view-toolbar-right">';
    html += `<button class="view-toggle-btn ${!isGrid ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'list'); UI.renderCurrentPage()">${appIcon('tracks')}</button>`;
    html += `<button class="view-toggle-btn ${isGrid ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'grid'); UI.renderCurrentPage()">${appIcon('grid')}</button>`;
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
        html += `<div class="grid-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track)}</div>`;
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
    html += `<button class="view-toggle-btn ${!isCollage ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'grid'); UI.renderCurrentPage()">${appIcon('grid')}</button>`;
    html += `<button class="view-toggle-btn ${isCollage ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'collage'); UI.renderCurrentPage()">${appIcon('grid')}</button>`;
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
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
    html += `<button class="btn-outline" onclick="UI.shufflePlaylist('${pl.id}')">Shuffle</button>`;
    html += `<button class="btn-outline" onclick="UI.sortPlaylist('${pl.id}')">${appIcon('sortPlaylist')} Sort</button>`;
    if (pl.type === 'user') html += `<button class="btn-outline danger" onclick="UI.removeArtistsFromPlaylist('${pl.id}')">${appIcon('removeArtists')} Remove Artists</button>`;
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
          <div class="queue-num">${isCurrent ? '<div class="playing-bars"><span></span><span></span><span></span></div>' : (i + 1)}</div>
          <img class="track-art" src="${this.getArtworkUrl(track)}" alt="">
          <div class="track-info">
            <span class="track-title">${Utils.escapeHtml(track.title)}</span>
            <span class="track-meta">${Utils.escapeHtml(track.artist)}</span>
          </div>
          <span class="track-duration">${Utils.formatDuration(track.duration)}</span>
          <div class="track-actions">
            <button class="icon-btn small" onclick="Player.removeFromQueue(${i}); event.stopPropagation();">
              ${appIcon('remove')}
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

    if (!SettingsManager.get('lyrics.enabled')) {
      html += `<div class="lyrics-container"><p style="color:var(--text-tertiary);font-size:16px;">Lyrics are disabled in Settings.</p></div>`;
      container.innerHTML = html;
      if (this.lyricsInterval) { clearInterval(this.lyricsInterval); this.lyricsInterval = null; }
      return;
    }

    if (!lyrics || lyrics.length === 0) {
      html += `<div class="lyrics-container"><p style="color:var(--text-tertiary);font-size:16px;">No lyrics available</p></div>`;
      html += `<button class="btn-outline btn-full" onclick="UI.renderLyricsEditor(document.getElementById('page-container'))">Add Lyrics</button>`;
      container.innerHTML = html;
      return;
    }

    const lyricAlign = SettingsManager.get('lyrics.alignCenter') ? 'center' : 'left';
    const lyricSize = SettingsManager.get('lyrics.fontSize') || 16;
    html += `<div class="lyrics-container" id="lyrics-container" style="text-align:${lyricAlign};">`;
    lyrics.forEach((line, i) => {
      html += `<div class="lyric-line" id="lyric-${i}" data-time="${line.time}" style="font-size:${lyricSize}px;">${Utils.escapeHtml(line.text)}</div>`;
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
        ${appIcon('folders')}
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

  renderAudioEffects(container) {
    const s = CONFIG.audio;
    const presets = s.eqPresets || [];
    const freqs = [60,250,1000,4000,16000];
    const values = s.eqCurrentPreset === 'Custom' ? s.eqCustomValues : ((presets.find(p => p.name === s.eqCurrentPreset) || presets[0])?.values || Array(5).fill(0));
    let html = `<div class="view-toolbar"><div class="view-toolbar-left"><button class="icon-btn" onclick="UI.navigate('home')">${appIcon('previous')}</button><h2 style="font-size:18px;font-weight:800;">Audio Effects</h2></div></div>`;
    html += `<div class="effects-panel">`;
    html += `<div class="effects-card"><div class="effects-card-head"><div><h3>Equalizer</h3><p>5-band EQ from bass to air.</p></div><label class="toggle-switch"><input type="checkbox" ${s.equalizerEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.equalizerEnabled', this.checked)"><span class="toggle-slider"></span></label></div>`;
    html += `<div class="effect-action-row"><div class="eq-preset-row"><select aria-label="EQ preset" onchange="UI.setEqPreset(this.value)">${presets.map(p=>`<option ${s.eqCurrentPreset===p.name?'selected':''}>${Utils.escapeHtml(p.name)}</option>`).join('')}<option ${s.eqCurrentPreset==='Custom'?'selected':''}>Custom</option></select></div><button class="effect-reset-btn" type="button" onclick="UI.resetEqualizer()">Reset</button></div>`;
    html += `<div class="eq-sliders">${freqs.map((f,i)=>`<label><input type="range" min="-12" max="12" step="0.5" value="${values[i] || 0}" oninput="UI.setEqBand(${i}, this.value)"><span>${f >= 1000 ? (f/1000)+'k' : f} Hz</span></label>`).join('')}</div></div>`;
    html += `<div class="effects-card"><div class="effects-card-head"><div><h3>Pitch & Speed</h3><p>These controls are applied together to the same playback rate.</p></div>${appIcon('pitchSpeed')}</div>`;
    html += `<div class="effect-control"><div><strong>Pitch</strong><span id="pitch-value">${s.pitchSemitones > 0 ? '+' : ''}${s.pitchSemitones} st</span></div><input type="range" min="-12" max="12" step="1" value="${s.pitchSemitones}" oninput="UI.setEffectValue('pitchSemitones', this.value)"></div>`;
    html += `<div class="effect-control"><div><strong>Speed</strong><span id="speed-value">${Number(s.playbackSpeed).toFixed(2)}×</span></div><input type="range" min="0.5" max="2" step="0.05" value="${s.playbackSpeed}" oninput="UI.setEffectValue('playbackSpeed', this.value)"></div>`;
    html += `<div class="effect-action-row effect-reset-row"><span>Reset both controls to neutral.</span><button class="effect-reset-btn" type="button" onclick="UI.resetPitchSpeed()">Reset</button></div></div>`;
    html += `<div class="effects-card"><div class="effects-card-head"><div><h3>Volume Boost</h3><p>Applies gain after the EQ/compressor stage.</p></div>${appIcon('volumeBoost')}</div><div class="effect-control"><div><strong>Boost</strong><span id="boost-value">${Math.round(s.volumeBoost*100)}%</span></div><input type="range" min="50" max="250" step="5" value="${Math.round(s.volumeBoost*100)}" oninput="UI.setEffectValue('volumeBoost', this.value / 100)"></div></div>`;
    html += `</div>`;
    container.innerHTML = html;
  },

  resetEqualizer() {
    const flat = Array(5).fill(0);
    SettingsManager.set('audio.eqCurrentPreset', 'Flat');
    SettingsManager.set('audio.eqCustomValues', flat);
    Player.applyEQPreset();
    if (this.currentPage === 'audio-effects') this.renderCurrentPage();
    if (document.getElementById('audio-effects-overlay')?.classList.contains('open')) this.openAudioEffectsOverlay();
  },

  resetPitchSpeed() {
    SettingsManager.set('audio.pitchSemitones', 0);
    SettingsManager.set('audio.playbackSpeed', 1);
    Player.applyPlaybackEffects();
    if (this.currentPage === 'audio-effects') this.renderCurrentPage();
    if (document.getElementById('audio-effects-overlay')?.classList.contains('open')) this.openAudioEffectsOverlay();
  },
  setEqPreset(name) {
    SettingsManager.set('audio.eqCurrentPreset', name);
    if (name !== 'Custom') {
      const preset = CONFIG.audio.eqPresets.find(p=>p.name===name);
      if (preset) SettingsManager.set('audio.eqCustomValues', [...preset.values]);
    }
    this.renderCurrentPage();
  },

  setEqBand(index, value) {
    const next = [...CONFIG.audio.eqCustomValues]; next[index] = Number(value);
    SettingsManager.set('audio.eqCustomValues', next);
    SettingsManager.set('audio.eqCurrentPreset', 'Custom');
    Player.setEQBand(index, Number(value));
  },

  setEffectValue(kind, value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    SettingsManager.set(`audio.${kind}`, n);
    Player.applyPlaybackEffects();
    const ids = { pitchSemitones:'pitch-value', playbackSpeed:'speed-value', volumeBoost:'boost-value' };
    const el = document.getElementById(ids[kind]);
    if (el) el.textContent = kind === 'pitchSemitones' ? `${n>0?'+':''}${n} st` : kind === 'playbackSpeed' ? `${n.toFixed(2)}×` : `${Math.round(n*100)}%`;
  },

  renderSettings(container) {
    const s = CONFIG;
    const toggle = (path, label, checked, hint = '') => `
      <div class="setting-row">
        <div style="flex:1;min-width:0;"><span>${label}</span>${hint ? `<small style="display:block;color:var(--text-tertiary);font-size:11px;margin-top:3px;line-height:1.4;">${hint}</small>` : ''}</div>
        <label class="toggle-switch">
          <input type="checkbox" ${checked ? 'checked' : ''} onchange="SettingsManager.set('${path}', this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>`;
    const number = (path, label, value, min, max, step = 1, hint = '') => `
      <div class="setting-row">
        <div style="flex:1;min-width:0;"><span>${label}</span>${hint ? `<small style="display:block;color:var(--text-tertiary);font-size:11px;margin-top:3px;line-height:1.4;">${hint}</small>` : ''}</div>
        <input type="number" value="${value}" min="${min}" max="${max}" step="${step}" onchange="SettingsManager.set('${path}', this.value)">
      </div>`;
    const select = (path, label, value, options, hint = '') => `
      <div class="setting-row">
        <div style="flex:1;min-width:0;"><span>${label}</span>${hint ? `<small style="display:block;color:var(--text-tertiary);font-size:11px;margin-top:3px;line-height:1.4;">${hint}</small>` : ''}</div>
        <select onchange="SettingsManager.set('${path}', this.value)">${options.map(([v, text]) => `<option value="${v}" ${value === v ? 'selected' : ''}>${text}</option>`).join('')}</select>
      </div>`;

    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Settings</h2></div></div>';
    html += '<div class="settings-list">';

    html += `<div class="settings-group"><h3>Audio</h3>`;
    html += toggle('audio.equalizerEnabled', 'Equalizer', s.audio.equalizerEnabled);
    html += number('audio.crossfadeDuration', 'Crossfade (seconds)', s.audio.crossfadeDuration, 0, 10, 0.5, 'Applied when moving to the next track.');
    html += number('audio.playPauseFadeDuration', 'Play / Pause Fade (seconds)', s.audio.playPauseFadeDuration, 0, 5, 0.1);
    html += toggle('audio.skipSilence', 'Skip Silence', s.audio.skipSilence, 'Skips low-level sections while playing.');
    html += number('audio.skipSilenceThreshold', 'Silence Threshold (dB)', s.audio.skipSilenceThreshold, -100, 0, 1);
    html += toggle('audio.gaplessPlayback', 'Gapless / Preload Next', s.audio.gaplessPlayback);
    html += `</div>`;

    html += `<div class="settings-group"><h3>Playback</h3>`;
    html += toggle('playback.persistentQueue', 'Persistent Queue', s.playback.persistentQueue, 'Keeps the current queue across reloads.');
    html += toggle('playback.shuffleMode', 'Shuffle', s.playback.shuffleMode);
    html += select('playback.repeatMode', 'Repeat Mode', s.playback.repeatMode, [['none','Off'],['all','All Tracks'],['one','One Track'],['n','Repeat Track N Times']]);
    html += number('playback.repeatNTimes', 'Repeat Track N Times', s.playback.repeatNTimes, 1, 20, 1, 'Used when Repeat Mode is set to Repeat Track N Times.');
    html += toggle('playback.autoPlayOnInsert', 'Autoplay Inserted Tracks', s.playback.autoPlayOnInsert);
    html += toggle('playback.smartPause.onAppSwitch', 'Pause When App Is Hidden', s.playback.smartPause.onAppSwitch);
    html += toggle('playback.smartPause.onVolumeZero', 'Pause When Volume Reaches Zero', s.playback.smartPause.onVolumeZero);
    html += toggle('playback.smartPause.onHeadphoneDisconnect', 'Pause on Audio Device Disconnect', s.playback.smartPause.onHeadphoneDisconnect, 'Best-effort browser/device detection; platform support varies.');
    html += `</div>`;

    html += `<div class="settings-group"><h3>Interface</h3>`;
    html += `<div class="setting-row theme-setting-row">
      <div style="flex:1;min-width:0;"><span>${appIcon(s.ui.themeMode === 'light' ? 'lightMode' : 'darkMode', 'app-icon setting-icon', 'theme-setting-icon')} Theme</span>
      <small style="display:block;color:var(--text-tertiary);font-size:11px;margin-top:3px;line-height:1.4;">Choose between the light and dark interface.</small></div>
      <select aria-label="Theme" onchange="SettingsManager.set('ui.themeMode', this.value)">
        <option value="dark" ${s.ui.themeMode === 'dark' ? 'selected' : ''}>Dark</option>
        <option value="light" ${s.ui.themeMode === 'light' ? 'selected' : ''}>Light</option>
      </select>
    </div>`;
    html += toggle('ui.dynamicTheming', 'Dynamic Theming', s.ui.dynamicTheming, 'Uses the current artwork to tint the interface.');
    html += toggle('ui.particlesEnabled', 'Particles', s.ui.particlesEnabled);
    html += number('ui.particlesIntensity', 'Particle Intensity', s.ui.particlesIntensity, 0, 2, 0.1);
    html += toggle('ui.miniplayerGlow', 'Mini-player Glow', s.ui.miniplayerGlow);
    html += select('ui.miniplayerGlowMode', 'Mini-player Glow Mode', s.ui.miniplayerGlowMode, [['dynamic','Dynamic'],['static','Static']]);
    html += toggle('ui.glassmorphism', 'Glassmorphism', s.ui.glassmorphism, 'Use frosted, translucent surfaces for the bottom navigation and sidebar.');
    html += number('ui.glassIntensity', 'Glass Intensity', s.ui.glassIntensity, 0, 1, 0.05);
    html += select('ui.gridColumns', 'Grid Columns', s.ui.gridColumns, [['auto','Auto'],['2','2'],['3','3'],['4','4'],['5','5']]);
    html += select('ui.gridViewStyle', 'Library View', s.ui.gridViewStyle, [['grid','Grid'],['list','List'],['collage','Collage']]);
    html += toggle('ui.waveformSeekbar', 'Waveform Seekbar', s.ui.waveformSeekbar);
    html += number('ui.waveformBars', 'Waveform Bars', s.ui.waveformBars, 20, 300, 1);
    html += select('ui.vibrationMode', 'Vibration', s.ui.vibrationMode, [['haptic','Haptic'],['none','Off']]);
    html += `</div>`;

    html += `<div class="settings-group"><h3>Library Scan</h3>`;
    html += number('library.minFileSizeMB', 'Minimum File Size (MB)', s.library.minFileSizeMB, 0, 1000, 0.1);
    html += number('library.minDurationSeconds', 'Minimum Duration (seconds)', s.library.minDurationSeconds, 0, 3600, 1);
    html += select('library.deduplicateBy', 'Deduplicate By', s.library.deduplicateBy, [['hash','Hash'],['path','Path']]);
    html += toggle('library.extractFeaturedArtists', 'Extract Featured Artists', s.library.extractFeaturedArtists);
    html += toggle('library.moodTagsEnabled', 'Mood Tags', s.library.moodTagsEnabled);
    html += toggle('library.allowMultipleAlbums', 'Allow Multiple Albums', s.library.allowMultipleAlbums);
    html += toggle('library.autoIndexOnLaunch', 'Auto Index on Launch', s.library.autoIndexOnLaunch, 'Works with a previously authorized folder.');
    html += toggle('folders.showHidden', 'Show Hidden Files', s.folders.showHidden);
    html += number('folders.scanDepth', 'Scan Depth', s.folders.scanDepth, 0, 20, 1);
    html += `</div>`;

    html += `<div class="settings-group"><h3>Smart Features</h3>`;
    html += toggle('smart.mostPlayedAutoUpdate', 'Auto-update Most Played', s.smart.mostPlayedAutoUpdate);
    html += number('smart.mostPlayedMinPlays', 'Minimum Plays', s.smart.mostPlayedMinPlays, 1, 100, 1);
    html += number('smart.mostPlayedMaxTracks', 'Most Played Limit', s.smart.mostPlayedMaxTracks, 1, 500, 1);
    html += toggle('smart.lostMemoriesEnabled', 'Lost Memories', s.smart.lostMemoriesEnabled);
    html += `</div>`;

    html += `<div class="settings-group"><h3>History</h3>`;
    html += number('history.minListenSeconds', 'Minimum Listen Time (seconds)', s.history.minListenSeconds, 0, 3600, 1);
    html += number('history.minListenPercent', 'Minimum Listen Percent', s.history.minListenPercent, 0, 100, 1);
    html += toggle('history.scrobbleEnabled', 'Scrobbling', s.history.scrobbleEnabled, 'Requires valid Last.fm credentials.');
    html += `</div>`;

    html += `<div class="settings-group"><h3>Lyrics</h3>`;
    html += toggle('lyrics.enabled', 'Lyrics', s.lyrics.enabled);
    html += number('lyrics.fontSize', 'Lyrics Font Size', s.lyrics.fontSize, 10, 40, 1);
    html += toggle('lyrics.alignCenter', 'Center Lyrics', s.lyrics.alignCenter);
    html += toggle('lyrics.highlightCurrentLine', 'Highlight Current Line', s.lyrics.highlightCurrentLine);
    html += `</div>`;

    html += `<div class="settings-group"><h3>Data</h3>`;
    html += `<button class="btn-gold btn-full" onclick="SettingsManager.save(); UI.showToast('Settings saved.')">Save Settings</button>`;
    html += `<button class="btn-outline btn-full" style="margin-top:8px;" onclick="SettingsManager.reset()">Reset All Settings</button>`;
    html += `<button class="btn-outline danger btn-full" style="margin-top:8px;" onclick="UI.clearLibrary()">Clear Library</button>`;
    html += `</div>`;

    html += `<div class="settings-group"><h3>About</h3>`;
    html += `<p style="color:var(--text-secondary);font-size:14px;line-height:1.6;">Okvy MusiQ v${CONFIG.version}<br>Settings now apply immediately where the browser exposes the required capability.</p>`;
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
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
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
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
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
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
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

  async playTrackById(id) {
    const track = await Data.getTrack(id);
    if (!track) return;

    // A track-row click used to load the track directly, leaving the player
    // queue unchanged (often empty or pointing at an old queue). That made
    // Previous/Next appear to do nothing. Preserve an existing queue when it
    // contains this track; otherwise build a library queue around the clicked
    // track so transport controls always have real context.
    const existingQueue = Array.isArray(Player.queue) ? Player.queue : [];
    const existingIndex = existingQueue.findIndex(t => t && t.id === track.id);

    if (existingIndex >= 0) {
      Player.queueIndex = existingIndex;
      await Player.loadTrack(track);
      return;
    }

    const allTracks = await Data.getTracks();
    const libraryQueue = Array.isArray(allTracks) ? allTracks.filter(Boolean) : [];
    const startIndex = libraryQueue.findIndex(t => t && t.id === track.id);

    if (startIndex >= 0 && libraryQueue.length > 1) {
      Player.setQueue(libraryQueue, startIndex);
    } else {
      Player.setQueue([track], 0);
    }

    await Player.loadTrack(track);
  },

  async playTracksByIds(ids, startIndex = 0) {
    const tracks = (await Promise.all(ids.map(id => Data.getTrack(id)))).filter(Boolean);
    if (tracks.length === 0) return;
    Player.setQueue(tracks, startIndex);
    Player.loadTrack(tracks[startIndex]);
  },

  renderTrackRow(track, index) {
    const isPlaying = Player.currentTrack && Player.currentTrack.id === track.id;
    const isSelected = this.selectedTracks.has(track.id);
    return `
      <div class="track-row ${isPlaying ? 'playing' : ''} ${isSelected ? 'selected' : ''}" onclick="${this.isSelectionMode ? `UI.toggleTrackSelection('${track.id}')` : `UI.playTrackById('${track.id}')`}" oncontextmenu="UI.showTrackMenu('${track.id}', event)">
        ${this.isSelectionMode ? `<div class="track-check ${isSelected ? 'checked' : ''}">${appIcon('select')}</div>` : ''}
        <img class="track-art" src="${this.getArtworkUrl(track)}" alt="">
        <div class="track-info">
          <span class="track-title">${Utils.escapeHtml(track.title)}</span>
          <span class="track-meta">${Utils.escapeHtml(track.artist)}${track.album ? ' &bull; ' + Utils.escapeHtml(track.album) : ''}</span>
        </div>
        <div class="track-actions">
          <button class="icon-btn small track-favorite-btn ${track.favorite ? 'is-favorite' : ''}" onclick="event.stopPropagation(); UI.toggleTrackFavorite('${track.id}')">
            ${appIcon('favourite')}
          </button>
          <button class="icon-btn small" onclick="event.stopPropagation(); UI.showTrackMenu('${track.id}', event)">
            ${appIcon('options')}
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
          <button class="play-overlay" onclick="event.stopPropagation(); ${item.id ? `UI.playTrackById('${item.id}')` : ''}">
            ${appIcon('play')}
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
            ${appIcon('play')}
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
    document.body.classList.add('full-player-open');
    document.getElementById('full-player').classList.add('open');
    this.applyWaveformMode();
  },

  closeFullPlayer() {
    document.getElementById('full-player').classList.remove('open');
    document.body.classList.remove('full-player-open');
    this.hidePlayerOptions();
    this.closePlayerOverlay('lyrics');
    this.closePlayerOverlay('audio-effects');
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
    if (next !== current) Player.repeatCount = 0;
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
      try {
        await Data.saveFolder({ path: dirHandle.name, name: dirHandle.name, handle: dirHandle, lastScanned: Date.now() });
      } catch (saveError) {
        console.warn('Could not remember folder handle:', saveError);
      }
      await Scanner.scanDirectory(dirHandle);
    } catch(e) {
      console.warn('Scan cancelled or failed:', e.message);
    }
  },

  async autoIndexSavedFolders() {
    if (!SettingsManager.get('library.autoIndexOnLaunch')) return;
    if (!window.showDirectoryPicker) return;

    const folders = await Data.getFolders();
    if (!folders.length) return;

    for (const folder of folders) {
      const handle = folder.handle;
      if (!handle || typeof handle.queryPermission !== 'function') continue;
      try {
        const permission = await handle.queryPermission({ mode: 'read' });
        if (permission === 'granted') {
          await Scanner.scanDirectory(handle);
          try {
            await Data.saveFolder({ ...folder, lastScanned: Date.now() });
          } catch(e) {}
        }
      } catch(e) {
        console.warn('Auto index skipped for folder:', folder.name || folder.path, e);
      }
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
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 2200);
  },

  async clearLibrary() {
    try {
      await Data.clearLibrary();
      Player.setQueue([], 0);
      this.showToast('Library cleared.');
      this.renderSidebarPlaylists();
      this.renderCurrentPage();
    } catch (error) {
      console.error('Could not clear library:', error);
      this.showToast('Could not clear the library.');
    }
  },

  showTrackMenu(id, event) {
    if (event) event.stopPropagation();
    this.trackMenuTargetId = id;
    const menuItems = [
      { icon: 'playAfterTracks', label: 'Play Next', action: () => this.playTrackNext(id) },
      { icon: 'addPlayNext', label: 'Add to Queue', action: () => this.addTrackToQueue(id) },
      { icon: 'addPlaylist', label: 'Add to Playlist', action: () => this.showPlaylistModalForTrack(id) },
      { icon: 'playOnly', label: 'Play Only This Track', action: () => this.playOnlyTrack(id) },
      { icon: 'favourite', label: 'Add / Remove Favorite', action: () => this.toggleTrackFavorite(id) },
      { icon: 'favoriteArtist', label: 'Favorite Artist', action: () => this.toggleFavoriteArtist(id) },
      { icon: 'metadata', label: 'Edit Metadata', action: () => this.editTrackMetadata(id) },
      { icon: 'youtube', label: 'Find on YouTube', action: () => this.findTrackOnYouTube(id) },
      { icon: 'share', label: 'Share', action: () => this.shareTrackById(id) },
      { icon: 'albums', label: 'Go to Album', action: () => this.goToAlbum(id) },
      { icon: 'artists', label: 'Go to Artist', action: () => this.goToArtist(id) },
      { icon: 'delete', label: 'Delete Track from Library', action: () => this.deleteTrack(id) },
      { icon: 'deleteArtist', label: 'Delete Artist & Related Tracks', action: () => this.deleteArtistAndTracks(id) },
    ];
    const container = document.getElementById('track-menu-list');
    container.innerHTML = menuItems.map((item, i) =>
      `<div class="modal-item menu-action-item" onclick="UI.trackMenuAction(${i})">${item.icon ? appIcon(item.icon) : ''}<span>${Utils.escapeHtml(item.label)}</span></div>`
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

  async playOnlyTrack(id) {
    const track = await Data.getTrack(id);
    if (track) Player.setQueue([track], 0);
  },

  async toggleFavoriteArtist(id) {
    const track = await Data.getTrack(id);
    if (!track?.artist) return;
    const list = JSON.parse(localStorage.getItem('okvy_favorite_artists') || '[]');
    const next = list.includes(track.artist) ? list.filter(a => a !== track.artist) : [...list, track.artist];
    localStorage.setItem('okvy_favorite_artists', JSON.stringify(next));
    this.showToast(next.includes(track.artist) ? `Favorite artist: ${track.artist}` : `Removed favorite artist: ${track.artist}`);
  },

  async editTrackMetadata(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const title = prompt('Title', track.title || '');
    if (title === null) return;
    const artist = prompt('Artist', track.artist || '');
    if (artist === null) return;
    const album = prompt('Album', track.album || '');
    if (album === null) return;
    await Data.saveTrack({ ...track, title: title.trim() || track.title, artist: artist.trim() || track.artist, album: album.trim() || track.album });
    this.renderCurrentPage();
    this.showToast('Metadata updated.');
  },

  async findTrackOnYouTube(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const q = encodeURIComponent(`${track.title || ''} ${track.artist || ''}`.trim());
    window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank', 'noopener');
  },


  async deleteArtistAndTracks(id) {
    const track = await Data.getTrack(id);
    if (!track?.artist) return;
    const all = await Data.getTracks();
    const related = all.filter(t => t.artist === track.artist);
    if (!confirm(`Delete artist “${track.artist}” and all ${related.length} related tracks from the library?`)) return;
    for (const t of related) await Data.deleteTrack(t.id);
    if (related.some(t => t.id === Player.currentTrack?.id)) await Player.pause();
    Player.queue = Player.queue.filter(t => !related.some(r => r.id === t.id));
    this.renderCurrentPage();
    this.showToast(`Deleted ${related.length} track${related.length === 1 ? '' : 's'} by ${track.artist}.`);
  },

  async deleteTrack(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    if (!confirm(`Remove “${track.title || 'this track'}” from the library?`)) return;
    await Data.deleteTrack(id);
    if (Player.currentTrack?.id === id) await Player.pause();
    Player.queue = Player.queue.filter(t => t.id !== id);
    this.renderCurrentPage();
    this.showToast('Track removed from library.');
  },

  closePlayerOverlay(kind) {
    const id = kind === 'lyrics' ? 'lyrics-overlay' : 'audio-effects-overlay';
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open', 'expanded');
    el.setAttribute('aria-hidden', 'true');
    if (kind === 'lyrics' && this.lyricsOverlayInterval) {
      clearInterval(this.lyricsOverlayInterval);
      this.lyricsOverlayInterval = null;
    }
  },

  bindLyricsLongPress() {
    const card = document.getElementById('lyrics-overlay-card');
    if (!card) return;
    let timer = null;
    let active = false;
    const start = (e) => {
      if (e.target.closest('.overlay-close')) return;
      active = true;
      timer = setTimeout(() => {
        if (!active) return;
        card.classList.add('expanded');
        const overlay = document.getElementById('lyrics-overlay');
        overlay?.classList.add('expanded');
      }, 520);
    };
    const cancel = () => { active = false; if (timer) { clearTimeout(timer); timer = null; } };
    card.addEventListener('pointerdown', start);
    ['pointerup','pointercancel','pointerleave'].forEach(type => card.addEventListener(type, cancel));
  },

  async openLyricsOverlay(expand = false) {
    const track = Player.currentTrack;
    if (!track) { this.showToast('Nothing is playing.'); return; }
    const overlay = document.getElementById('lyrics-overlay');
    const linesEl = document.getElementById('lyrics-preview-lines');
    if (!overlay || !linesEl) return;
    const art = this.getArtworkUrl(track);
    overlay.style.setProperty('--lyrics-art', `url("${String(art).replace(/"/g, '\\"')}")`);
    document.getElementById('lyrics-overlay-title').textContent = track.title || 'Lyrics';
    document.getElementById('lyrics-overlay-artist').textContent = track.artist || '-';
    const lyrics = track.lyrics ? track.lyrics : track.lyricsLrc ? Utils.lrcParse(track.lyricsLrc) : track.lyricsTtml ? Utils.ttmlParse(track.lyricsTtml) : null;
    if (!SettingsManager.get('lyrics.enabled')) {
      linesEl.innerHTML = `<div class="lyrics-empty">Lyrics are disabled in Settings.</div>`;
    } else if (!lyrics?.length) {
      linesEl.innerHTML = `<div class="lyrics-empty">No lyrics available.</div><button class="btn-outline" onclick="UI.closePlayerOverlay('lyrics'); UI.renderLyricsEditor(document.getElementById('page-container'))">Add Lyrics</button>`;
    } else {
      const size = SettingsManager.get('lyrics.fontSize', 16);
      linesEl.innerHTML = lyrics.map((line,i) => `<div class="lyric-preview-line" id="overlay-lyric-${i}" data-time="${line.time}" style="font-size:${size}px">${Utils.escapeHtml(line.text)}</div>`).join('');
      this.lyricsOverlayInterval = setInterval(() => this.highlightOverlayLyric(lyrics), 180);
      this.highlightOverlayLyric(lyrics);
    }
    overlay.classList.add('open');
    if (expand) { overlay.classList.add('expanded'); document.getElementById('lyrics-overlay-card')?.classList.add('expanded'); }
    overlay.setAttribute('aria-hidden','false');
  },

  highlightOverlayLyric(lyrics) {
    const current = Player.getCurrentTime();
    let active = -1;
    for (let i=0;i<lyrics.length;i++) if (lyrics[i].time <= current) active=i;
    document.querySelectorAll('.lyric-preview-line').forEach((el,i)=>el.classList.toggle('active',i===active));
    const line = active >= 0 ? document.getElementById(`overlay-lyric-${active}`) : null;
    if (line && document.getElementById('lyrics-overlay-card')?.classList.contains('expanded')) line.scrollIntoView({behavior:'smooth',block:'center'});
  },

  async openAudioEffectsOverlay() {
    const overlay = document.getElementById('audio-effects-overlay');
    const content = document.getElementById('audio-effects-overlay-content');
    if (!overlay || !content) return;
    content.innerHTML = this.buildAudioEffectsControls();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
  },

  buildAudioEffectsControls() {
    const values = SettingsManager.get('audio.eqCustomValues', Array(5).fill(0));
    const preset = SettingsManager.get('audio.eqCurrentPreset','Flat');
    const bands = [60,250,1000,4000,16000];
    const eqEnabled = SettingsManager.get('audio.equalizerEnabled', true);
    const pitch = Number(SettingsManager.get('audio.pitchSemitones',0));
    const speed = Number(SettingsManager.get('audio.playbackSpeed',1));
    const boost = Number(SettingsManager.get('audio.volumeBoost',1));
    return `<div class="effects-quick-grid">
      <div class="effects-card compact"><div class="effects-card-head"><div><h3>Equalizer</h3><p>5-band EQ from bass to air.</p></div><label class="toggle-switch"><input type="checkbox" ${eqEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.equalizerEnabled', this.checked)"><span class="toggle-slider"></span></label></div>
      <div class="effect-action-row"><select onchange="UI.setEqPreset(this.value)">${SettingsManager.get('audio.eqPresets',[]).map(p=>`<option ${p.name===preset?'selected':''}>${Utils.escapeHtml(p.name)}</option>`).join('')}<option ${preset==='Custom'?'selected':''}>Custom</option></select><button class="effect-reset-btn" type="button" onclick="UI.resetEqualizer()">Reset</button></div>
      <div class="eq-sliders">${bands.map((f,i)=>`<label><input type="range" min="-12" max="12" step="0.5" value="${values[i]||0}" oninput="UI.setQuickEQ(${i}, this.value)"><span>${f>=1000?(f/1000)+'k':f}</span></label>`).join('')}</div></div>
      <div class="effects-card compact"><div class="effects-card-head"><div><h3>Pitch & Speed</h3><p>Applied together to playback.</p></div>${appIcon('pitchSpeed')}</div>
      <div class="effect-control"><div><strong>Pitch</strong><span id="pitch-value">${pitch>0?'+':''}${pitch} st</span></div><input type="range" min="-12" max="12" step="1" value="${pitch}" oninput="UI.setEffectValue('pitchSemitones', this.value)"></div>
      <div class="effect-control"><div><strong>Speed</strong><span id="speed-value">${speed.toFixed(2)}×</span></div><input type="range" min="0.5" max="2" step="0.05" value="${speed}" oninput="UI.setEffectValue('playbackSpeed', this.value)"></div>
      <div class="effect-action-row effect-reset-row"><span>Reset both controls</span><button class="effect-reset-btn" type="button" onclick="UI.resetPitchSpeed()">Reset</button></div></div>
      <div class="effects-card compact"><div class="effect-control"><div><strong>Volume Boost</strong><span id="boost-value">${Math.round(boost*100)}%</span></div><input type="range" min="0.5" max="2.5" step="0.05" value="${boost}" oninput="UI.setEffectValue('volumeBoost', this.value)"></div></div></div>`;
  },
  setQuickEQ(index, value) {
    const vals = [...SettingsManager.get('audio.eqCustomValues', Array(5).fill(0))];
    vals[index] = Number(value)||0;
    SettingsManager.set('audio.eqCustomValues', vals);
    SettingsManager.set('audio.eqCurrentPreset', 'Custom', {notify:false});
    Player.applyEQPreset();
  },

  showPlayerOptions() {
    if (!Player.currentTrack) { this.showToast('Nothing is playing.'); return; }
    const activeSleep = Player.sleepTimer || Player.sleepTracksRemaining > 0;
    const items = [
      { icon: 'shuffle', label: SettingsManager.get('playback.shuffleMode') ? 'Turn Shuffle Off' : 'Turn Shuffle On', action: () => { this.toggleShuffle(); this.showPlayerOptions(); } },
      { icon: 'repeat', label: 'Repeat Mode', action: () => { this.toggleRepeat(); this.showPlayerOptions(); } },
      { icon: 'equalizer', label: 'Audio Effects', action: () => { this.hidePlayerOptions(); this.openAudioEffectsOverlay(); } },
      { icon: 'repeatSection', label: Player.repeatSection.enabled ? 'Stop Repeat Section' : 'Set Repeat Section', action: () => this.toggleRepeatSection() },
      { icon: 'playAfterSeconds', label: 'Play After X Seconds', action: () => this.schedulePlayAfterPrompt() },
      { icon: 'playAfterTracks', label: 'Play After X Tracks', action: () => this.scheduleAfterTracksPrompt() },
      { icon: activeSleep ? 'pauseSleep' : 'sleepTimer', label: activeSleep ? 'Manage Sleep Timer' : 'Sleep Timer', action: () => this.showSleepTimerPrompt() },
      { icon: 'lyrics', label: 'Lyrics', action: () => { this.hidePlayerOptions(); this.openLyricsOverlay(false); } },
      { icon: 'queue', label: 'Queue', action: () => { this.hidePlayerOptions(); this.closeFullPlayer(); this.navigate('queue'); } },
      { icon: 'share', label: 'Share Track', action: () => { this.hidePlayerOptions(); this.shareTrack(); } },
    ];
    const container = document.getElementById('player-options-list');
    container.innerHTML = items.map((item,i) => `<div class="modal-item menu-action-item" onclick="UI.playerOptionAction(${i})">${appIcon(item.icon)}<span>${Utils.escapeHtml(item.label)}</span></div>`).join('');
    this.playerOptionActions = items;
    document.getElementById('player-options-modal').classList.add('open');
  },

  playerOptionAction(index) {
    const item = this.playerOptionActions?.[index];
    if (item) item.action();
  },

  hidePlayerOptions() {
    document.getElementById('player-options-modal').classList.remove('open');
    this.playerOptionActions = null;
  },

  schedulePlayAfterPrompt() {
    const seconds = Number(prompt('Start playback after how many seconds?', '10'));
    if (!Number.isFinite(seconds) || seconds < 0) return;
    this.hidePlayerOptions();
    Player.pause();
    Player.schedulePlayAfter(seconds);
    this.showToast(`Playback scheduled in ${seconds}s.`);
  },

  scheduleAfterTracksPrompt() {
    const count = Math.max(1, Math.floor(Number(prompt('Play the current track again after how many tracks?', '1')) || 0));
    if (!count) return;
    this.hidePlayerOptions();
    Player.scheduleAfterTrackCount = count;
    this.showToast(`Will repeat this track after ${count} track${count === 1 ? '' : 's'}.`);
  },

  showSleepTimerPrompt() {
    const choice = prompt('Sleep timer: enter minutes, or tracks for a track count. Example: 30 or tracks:3', '30');
    if (choice === null) return;
    if (String(choice).toLowerCase().startsWith('tracks:')) {
      const n = Math.max(1, Math.floor(Number(String(choice).split(':')[1])) || 1);
      Player.setSleepTimer('tracks', n);
      this.showToast(`Sleep timer set for ${n} track${n === 1 ? '' : 's'}.`);
    } else {
      const minutes = Math.max(1, Number(choice) || 1);
      Player.setSleepTimer('minutes', minutes);
      this.showToast(`Sleep timer set for ${minutes} minutes.`);
    }
    this.hidePlayerOptions();
  },

  toggleRepeatSection() {
    if (Player.repeatSection.enabled) {
      Player.clearRepeatSection();
      this.showToast('Repeat section off.');
    } else if (Player.repeatSection.start === null) {
      Player.setRepeatSectionStart();
      this.showToast('Repeat start marked. Play to the end point, then open Options and choose Repeat Section again.');
    } else {
      Player.setRepeatSectionEnd();
      this.showToast(Player.repeatSection.enabled ? 'Repeat section enabled.' : 'Move the end point after the start point.');
    }
    this.hidePlayerOptions();
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

  applyWaveformMode() {
    const container = document.getElementById('fp-progress-container');
    const fp = document.getElementById('full-player');
    if (!container) return;

    const on = Boolean(SettingsManager.get('ui.waveformSeekbar'));
    container.classList.toggle('waveform-mode', on);
    this._waveformToken = (this._waveformToken || 0) + 1;

    if (!on) {
      const canvas = document.getElementById('waveform-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    // Layout is already full-viewport, but defer one frame so CSS variables,
    // artwork, and accent colors have settled before measuring the canvas.
    requestAnimationFrame(() => this.renderWaveform());
    if (Player.currentTrack) this._prepareTrackWaveform(Player.currentTrack);
  },

  async _prepareTrackWaveform(track) {
    if (!track || !SettingsManager.get('ui.waveformSeekbar')) return;
    const key = String(track.id || track.path || track.title || 'current');
    const cached = this._waveformCache.get(key);
    if (cached?.length) {
      this.renderWaveform();
      return;
    }

    const token = ++this._waveformToken;
    try {
      // The waveform needs actual time-domain samples, not analyser frequency
      // bins. Decode the current audio source and reduce it to stable peak
      // values distributed across the entire track, including quiet sections.
      if (!Player.currentBlobUrl) return;
      const response = await fetch(Player.currentBlobUrl);
      const buffer = await response.arrayBuffer();
      if (token !== this._waveformToken) return;

      if (!Player.audioCtx) Player.initAudioContext();
      if (!Player.audioCtx) return;
      const audioBuffer = await Player.audioCtx.decodeAudioData(buffer.slice(0));
      if (token !== this._waveformToken) return;

      const channelCount = audioBuffer.numberOfChannels || 1;
      const channels = [];
      for (let c = 0; c < channelCount; c++) channels.push(audioBuffer.getChannelData(c));

      const bars = Math.max(48, Math.min(300, Number(SettingsManager.get('ui.waveformBars')) || 120));
      const samplesPerBar = Math.max(1, Math.floor(audioBuffer.length / bars));
      const peaks = new Float32Array(bars);
      const rms = new Float32Array(bars);

      for (let i = 0; i < bars; i++) {
        const start = i * samplesPerBar;
        const end = i === bars - 1 ? audioBuffer.length : Math.min(audioBuffer.length, start + samplesPerBar);
        let peak = 0;
        let energy = 0;
        // Sample the block at a bounded density so very long tracks do not
        // freeze the UI while still preserving clear climaxes/rests.
        const stride = Math.max(1, Math.floor((end - start) / 240));
        let count = 0;
        for (let n = start; n < end; n += stride) {
          let sample = 0;
          for (const data of channels) sample += Math.abs(data[n] || 0);
          sample /= channelCount;
          peak = Math.max(peak, sample);
          energy += sample * sample;
          count++;
        }
        peaks[i] = peak;
        rms[i] = count ? Math.sqrt(energy / count) : peak;
      }

      // A small temporal normalization keeps quiet tracks visible without
      // erasing their relative dynamics. Peaks remain the dominant signal.
      let maxPeak = 0;
      for (const v of peaks) maxPeak = Math.max(maxPeak, v);
      if (maxPeak > 0) {
        for (let i = 0; i < peaks.length; i++) {
          const normalized = peaks[i] / maxPeak;
          const floor = Math.min(0.055, Math.max(0.018, rms[i] / maxPeak * 0.35));
          peaks[i] = Math.max(floor, Math.pow(normalized, 0.72));
        }
      }

      this._waveformCache.set(key, peaks);
      // Keep memory bounded when users play through a very large library.
      while (this._waveformCache.size > 12) {
        const first = this._waveformCache.keys().next().value;
        this._waveformCache.delete(first);
      }
      this.renderWaveform();
    } catch (e) {
      // Waveform extraction is visual enhancement only. Keep the normal
      // seekbar available when a browser cannot decode the source.
      console.warn('Waveform extraction failed:', e);
      this.renderWaveform();
    }
  },

  renderWaveform() {
    const canvas = document.getElementById('waveform-canvas');
    const container = document.getElementById('fp-progress-container');
    if (!canvas || !container || !container.classList.contains('waveform-mode')) return;

    const rect = container.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width < 24 || height < 16) return;

    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const pixelWidth = Math.max(1, Math.round(width * dpr));
    const pixelHeight = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const track = Player.currentTrack;
    const key = String(track?.id || track?.path || track?.title || 'current');
    const peaks = this._waveformCache.get(key);
    if (!peaks || !peaks.length) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4af37';
    const duration = Number(Player.audio?.duration);
    const progress = duration > 0 && Number.isFinite(Player.audio?.currentTime)
      ? Math.max(0, Math.min(1, Player.audio.currentTime / duration))
      : 0;

    const bars = peaks.length;
    const step = width / bars;
    const gap = Math.max(1, Math.min(2.2, step * 0.28));
    const center = height / 2;
    const minBar = Math.max(2, height * 0.07);
    const maxBar = height * 0.90;
    const playedIndex = progress * bars;

    // Rounded vertical bars closely mimic Namida's waveform-seekbar idea:
    // the actual track envelope is persistent, while played/unplayed regions
    // use the current accent color with different opacity.
    for (let i = 0; i < bars; i++) {
      const amount = Math.max(0, Math.min(1, peaks[i]));
      const barHeight = Math.max(minBar, amount * maxBar);
      const x = i * step + gap / 2;
      const y = center - barHeight / 2;
      const w = Math.max(1, step - gap);
      ctx.fillStyle = accent;
      ctx.globalAlpha = i < playedIndex ? 0.98 : 0.23;
      const r = Math.min(w / 2, 2.5);
      ctx.beginPath();
      ctx.roundRect(x, y, w, barHeight, r);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // A slim accent marker makes the current position unmistakable without
    // turning the waveform into a conventional line seekbar.
    const markerX = Math.min(width - 1, Math.max(0, progress * width));
    ctx.fillStyle = accent;
    ctx.globalAlpha = 1;
    ctx.fillRect(markerX, 0, Math.max(2, dpr), height);
  },

  async renderSidebarPlaylists() {
    const playlists = await Data.getPlaylists();
    const container = document.getElementById('user-playlists');
    const userPls = playlists.filter(p => p.type === 'user');
    container.innerHTML = userPls.map(p => `
      <a href="#playlist-${p.id}" class="playlist-link" onclick="event.preventDefault(); UI.navigate('playlist-detail', {playlistId: '${p.id}'})">
        ${appIcon('playlists')}
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
    return `<div class="playlist-empty">${appIcon('playlists')}</div>`;
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
    return `<div class="playlist-empty">${appIcon('albums')}</div>`;
  },

  getArtistArtwork(artist, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('artists')}</div>`;
  },

  getGenreArtwork(genre) {
    return `<div class="playlist-empty"><span style="font-size:24px;font-weight:900;color:var(--accent);">${genre.name[0]}</span></div>`;
  },

  getFolderArtwork(folder, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('folders')}</div>`;
  },

  getPlaylistArtwork(playlist, tracks) {
    if (playlist.type === 'auto') {
      return this.getAutoPlaylistArtwork(playlist.id, tracks);
    }
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('playlists')}</div>`;
  },

  async sortPlaylist(id) {
    const pl = await Data.getPlaylist(id);
    if (!pl) return;
    const tracks = await this.getTracksByPlaylist(pl);
    const mode = prompt('Sort by: title, artist, album, duration', 'title');
    if (!mode) return;
    const key = ['title','artist','album','duration'].includes(mode.toLowerCase()) ? mode.toLowerCase() : 'title';
    tracks.sort((a,b) => key === 'duration' ? (a.duration||0)-(b.duration||0) : String(a[key]||'').localeCompare(String(b[key]||'')));
    pl.tracks = tracks.map(t => t.id);
    await Data.updatePlaylist(pl);
    this.renderCurrentPage();
    this.showToast('Playlist sorted.');
  },

  async removeArtistsFromPlaylist(id) {
    const pl = await Data.getPlaylist(id);
    if (!pl) return;
    const artists = prompt('Artists to remove (comma-separated):', '');
    if (!artists) return;
    const names = artists.split(',').map(v => v.trim().toLowerCase()).filter(Boolean);
    const tracks = await this.getTracksByPlaylist(pl);
    pl.tracks = tracks.filter(t => !names.includes(String(t.artist||'').toLowerCase())).map(t => t.id);
    await Data.updatePlaylist(pl);
    this.renderCurrentPage();
    this.showToast('Artists removed from playlist.');
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
