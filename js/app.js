const App = {
  async init() {
    try {
      await Data.init();
      await Player.init();
      await UI.init();

      // Ensure auto playlists exist
      await Data.ensureAutoPlaylists();

      // Auto scan on launch if enabled
      if (SettingsManager.get('library.autoIndexOnLaunch')) {
        // Would need folder access - skip for now
      }

      console.log('Okvy MusiQ v2.2 initialized');
    } catch(e) {
      console.error('Initialization error:', e);
      document.getElementById('critical-error').classList.remove('hidden');
      document.getElementById('error-message').textContent = e.message;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
