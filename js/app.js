const App = {
  async init() {
    try {
      await Data.init();
      await Player.init();
      await UI.init();
      await Data.ensureAutoPlaylists();
      if (SettingsManager.get('library.autoIndexOnLaunch')) {
        // Would need folder access - skip for now
      }
      console.log('Okvy MusiQ v2.3.1 initialized');
    } catch(e) {
      console.error('Initialization error:', e);
      document.getElementById('critical-error').classList.remove('hidden');
      document.getElementById('error-message').textContent = e.message;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
