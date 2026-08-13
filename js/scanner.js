/* ========================================
   Okvy MusiQ - Library Scanner
   Scans local audio files and extracts metadata
   ======================================== */

const Scanner = (function() {
    'use strict';

    let isScanning = false;
    let scannedCount = 0;
    let listeners = {};

    function emit(event, data) {
        if (listeners[event]) {
            listeners[event].forEach(cb => {
                try { cb(data); } catch (e) { console.error(e); }
            });
        }
    }
    function on(event, cb) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(cb);
    }

    // Check if running in Capacitor native environment
    function isCapacitor() {
        return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
    }

    // Extract metadata using jsmediatags (loaded from CDN)
    function extractMetadata(file) {
        return new Promise((resolve) => {
            if (typeof jsmediatags === 'undefined') {
                // Fallback if library not loaded
                resolve({
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    artist: 'Unknown Artist',
                    album: 'Unknown Album',
                    cover: null
                });
                return;
            }

            jsmediatags.read(file, {
                onSuccess: (tag) => {
                    const tags = tag.tags || {};
                    let cover = null;

                    if (tags.picture) {
                        const pic = tags.picture;
                        const blob = new Blob([new Uint8Array(pic.data)], { type: pic.format });
                        cover = URL.createObjectURL(blob);
                    }

                    resolve({
                        title: tags.title || file.name.replace(/\.[^/.]+$/, ''),
                        artist: tags.artist || 'Unknown Artist',
                        album: tags.album || 'Unknown Album',
                        year: tags.year || '',
                        genre: tags.genre || '',
                        cover: cover
                    });
                },
                onError: () => {
                    resolve({
                        title: file.name.replace(/\.[^/.]+$/, ''),
                        artist: 'Unknown Artist',
                        album: 'Unknown Album',
                        cover: null
                    });
                }
            });
        });
    }

    // Process a single file
    async function processFile(file) {
        try {
            const metadata = await extractMetadata(file);
            const objectUrl = URL.createObjectURL(file);

            // Get duration
            const duration = await getAudioDuration(objectUrl);

            return {
                id: 'track_' + Utils.generateId(),
                title: metadata.title,
                artist: metadata.artist,
                album: metadata.album,
                year: metadata.year,
                genre: metadata.genre,
                duration: duration,
                cover: metadata.cover,
                url: objectUrl,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                addedAt: Date.now()
            };
        } catch (e) {
            console.error('Process file error:', e);
            return null;
        }
    }

    function getAudioDuration(url) {
        return new Promise((resolve) => {
            const audio = new Audio();
            audio.preload = 'metadata';
            audio.src = url;

            const cleanup = () => {
                audio.src = '';
                URL.revokeObjectURL(url);
            };

            audio.addEventListener('loadedmetadata', () => {
                const dur = isFinite(audio.duration) ? audio.duration : 0;
                cleanup();
                resolve(Math.round(dur));
            });

            audio.addEventListener('error', () => {
                cleanup();
                resolve(0);
            });

            // Timeout fallback
            setTimeout(() => {
                cleanup();
                resolve(0);
            }, 5000);
        });
    }

    // Main scan function for web file input
    async function scanFiles(fileList) {
        if (isScanning) return;
        isScanning = true;
        scannedCount = 0;
        emit('scanStart', { total: fileList.length });

        const tracks = [];
        const batchSize = CONFIG.ui.scanBatchSize;

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];

            // Skip non-audio files
            const isAudio = CONFIG.audio.supportedFormats.some(fmt => 
                file.type.includes(fmt.replace('audio/', '')) ||
                file.name.match(/\.(mp3|wav|ogg|flac|aac|m4a|wma)$/i)
            );

            if (!isAudio) continue;

            const track = await processFile(file);
            if (track) {
                tracks.push(track);
                scannedCount++;
                emit('scanProgress', { current: scannedCount, total: fileList.length, track: track });
            }

            // Yield to UI every batch
            if (i % batchSize === 0) {
                await new Promise(r => setTimeout(r, 10));
            }
        }

        isScanning = false;
        emit('scanComplete', { tracks: tracks, count: tracks.length });
        return tracks;
    }

    // Scan folder using webkitdirectory
    function scanFolder(inputElement) {
        return new Promise((resolve) => {
            if (!inputElement || !inputElement.files) {
                resolve([]);
                return;
            }
            scanFiles(inputElement.files).then(tracks => resolve(tracks));
        });
    }

    // Save scanned library to storage
    function saveLibrary(tracks) {
        try {
            // Store minimal data (URLs can't be serialized, so we store metadata only)
            // For actual playback, user needs to re-scan or we keep object URLs in memory
            const storable = tracks.map(t => ({
                id: t.id,
                title: t.title,
                artist: t.artist,
                album: t.album,
                year: t.year,
                genre: t.genre,
                duration: t.duration,
                fileName: t.fileName,
                fileSize: t.fileSize,
                fileType: t.fileType,
                addedAt: t.addedAt
            }));

            Utils.setStorage(CONFIG.storage.library, storable);
            Utils.setStorage(CONFIG.storage.libraryVersion, Date.now());
            return true;
        } catch (e) {
            console.error('Save library error:', e);
            return false;
        }
    }

    // Load library metadata (without URLs — user must re-scan to play)
    function loadLibraryMeta() {
        try {
            return Utils.getStorage(CONFIG.storage.library, []);
        } catch (e) {
            return [];
        }
    }

    function isScanningNow() {
        return isScanning;
    }

    return {
        scanFiles,
        scanFolder,
        extractMetadata,
        saveLibrary,
        loadLibraryMeta,
        isScanningNow,
        isCapacitor,
        on
    };
})();
