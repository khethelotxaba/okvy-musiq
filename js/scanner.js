const Scanner = {
  isScanning: false,
  progress: 0,
  total: 0,
  scanned: 0,
  abortController: null,

  async scanDirectory(dirHandle) {
    const files = [];
    const audioExts = ['.mp3','.flac','.wav','.ogg','.m4a','.aac','.wma','.opus'];
    const m3uExts = ['.m3u','.m3u8'];

    async function walk(handle, path = '') {
      for await (const entry of handle.values()) {
        if (entry.kind === 'directory') {
          await walk(entry, path + entry.name + '/');
        } else if (entry.kind === 'file') {
          const ext = '.' + entry.name.split('.').pop().toLowerCase();
          if (audioExts.includes(ext) || m3uExts.includes(ext)) {
            const file = await entry.getFile();
            Object.defineProperty(file, 'webkitRelativePath', {
              value: path + entry.name,
              writable: false
            });
            files.push(file);
          }
        }
      }
    }

    await walk(dirHandle);
    return this.scanFiles(files);
  },

  async scanFiles(fileList) {
    if (this.isScanning) return;
    this.isScanning = true;
    this.progress = 0;
    this.scanned = 0;
    this.abortController = new AbortController();

    const existing = await Data.getTracks();
    const existingPaths = new Set(existing.map(t => t.path));
    const existingHashes = new Set(existing.map(t => t.hash));

    const audioExts = ['.mp3','.flac','.wav','.ogg','.m4a','.aac','.wma','.opus'];
    const m3uExts = ['.m3u','.m3u8'];

    const files = Array.from(fileList).filter(f => {
      const ext = '.' + f.name.split('.').pop().toLowerCase();
      return audioExts.includes(ext) || m3uExts.includes(ext);
    });

    this.total = files.length;
    const newTracks = [];
    const m3uFiles = [];

    for (const file of files) {
      if (this.abortController.signal.aborted) break;

      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (m3uExts.includes(ext)) {
        m3uFiles.push(file);
        this.scanned++;
        this.progress = Math.round((this.scanned / this.total) * 100);
        continue;
      }

      const minSize = (SettingsManager.get('library.minFileSizeMB') || 0.5) * 1024 * 1024;
      if (file.size < minSize) { this.scanned++; continue; }

      const path = file.webkitRelativePath || file.name;
      const excludeFolders = SettingsManager.get('library.excludeFolders') || [];
      if (excludeFolders.some(ef => path.includes(ef))) { this.scanned++; continue; }

      const hash = await this.computeHash(file);
      const dedupMode = SettingsManager.get('library.deduplicateBy');
      if (dedupMode === 'hash' && existingHashes.has(hash)) { this.scanned++; continue; }
      if (dedupMode === 'path' && existingPaths.has(path)) { this.scanned++; continue; }

      const track = await this.processFile(file, path, hash);
      if (track) {
        const minDur = (SettingsManager.get('library.minDurationSeconds') || 10) * 1000;
        if (track.duration && track.duration < minDur) { this.scanned++; continue; }

        newTracks.push(track);
        existingHashes.add(hash);
        existingPaths.add(path);
      }

      this.scanned++;
      this.progress = Math.round((this.scanned / this.total) * 100);

      if (this.scanned % 5 === 0) {
        window.dispatchEvent(new CustomEvent('scan-progress', { detail: { progress: this.progress, current: track?.title || file.name } }));
        await new Promise(r => setTimeout(r, 0));
      }
    }

    for (const track of newTracks) {
      await Data.saveTrack(track);
    }

    for (const m3u of m3uFiles) {
      await this.importM3U(m3u);
    }

    await this.rebuildIndexes();
    await Data.ensureAutoPlaylists();
    await Data.refreshAutoPlaylists();

    this.isScanning = false;
    window.dispatchEvent(new CustomEvent('scan-complete', { detail: { added: newTracks.length } }));
    return newTracks.length;
  },

  async processFile(file, path, hash) {
    return new Promise((resolve) => {
      const track = {
        id: Utils.generateId(),
        path: path,
        fileName: file.name,
        size: file.size,
        hash: hash,
        blob: file,
        favorite: false,
        rating: 0,
        playCount: 0,
        moods: [],
        dateAdded: Date.now()
      };

      const tempUrl = URL.createObjectURL(file);
      const audio = new Audio();
      audio.preload = 'metadata';

      const cleanup = () => { URL.revokeObjectURL(tempUrl); };

      audio.addEventListener('loadedmetadata', () => {
        track.duration = Math.round(audio.duration * 1000);
        audio.src = '';
        cleanup();
      }, { once: true });

      audio.addEventListener('error', () => {
        cleanup();
      }, { once: true });

      audio.src = tempUrl;

      if (window.jsmediatags) {
        jsmediatags.read(file, {
          onSuccess: (tag) => {
            const t = tag.tags;
            track.title = t.title || this.cleanFileName(file.name);
            track.artist = t.artist || 'Unknown Artist';
            track.albumArtist = t.albumArtist || t.artist || 'Unknown Artist';
            track.album = t.album || 'Unknown Album';
            track.genre = t.genre || '';
            track.year = t.year ? parseInt(t.year) : null;
            track.trackNumber = t.track ? parseInt(t.track) : null;
            track.comment = t.comment ? (t.comment.text || t.comment) : '';
            track.lyrics = t.lyrics ? (t.lyrics.lyrics || t.lyrics) : '';

            const featured = Utils.extractFeaturedArtists(track.title);
            if (featured.length > 0) {
              track.featuredArtists = featured;
              track.cleanTitle = Utils.removeFeaturedFromTitle(track.title);
            }

            if (t.picture) {
              const pic = t.picture;
              const blob = new Blob([new Uint8Array(pic.data)], { type: pic.format });
              track.artworkBlob = blob;
              const reader = new FileReader();
              reader.onloadend = () => {
                track.artwork = reader.result;
              };
              reader.readAsDataURL(blob);
            }

            if (SettingsManager.get('library.moodTagsEnabled') && track.comment) {
              const moodMatch = track.comment.match(/mood:\s*([^,]+)/i);
              if (moodMatch) track.moods.push(moodMatch[1].trim());
            }

            resolve(track);
          },
          onError: () => {
            track.title = this.cleanFileName(file.name);
            track.artist = 'Unknown Artist';
            track.album = 'Unknown Album';
            resolve(track);
          }
        });
      } else {
        track.title = this.cleanFileName(file.name);
        track.artist = 'Unknown Artist';
        track.album = 'Unknown Album';
        resolve(track);
      }
    });
  },

  async computeHash(file) {
    const buf = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buf.slice(0, Math.min(buf.byteLength, 65536)));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  cleanFileName(name) {
    return name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').trim();
  },

  async rebuildIndexes() {
    const tracks = await Data.getTracks();
    const albums = new Map();
    const artists = new Map();
    const genres = new Map();

    for (const track of tracks) {
      if (track.album) {
        const allowMultiple = SettingsManager.get('library.allowMultipleAlbums');
        const albumId = allowMultiple
          ? Utils.hashString(track.album + (track.albumArtist || track.artist || ''))
          : Utils.hashString(track.album);
        if (!albums.has(albumId)) {
          albums.set(albumId, {
            id: albumId,
            name: track.album,
            artist: track.albumArtist || track.artist || 'Unknown',
            year: track.year,
            tracks: [],
            dateAdded: Date.now()
          });
        }
        albums.get(albumId).tracks.push(track.id);
      }

      const allArtists = [...Utils.splitArtists(track.artist || '')];
      if (track.featuredArtists) allArtists.push(...track.featuredArtists);

      for (const artist of [...new Set(allArtists)]) {
        const artistId = Utils.hashString(artist);
        if (!artists.has(artistId)) {
          artists.set(artistId, {
            id: artistId,
            name: artist,
            tracks: [],
            albums: new Set(),
            dateAdded: Date.now()
          });
        }
        artists.get(artistId).tracks.push(track.id);
        if (track.album) artists.get(artistId).albums.add(track.album);
      }

      const genresList = Utils.splitGenres(track.genre || '');
      for (const genre of genresList) {
        const genreId = Utils.hashString(genre);
        if (!genres.has(genreId)) {
          genres.set(genreId, {
            id: genreId,
            name: genre,
            tracks: [],
            dateAdded: Date.now()
          });
        }
        genres.get(genreId).tracks.push(track.id);
      }
    }

    await Data.clear('albums');
    await Data.clear('artists');
    await Data.clear('genres');

    for (const album of albums.values()) await Data.put('albums', album);
    for (const [id, artist] of artists) {
      artist.albums = [...artist.albums];
      await Data.put('artists', artist);
    }
    for (const genre of genres.values()) await Data.put('genres', genre);
  },

  async importM3U(file) {
    const text = await file.text();
    const basePath = file.webkitRelativePath ? file.webkitRelativePath.replace(/\/[^\/]+$/, '') : '';
    const tracks = Utils.parseM3U(text, basePath);

    const existing = await Data.getTracks();
    for (const t of tracks) {
      if (existing.find(e => e.path === t.path)) continue;
      const track = {
        id: Utils.generateId(),
        path: t.path,
        title: t.title || this.cleanFileName(t.path.split('/').pop()),
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        duration: t.duration ? t.duration * 1000 : 0,
        favorite: false,
        rating: 0,
        playCount: 0,
        moods: [],
        dateAdded: Date.now(),
        isM3U: true
      };
      await Data.saveTrack(track);
    }
  },

  async exportM3U(playlistId) {
    const pl = await Data.getPlaylist(playlistId);
    if (!pl) return;
    const tracks = [];
    for (const tid of pl.tracks) {
      const t = await Data.getTrack(tid);
      if (t) tracks.push(t);
    }
    const m3u = Utils.generateM3U(tracks, pl.name);
    Utils.downloadFile(m3u, pl.name + '.m3u', 'audio/x-mpegurl');
  },

  abort() {
    if (this.abortController) this.abortController.abort();
    this.isScanning = false;
  }
};
