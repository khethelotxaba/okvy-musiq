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

  clamp(val, min, max) { return Math.min(Math.max(val, min), max); },

  md5(inputString) {
    const hc = '0123456789abcdef';
    function rh(n) { let j, s = ''; for (j = 0; j <= 3; j++) s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) + hc.charAt((n >> (j * 8)) & 0x0F); return s; }
    function ad(x, y) { const l = (x & 0xFFFF) + (y & 0xFFFF); const m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
    function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
    function cm(q, a, b, x, s, t) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cm((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cm((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cm(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cm(c ^ (b | (~d)), a, b, x, s, t); }
    function sb(x) {
      let i; const nblk = ((x.length + 8) >> 6) + 1; const blks = new Array(nblk * 16); for (i = 0; i < nblk * 16; i++) blks[i] = 0;
      for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
      blks[i >> 2] |= 0x80 << ((i % 4) * 8); blks[nblk * 16 - 2] = x.length * 8; return blks;
    }
    let i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
    for (i = 0; i < x.length; i += 16) {
      olda = a; oldb = b; oldc = c; oldd = d;
      a = ff(a, b, c, d, x[i + 0], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819); b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426); c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = ff(a, b, c, d, x[i + 8], 7, 1770035416); d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290); b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632); c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = gg(a, b, c, d, x[i + 5], 5, -701558691); d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961); b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784); c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = hh(a, b, c, d, x[i + 5], 4, -378558); d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632); b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i + 0], 11, -358537222); c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = hh(a, b, c, d, x[i + 9], 4, -640364487); d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = ii(a, b, c, d, x[i + 0], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905); b = ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606); c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = ii(a, b, c, d, x[i + 8], 6, 1873313359); d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259); b = ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = ad(a, olda); b = ad(b, oldb); c = ad(c, oldc); d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
  }
};
