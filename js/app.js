const App = {
  async init() {
    try {
      await SettingsManager.load();
      await Data.init();
      await Player.init();
      await UI.init();
      await Data.ensureAutoPlaylists();
      await UI.autoIndexSavedFolders();

      console.log('Okvy MusiQ v3.0 initialized');
    } catch(e) {
      console.error('Initialization error:', e);
      const errorEl = document.getElementById('critical-error');
      const messageEl = document.getElementById('error-message');
      if (errorEl) errorEl.classList.remove('hidden');
      if (messageEl) messageEl.textContent = e?.message || 'The app failed to initialize.';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
