/* ========================================
   Okvy MusiQ - Audio Player Engine
   ======================================== */

const Player = (function() {
    'use strict';

    let audio = null;
    let isReady = false;
    let updateInterval = null;
    let listeners = {};

    // Safe event emitter
    function emit(event, data) {
        if (listeners[event]) {
            listeners[event].forEach(cb => {
                try {
                    cb(data);
                } catch (e) {
                    console.error('Player event listener error:', e);
                }
            });
        }
    }

    function on(event, callback) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
        return () => off(event, callback);
    }

    function off(event, callback) {
        if (listeners[event]) {
            listeners[event] = listeners[event].filter(cb => cb !== callback);
        }
    }

    // Initialize audio element
    function init() {
        try {
            if (audio) {
                audio.pause();
                audio.src = '';
                audio = null;
            }

            audio = new Audio();
            audio.preload = CONFIG.audio.preload;
            audio.crossOrigin = CONFIG.audio.crossOrigin;
            audio.volume = Data.getState().volume;

            // Bind events with error recovery
            audio.addEventListener('loadedmetadata', () => {
                emit('loadedmetadata', { duration: audio.duration });
            });

            audio.addEventListener('timeupdate', () => {
                emit('timeupdate', { currentTime: audio.currentTime, duration: audio.duration });
            });

            audio.addEventListener('ended', () => {
                emit('ended');
            });

            audio.addEventListener('play', () => {
                emit('play');
            });

            audio.addEventListener('pause', () => {
                emit('pause');
            });

            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                emit('error', { message: 'Failed to load audio', original: e });
            });

            audio.addEventListener('waiting', () => {
                emit('waiting');
            });

            audio.addEventListener('canplay', () => {
                emit('canplay');
            });

            isReady = true;
            return true;
        } catch (e) {
            console.error('Player.init failed:', e);
            isReady = false;
            return false;
        }
    }

    function loadTrack(track) {
        if (!isReady || !audio || !track) {
            console.warn('Player not ready or no track provided');
            return false;
        }
        try {
            audio.src = track.url;
            audio.load();
            return true;
        } catch (e) {
            console.error('Player.loadTrack error:', e);
            emit('error', { message: 'Failed to load track', original: e });
            return false;
        }
    }

    function play() {
        if (!isReady || !audio) return Promise.resolve(false);
        try {
            const promise = audio.play();
            if (promise && typeof promise.then === 'function') {
                return promise.then(() => true).catch(e => {
                    console.warn('Audio play prevented:', e);
                    emit('error', { message: 'Playback blocked. Tap to play.', original: e });
                    return false;
                });
            }
            return Promise.resolve(true);
        } catch (e) {
            console.error('Player.play error:', e);
            return Promise.resolve(false);
        }
    }

    function pause() {
        if (!isReady || !audio) return;
        try {
            audio.pause();
        } catch (e) {
            console.error('Player.pause error:', e);
        }
    }

    function toggle() {
        if (!isReady || !audio) return Promise.resolve(false);
        if (audio.paused) {
            return play();
        } else {
            pause();
            return Promise.resolve(true);
        }
    }

    function seek(time) {
        if (!isReady || !audio || !isFinite(time)) return false;
        try {
            audio.currentTime = Utils.clamp(time, 0, audio.duration || 0);
            return true;
        } catch (e) {
            console.error('Player.seek error:', e);
            return false;
        }
    }

    function seekPercent(percent) {
        if (!isReady || !audio) return false;
        try {
            const duration = audio.duration || 0;
            if (duration > 0) {
                return seek(duration * (percent / 100));
            }
        } catch (e) {
            console.error('Player.seekPercent error:', e);
        }
        return false;
    }

    function setVolume(vol) {
        if (!isReady || !audio) return false;
        try {
            const clamped = Utils.clamp(vol, 0, 1);
            audio.volume = clamped;
            Data.setVolume(clamped);
            return true;
        } catch (e) {
            console.error('Player.setVolume error:', e);
            return false;
        }
    }

    function getCurrentTime() {
        if (!isReady || !audio) return 0;
        try {
            return audio.currentTime || 0;
        } catch (e) {
            return 0;
        }
    }

    function getDuration() {
        if (!isReady || !audio) return 0;
        try {
            return audio.duration || 0;
        } catch (e) {
            return 0;
        }
    }

    function isPaused() {
        if (!isReady || !audio) return true;
        try {
            return audio.paused;
        } catch (e) {
            return true;
        }
    }

    function getProgressPercent() {
        const duration = getDuration();
        if (duration <= 0) return 0;
        return (getCurrentTime() / duration) * 100;
    }

    function destroy() {
        try {
            if (audio) {
                audio.pause();
                audio.src = '';
                audio.load();
            }
            listeners = {};
            isReady = false;
        } catch (e) {
            console.error('Player.destroy error:', e);
        }
    }

    return {
        init,
        loadTrack,
        play,
        pause,
        toggle,
        seek,
        seekPercent,
        setVolume,
        getCurrentTime,
        getDuration,
        isPaused,
        getProgressPercent,
        on,
        off,
        destroy
    };
})();
