/* ========================================
   Okvy MusiQ - Utilities
   ======================================== */

const Utils = (function() {
    'use strict';

    function safeExec(fn, fallback, context) {
        try {
            return fn.call(context);
        } catch (e) {
            console.error('Utils.safeExec error:', e);
            return typeof fallback === 'function' ? fallback(e) : fallback;
        }
    }

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                try {
                    fn.apply(this, args);
                } catch (e) {
                    console.error('Debounced function error:', e);
                }
            }, delay);
        };
    }

    function throttle(fn, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                try {
                    fn.apply(this, args);
                } catch (e) {
                    console.error('Throttled function error:', e);
                }
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function getStorage(key, defaultVal) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultVal;
        } catch (e) {
            console.warn('Storage read error for', key, e);
            return defaultVal;
        }
    }

    function setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Storage write error for', key, e);
            return false;
        }
    }

    function generateId() {
        return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    }

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    return {
        safeExec,
        formatTime,
        debounce,
        throttle,
        getStorage,
        setStorage,
        generateId,
        shuffleArray,
        escapeHtml,
        clamp
    };
})();
