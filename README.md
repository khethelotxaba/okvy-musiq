# Okvy MusiQ

A premium music player PWA with a Telegram-inspired glassmorphism UI. Built with vanilla JavaScript, featuring a Black, Gold & White theme.

![Theme](https://img.shields.io/badge/Theme-Black%20%7C%20Gold%20%7C%20White-0a0a0a?style=for-the-badge&labelColor=d4a843)
![PWA](https://img.shields.io/badge/PWA-Ready-0a0a0a?style=for-the-badge&labelColor=d4a843)

## Features

- **Glassmorphism UI** — Frosted glass panels with backdrop blur
- **Telegram-inspired Design** — Rounded corners everywhere, smooth transitions
- **Audio Player** — Play, pause, skip, shuffle, repeat, seek
- **Playlists** — Create and manage custom playlists
- **Favorites** — Save your favorite tracks
- **Search** — Find songs, artists, and albums instantly
- **Responsive** — Works on mobile, tablet, and desktop
- **PWA** — Install as a standalone app on any device
- **Offline Ready** — Service worker included
- **Keyboard Shortcuts** — Space to play/pause, Ctrl+Arrow to skip

## Tech Stack

- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks, no build step required
- Modular architecture with separate files
- Comprehensive error handling and recovery

## File Structure

```
okvy-musiq/
├── index.html              # Main entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── css/
│   └── styles.css          # All styling (glassmorphism, animations)
├── js/
│   ├── config.js           # App config & demo data
│   ├── utils.js            # Utilities & safe wrappers
│   ├── data.js             # State management & storage
│   ├── player.js           # Audio engine
│   ├── ui.js               # DOM rendering & updates
│   └── app.js              # Main app bootstrap
├── assets/
│   └── icons/              # PWA icons (72x72 to 512x512)
└── README.md
```

## GitHub Setup Instructions

### 1. Create the Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **New Repository** (green button)
3. Name it: `okvy-musiq`
4. Set it to **Public**
5. Do NOT initialize with README (we already have one)
6. Click **Create repository**

### 2. Upload the Files

**Option A: Using Git (Recommended)**

```bash
# Clone your new repo
git clone https://github.com/YOUR_USERNAME/okvy-musiq.git
cd okvy-musiq

# Copy all project files into this folder
# (index.html, manifest.json, sw.js, css/, js/, assets/)

# Add, commit, push
git add .
git commit -m "Initial commit: Okvy MusiQ v2.0"
git push origin main
```

**Option B: Drag & Drop (Easier)**

1. On your repo page, click **"uploading an existing file"**
2. Drag and drop ALL files/folders from this project
3. Click **Commit changes**

### 3. Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Select branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/okvy-musiq`

### 4. Generate PWA Icons

You need icons in these sizes: 72, 96, 128, 144, 152, 192, 384, 512 px.

**Option A: Use a generator**
- Go to [favicon.io](https://favicon.io/) or [pwa-asset-generator](https://github.com/onderceylan/pwa-asset-generator)
- Upload your logo (black background with gold icon works best)
- Download the package and place files in `assets/icons/`

**Option B: Create simple ones**
```bash
# If you have ImageMagick installed
convert -size 512x512 xc:black -pointsize 200 -fill '#d4a843' -gravity center -annotate +0+0 "♪" assets/icons/icon-512.png
# Then resize for other sizes
```

### 5. Test the PWA

1. Open the GitHub Pages URL in Chrome/Edge
2. Open DevTools → **Lighthouse** → Run audit
3. Check **PWA** category — aim for 100%
4. On mobile, you should see "Add to Home Screen" prompt

## Customization

### Changing Colors

Edit `css/styles.css`:
```css
:root {
    --gold-primary: #d4a843;    /* Main accent */
    --gold-light: #e8c87a;    /* Hover states */
    --gold-dark: #b8922e;      /* Shadows/gradients */
}
```

### Adding Your Own Music

Edit `js/config.js` → `demoTracks` array:
```javascript
{
    id: 'your-song-id',
    title: 'Song Name',
    artist: 'Artist Name',
    album: 'Album Name',
    duration: 180,  // seconds
    cover: 'https://your-image-url.jpg',
    url: 'https://your-audio-file.mp3'
}
```

**Note:** For production, host audio files on a CDN or your own server. GitHub Pages has a 1GB repo limit.

### Connecting to a Real Backend

Replace `Data.init()` in `js/data.js` to fetch from your API:
```javascript
async function init() {
    const res = await fetch('https://your-api.com/tracks');
    state.tracks = await res.json();
    // ... rest of init
}
```

## Building as APK (Android)

### Option 1: Trusted Web Activity (Recommended)

1. Go to [PWABuilder](https://www.pwabuilder.com/)
2. Enter your GitHub Pages URL
3. Click **Start**
4. Download the **Android** package
5. Install the `.apk` on your device

### Option 2: Capacitor (More Control)

```bash
npm install @capacitor/core @capacitor/cli
npx cap init okvy-musiq com.yourname.okvymusiq --web-dir .
npx cap add android
npx cap open android
# Build APK in Android Studio
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `Ctrl + →` | Next track |
| `Ctrl + ←` | Previous track |

## Browser Support

- Chrome / Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 15+)
- Samsung Internet: Full support

## License

MIT — feel free to use, modify, and distribute.

---

Built with passion. Black, Gold & White forever.
