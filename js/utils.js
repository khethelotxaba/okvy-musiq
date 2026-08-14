const Utils = {
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + String(s).padStart(2, '0');
  },

  formatDuration(ms) {
    if (!ms) return '0:00';
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const remM = m % 60;
    const remS = s % 60;
    if (h > 0) return `${h}:${String(remM).padStart(2,'0')}:${String(remS).padStart(2,'0')}`;
    return `${remM}:${String(remS).padStart(2,'0')}`;
  },

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  throttle(fn, ms) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= ms) { last = now; fn.apply(this, args); }
    };
  },

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
  },

  hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      h = ((h << 5) - h) + c;
      h |= 0;
    }
    return Math.abs(h).toString(16);
  },

  async extractColors(imgSrc) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 64; canvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;
        const colors = [];
        const counts = {};
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i], g = data[i+1], b = data[i+2];
          const key = `${Math.round(r/16)*16},${Math.round(g/16)*16},${Math.round(b/16)*16}`;
          counts[key] = (counts[key] || 0) + 1;
        }
        const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, 5);
        const result = sorted.map(([k]) => { const [r,g,b] = k.split(',').map(Number); return `rgb(${r},${g},${b})`; });
        resolve({ dominant: result[0] || '#d4af37', palette: result, vibrant: result[1] || '#c9a227' });
      };
      img.onerror = () => resolve({ dominant: '#d4af37', palette: ['#d4af37'], vibrant: '#c9a227' });
      img.src = imgSrc;
    });
  },

  getContrastColor(rgbStr) {
    const m = rgbStr.match(/\d+/g);
    if (!m) return '#ffffff';
    const [r,g,b] = m.map(Number);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return yiq >= 128 ? '#0a0a0a' : '#ffffff';
  },

    getLuminance(rgbStr) {
    const m = rgbStr.match(/\d+/g);
    if (!m) return 0;
    const [r, g, b] = m.map(Number);
    const rs = r / 255, gs = g / 255, bs = b / 255;
    const rl = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    const gl = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    const bl = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
  },

  pickSmartTint(palette, isDark) {
    if (!palette || palette.length === 0) return null;
    const scored = palette.map(color => {
      const lum = this.getLuminance(color);
      const m = color.match(/\d+/g).map(Number);
      const max = Math.max(...m), min = Math.min(...m);
      const saturation = max === 0 ? 0 : (max - min) / max;
      return { color, lum, saturation };
    });
    const colorful = scored.filter(s => s.saturation > 0.12);
    const candidates = colorful.length > 0 ? colorful : scored;
    if (isDark) {
      candidates.sort((a, b) => (b.lum * 0.6 + b.saturation * 0.4) - (a.lum * 0.6 + a.saturation * 0.4));
    } else {
      candidates.sort((a, b) => ((1 - b.lum) * 0.6 + b.saturation * 0.4) - ((1 - a.lum) * 0.6 + a.saturation * 0.4));
    }
    return candidates[0].color;
  },

  splitArtists(str) {
    if (!str) return [];
    const seps = SettingsManager.get('library.artistSeparators') || [';', '/', ','];
    let artists = [str];
    seps.forEach(sep => {
      artists = artists.flatMap(a => a.split(sep).map(s => s.trim()).filter(Boolean));
    });
    return [...new Set(artists)];
  },

  splitGenres(str) {
    if (!str) return [];
    const seps = SettingsManager.get('library.genreSeparators') || [';', '/', ','];
    let genres = [str];
    seps.forEach(sep => {
      genres = genres.flatMap(g => g.split(sep).map(s => s.trim()).filter(Boolean));
    });
    return [...new Set(genres)];
  },

  extractFeaturedArtists(title) {
    if (!title || !SettingsManager.get('library.extractFeaturedArtists')) return [];
    const pattern = SettingsManager.get('library.featuredArtistPattern');
    const match = title.match(pattern);
    if (!match) return [];
    return match[1].split(/,|&|and/i).map(s => s.trim()).filter(Boolean);
  },

  removeFeaturedFromTitle(title) {
    if (!title) return '';
    return title.replace(/[\(\[](?:feat\.?|ft\.?|featuring)\s+[^\)\]]+[\)\]]/i, '').trim();
  },

  parseM3U(content, basePath) {
    const lines = content.split(/\r?\n/);
    const tracks = [];
    let current = {};
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('#EXTINF:')) {
        const meta = line.substring(8);
        const commaIdx = meta.indexOf(',');
        current.title = meta.substring(commaIdx + 1).trim();
        const durMatch = meta.match(/^(\d+)/);
        if (durMatch) current.duration = parseInt(durMatch[1]);
      } else if (line.startsWith('#EXTALBUMARTURL:')) {
        current.albumArt = line.substring(16).trim();
      } else if (line && !line.startsWith('#')) {
        current.path = line;
        if (!line.startsWith('http') && basePath) {
          current.path = basePath + '/' + line;
        }
        tracks.push({...current});
        current = {};
      }
    });
    return tracks;
  },

  generateM3U(tracks, name) {
    let m3u = '#EXTM3U\n';
    m3u += `#PLAYLIST:${name}\n`;
    tracks.forEach(t => {
      const dur = t.duration ? Math.floor(t.duration / 1000) : -1;
      m3u += `#EXTINF:${dur},${t.title || 'Unknown'}\n`;
      if (t.albumArt) m3u += `#EXTALBUMARTURL:${t.albumArt}\n`;
      m3u += `${t.path}\n`;
    });
    return m3u;
  },

  downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  vibrate(pattern) {
    const mode = SettingsManager.get('ui.vibrationMode');
    if (mode === 'none' || !navigator.vibrate) return;
    try { navigator.vibrate(pattern); } catch(e) {}
  },

  getAudioPeaks(audioBuffer, samples = 200) {
    const raw = audioBuffer.getChannelData(0);
    const block = Math.floor(raw.length / samples);
    const peaks = [];
    for (let i = 0; i < samples; i++) {
      let max = 0;
      for (let j = 0; j < block; j++) {
        const v = Math.abs(raw[i * block + j]);
        if (v > max) max = v;
      }
      peaks.push(max);
    }
    return peaks;
  },

  lrcParse(lrcText) {
    const lines = [];
    const regex = /\[(\d+):(\d+\.?\d*)\](.*)/g;
    let m;
    while ((m = regex.exec(lrcText)) !== null) {
      lines.push({
        time: parseInt(m[1]) * 60 + parseFloat(m[2]),
        text: m[3].trim()
      });
    }
    return lines.sort((a,b) => a.time - b.time);
  },

  ttmlParse(ttmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(ttmlText, 'text/xml');
    const lines = [];
    const ps = doc.querySelectorAll('p');
    ps.forEach(p => {
      const begin = p.getAttribute('begin');
      if (begin) {
        const parts = begin.split(':').map(parseFloat);
        const time = parts[0] * 3600 + parts[1] * 60 + parts[2];
        lines.push({ time, text: p.textContent.trim() });
      }
    });
    return lines.sort((a,b) => a.time - b.time);
  },

  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  },

  clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
};
