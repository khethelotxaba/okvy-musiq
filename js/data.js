const DB_NAME = 'OkvyMusiQ';
const DB_VERSION = 3;

const Data = {
  db: null,

  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => { this.db = req.result; resolve(); };
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('tracks')) db.createObjectStore('tracks', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('albums')) db.createObjectStore('albums', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('artists')) db.createObjectStore('artists', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('genres')) db.createObjectStore('genres', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('playlists')) db.createObjectStore('playlists', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('history')) db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('queue')) db.createObjectStore('queue', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('folders')) db.createObjectStore('folders', { keyPath: 'path' });
        if (!db.objectStoreNames.contains('stats')) db.createObjectStore('stats', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('moods')) db.createObjectStore('moods', { keyPath: 'id' });
      };
    });
  },

  async put(store, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async get(store, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async getAll(store) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async delete(store, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async clear(store) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  // Tracks
  async saveTrack(track) {
    const existing = await this.get('tracks', track.id);
    if (existing) track = { ...existing, ...track, dateModified: Date.now() };
    else track.dateAdded = track.dateAdded || Date.now();
    await this.put('tracks', track);
  },

  async getTracks() { return this.getAll('tracks'); },
  async getTrack(id) { return this.get('tracks', id); },
  async deleteTrack(id) { return this.delete('tracks', id); },

  // Playlists
  async createPlaylist(name, tracks = [], auto = false, type = 'user') {
    const id = Utils.generateId();
    const pl = { id, name, tracks, type, auto, dateCreated: Date.now(), dateModified: Date.now() };
    await this.put('playlists', pl);
    return pl;
  },

  async getPlaylists() { return this.getAll('playlists'); },
  async savePlaylist(pl) { pl.dateModified = Date.now(); await this.put('playlists', pl); },
  async getPlaylist(id) { return this.get('playlists', id); },
  async updatePlaylist(pl) { pl.dateModified = Date.now(); await this.put('playlists', pl); },
  async deletePlaylist(id) { return this.delete('playlists', id); },

  // History
  async addHistoryEntry(trackId, duration, position, completed) {
    const entry = {
      trackId, duration, position, completed,
      timestamp: Date.now(),
      date: new Date().toISOString(),
      week: Utils.getWeekNumber(new Date()),
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    };
    await this.put('history', entry);
    await this.updateTrackStats(trackId, duration);
  },

  async getHistory() { return this.getAll('history'); },

  async getTrackStats(trackId) {
    const all = await this.getAll('history');
    const entries = all.filter(h => h.trackId === trackId);
    return {
      playCount: entries.length,
      totalTime: entries.reduce((s, e) => s + (e.duration || 0), 0),
      lastPlayed: entries.length > 0 ? Math.max(...entries.map(e => e.timestamp)) : 0
    };
  },

  async updateTrackStats(trackId, duration) {
    const stats = await this.get('stats', trackId) || { trackId, playCount: 0, totalTime: 0 };
    stats.playCount = (stats.playCount || 0) + 1;
    stats.totalTime = (stats.totalTime || 0) + (duration || 0);
    stats.lastPlayed = Date.now();
    await this.put('stats', stats);
  },

  async getMostPlayed(limit = 50) {
    const stats = await this.getAll('stats');
    return stats.sort((a,b) => (b.playCount || 0) - (a.playCount || 0)).slice(0, limit);
  },

  async getTotalListenTime() {
    const stats = await this.getAll('stats');
    return stats.reduce((s, st) => s + (st.totalTime || 0), 0);
  },

  async getLostMemories() {
    const now = new Date();
    const yearsBack = SettingsManager.get('smart.lostMemoriesYearsBack') || [1,2,3];
    const history = await this.getAll('history');
    const memories = [];
    yearsBack.forEach(years => {
      const targetDate = new Date(now);
      targetDate.setFullYear(targetDate.getFullYear() - years);
      const windowStart = targetDate.getTime() - 7 * 86400000;
      const windowEnd = targetDate.getTime() + 7 * 86400000;
      const found = history.filter(h => h.timestamp >= windowStart && h.timestamp <= windowEnd);
      memories.push(...found);
    });
    const trackIds = [...new Set(memories.map(m => m.trackId))];
    const tracks = await this.getTracks();
    return trackIds.map(id => tracks.find(t => t.id === id)).filter(Boolean);
  },

  // Queue
  async saveQueue(queue, index, position) {
    await this.put('queue', { key: 'current', queue, index, position, timestamp: Date.now() });
  },

  async loadQueue() {
    return this.get('queue', 'current');
  },

  // Folders
  async saveFolder(folder) { await this.put('folders', folder); },
  async getFolders() { return this.getAll('folders'); },
  async deleteFolder(path) { return this.delete('folders', path); },

  // Moods
  async addMood(mood) {
    const id = Utils.generateId();
    await this.put('moods', { id, ...mood, dateCreated: Date.now() });
    return id;
  },
  async getMoods() { return this.getAll('moods'); },
  async deleteMood(id) { return this.delete('moods', id); },

  // Auto playlists
  async ensureAutoPlaylists() {
    const playlists = await this.getPlaylists();
    if (!playlists.find(p => p.type === 'most-played')) {
      await this.createPlaylist('Most Played', [], true, 'most-played');
    }
    if (!playlists.find(p => p.type === 'lost-memories')) {
      await this.createPlaylist('Lost Memories', [], true, 'lost-memories');
    }
    if (!playlists.find(p => p.type === 'smort')) {
      await this.createPlaylist('Smort Mix', [], true, 'smort');
    }
  },

  async refreshAutoPlaylists() {
    const playlists = await this.getPlaylists();
    for (const pl of playlists) {
      if (!pl.auto) continue;
      if (pl.type === 'most-played') {
        if (!SettingsManager.get('smart.mostPlayedAutoUpdate')) continue;
        const minPlays = SettingsManager.get('smart.mostPlayedMinPlays') || 1;
        const maxTracks = SettingsManager.get('smart.mostPlayedMaxTracks') || 50;
        const mostPlayed = (await this.getMostPlayed(500)).filter(s => (s.playCount || 0) >= minPlays).slice(0, maxTracks);
        const tracks = await this.getTracks();
        pl.tracks = mostPlayed.map(stat => {
          const t = tracks.find(tr => tr.id === stat.trackId);
          return t ? t.id : null;
        }).filter(Boolean);
        await this.updatePlaylist(pl);
      } else if (pl.type === 'lost-memories') {
        if (!SettingsManager.get('smart.lostMemoriesEnabled')) {
          pl.tracks = [];
          await this.updatePlaylist(pl);
          continue;
        }
        const memories = await this.getLostMemories();
        pl.tracks = memories.map(t => t.id);
        await this.updatePlaylist(pl);
      }
    }
  },

  // Smort generation
  async generateSmort(seedTrackId) {
    const tracks = await this.getTracks();
    const seed = tracks.find(t => t.id === seedTrackId);
    if (!seed) return [];
    const criteria = SettingsManager.get('smart.smortCriteria');
    const scores = new Map();
    const history = await this.getAll('history');
    const stats = await this.getAll('stats');

    tracks.forEach(t => {
      if (t.id === seedTrackId) return;
      let score = 0;

      if (criteria.samePeriod) {
        const seedHistory = history.filter(h => h.trackId === seedTrackId);
        const tHistory = history.filter(h => h.trackId === t.id);
        const commonWeeks = new Set(seedHistory.map(h => h.week)).intersection(new Set(tHistory.map(h => h.week)));
        score += commonWeeks.size * 10;
      }

      if (criteria.sameEra && seed.year && t.year) {
        score += Math.max(0, 5 - Math.abs(seed.year - t.year)) * 3;
      }

      if (criteria.ratings) {
        const seedStat = stats.find(s => s.trackId === seedTrackId);
        const tStat = stats.find(s => s.trackId === t.id);
        if (seedStat && tStat) {
          score += Math.min(seedStat.playCount, tStat.playCount) * 2;
        }
      }

      if (criteria.moods && seed.moods && t.moods) {
        const common = seed.moods.filter(m => t.moods.includes(m));
        score += common.length * 15;
      }

      if (seed.genre && t.genre) {
        const sg = Utils.splitGenres(seed.genre);
        const tg = Utils.splitGenres(t.genre);
        const commonG = sg.filter(g => tg.includes(g));
        score += commonG.length * 8;
      }

      if (seed.artist && t.artist) {
        const sa = Utils.splitArtists(seed.artist);
        const ta = Utils.splitArtists(t.artist);
        const commonA = sa.filter(a => ta.includes(a));
        score += commonA.length * 6;
      }

      score += Math.random() * (criteria.random || 0.2) * 20;
      scores.set(t.id, score);
    });

    const sorted = [...scores.entries()].sort((a,b) => b[1] - a[1]).slice(0, 30);
    return sorted.map(([id]) => tracks.find(t => t.id === id)).filter(Boolean);
  },

  // Search with filters
  async searchTracks(query, filters = {}) {
    let tracks = await this.getTracks();
    if (query) {
      const q = query.toLowerCase();
      tracks = tracks.filter(t => 
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.artist && t.artist.toLowerCase().includes(q)) ||
        (t.album && t.album.toLowerCase().includes(q)) ||
        (t.genre && t.genre.toLowerCase().includes(q))
      );
    }
    if (filters.artist) tracks = tracks.filter(t => t.artist === filters.artist);
    if (filters.album) tracks = tracks.filter(t => t.album === filters.album);
    if (filters.genre) tracks = tracks.filter(t => t.genre && t.genre.includes(filters.genre));
    if (filters.yearMin) tracks = tracks.filter(t => (t.year || 0) >= filters.yearMin);
    if (filters.yearMax) tracks = tracks.filter(t => (t.year || 9999) <= filters.yearMax);
    if (filters.minDuration) tracks = tracks.filter(t => (t.duration || 0) >= filters.minDuration);
    if (filters.maxDuration) tracks = tracks.filter(t => (t.duration || Infinity) <= filters.maxDuration);
    if (filters.minPlays) {
      const stats = await this.getAll('stats');
      tracks = tracks.filter(t => {
        const s = stats.find(st => st.trackId === t.id);
        return (s?.playCount || 0) >= filters.minPlays;
      });
    }
    if (filters.mood) tracks = tracks.filter(t => t.moods && t.moods.includes(filters.mood));
    if (filters.favorite) tracks = tracks.filter(t => t.favorite);
    if (filters.recentDays) {
      const cutoff = Date.now() - filters.recentDays * 86400000;
      tracks = tracks.filter(t => (t.dateAdded || 0) >= cutoff);
    }
    return tracks;
  },

  // Unified library search. Returns normalized track results so the UI can use one renderer.
  async search(query, type = 'all', options = {}) {
    const raw = String(query || '').trim();
    if (!raw) return [];

    const normalize = (value) => String(value ?? '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

    const tokens = normalize(raw).split(/\s+/).filter(Boolean);
    const levenshtein = (a, b) => {
      if (a === b) return 0;
      if (!a) return b.length;
      if (!b) return a.length;
      let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
      for (let i = 0; i < a.length; i++) {
        const cur = [i + 1];
        for (let j = 0; j < b.length; j++) {
          cur[j + 1] = Math.min(
            cur[j] + 1,
            prev[j + 1] + 1,
            prev[j] + (a[i] === b[j] ? 0 : 1)
          );
        }
        prev = cur;
      }
      return prev[b.length];
    };

    const scoreText = (value, weight = 1) => {
      const text = normalize(value);
      if (!text) return 0;
      let score = 0;
      if (text === normalize(raw)) score += 100 * weight;
      if (text.startsWith(normalize(raw))) score += 70 * weight;
      if (text.includes(normalize(raw))) score += 45 * weight;
      const words = text.split(/\s+/);
      tokens.forEach(token => {
        if (words.includes(token)) score += 32 * weight;
        else if (words.some(word => word.startsWith(token))) score += 22 * weight;
        else if (words.some(word => word.includes(token))) score += 14 * weight;
        else if (words.some(word => token.length >= 3 && levenshtein(word, token) <= Math.max(1, Math.floor(token.length / 4)))) score += 6 * weight;
      });
      return score;
    };

    const tracks = await this.getTracks();
    const stats = await this.getAll('stats');
    const statMap = new Map(stats.map(s => [s.trackId || s.key, s]));
    const requested = ['all','tracks','albums','artists','playlists'].includes(type) ? type : 'all';
    const includeTrackSearch = requested === 'all' || requested === 'tracks' || requested === 'albums' || requested === 'artists' || requested === 'playlists';

    if (!includeTrackSearch) return [];

    const matchingIds = new Set();

    if (requested === 'tracks' || requested === 'all') {
      tracks.forEach(t => {
        const score =
          scoreText(t.title, 5) +
          scoreText(t.cleanTitle, 4) +
          scoreText(t.artist, 3.5) +
          scoreText(t.albumArtist, 3) +
          scoreText(t.album, 3) +
          scoreText(t.genre, 1.5) +
          scoreText(t.fileName, 1.3) +
          scoreText(t.comment, 0.8) +
          scoreText(t.moods, 0.8) +
          (Array.isArray(t.featuredArtists) ? t.featuredArtists.reduce((sum, a) => sum + scoreText(a, 2.5), 0) : 0);
        if (score > 0) matchingIds.add(t.id);
        t.__searchScore = score;
      });
    }

    if (requested === 'albums' || requested === 'artists' || requested === 'all' || requested === 'playlists') {
      const albums = await this.getAll('albums');
      const artists = await this.getAll('artists');
      const playlists = await this.getAll('playlists');

      const entityTracks = new Map();
      const addEntityTracks = (ids) => ids.forEach(id => matchingIds.add(id));

      if (requested === 'albums' || requested === 'all') {
        albums.forEach(a => {
          const score = scoreText(a.name, 5) + scoreText(a.artist, 2.5);
          if (score > 0) {
            addEntityTracks(Array.isArray(a.tracks) ? a.tracks : []);
            entityTracks.set(a.name, { kind: 'album', score });
          }
        });
      }
      if (requested === 'artists' || requested === 'all') {
        artists.forEach(a => {
          const score = scoreText(a.name, 5);
          if (score > 0) {
            addEntityTracks(Array.isArray(a.tracks) ? a.tracks : []);
            entityTracks.set(a.name, { kind: 'artist', score });
          }
        });
      }
      if (requested === 'playlists' || requested === 'all') {
        playlists.forEach(pl => {
          const score = scoreText(pl.name, 5);
          if (score > 0) {
            addEntityTracks(Array.isArray(pl.tracks) ? pl.tracks : []);
            entityTracks.set(pl.name, { kind: 'playlist', score });
          }
        });
      }
    }

    let results = tracks.filter(t => matchingIds.has(t.id));
    results.forEach(t => {
      const stat = statMap.get(t.id);
      t.__searchScore = t.__searchScore || 0;
      if (stat?.lastPlayed) t.__searchScore += 2;
      if (t.favorite) t.__searchScore += 1;
      if (t.title && normalize(t.title) === normalize(raw)) t.__searchScore += 25;
    });

    results.sort((a,b) => {
      const scoreDiff = (b.__searchScore || 0) - (a.__searchScore || 0);
      if (scoreDiff) return scoreDiff;
      return String(a.title || '').localeCompare(String(b.title || ''));
    });

    const limit = Number(options.limit) > 0 ? Number(options.limit) : 100;
    results = results.slice(0, limit);
    results.forEach(t => delete t.__searchScore);
    return results;
  },

  // Clear all
  async clearLibrary() {
    await this.clear('tracks');
    await this.clear('albums');
    await this.clear('artists');
    await this.clear('genres');
    await this.clear('folders');
    await this.clear('moods');
  }
};
