(function(){
  const cap = window.Capacitor;
  const plugin = cap && typeof cap.registerPlugin === 'function' ? cap.registerPlugin('NativeMedia') : null;

  window.NativeAndroid = {
    isAvailable(){ return !!plugin; },
    async requestAudioPermission(){
      if (!plugin) return { granted: false, available: false };
      try { return await plugin.requestAudioPermission(); } catch (e) { console.warn('Native audio permission request failed', e); return { granted:false, available:true, error:e?.message||String(e) }; }
    },
    async requestNotificationPermission(){
      if (!plugin) return { granted:false, available:false };
      try { return await plugin.requestNotificationPermission(); } catch(e) { return { granted:false, available:true }; }
    },
    async hasAudioPermission(){
      if (!plugin) return { granted:false, available:false };
      try { return await plugin.hasAudioPermission(); } catch (e) { return { granted:false, available:true }; }
    },
    async scanAudio(){
      if (!plugin) return { tracks: [], available:false };
      try { const r = await plugin.scanAudio(); return { ...r, available:true }; } catch (e) { console.warn('Native MediaStore scan failed', e); return { tracks:[], available:true, error:e?.message||String(e) }; }
    },
    async getArtwork(albumId){
      if (!plugin || albumId == null) return { dataUrl:null };
      try { return await plugin.getArtwork({ albumId }); } catch (e) { return { dataUrl:null }; }
    },
    async startPlaybackService(title, artist){
      if (!plugin) return;
      try { await plugin.startPlaybackService({ title:title||'Okvy MusiQ', artist:artist||'' }); } catch(e) { console.warn('Playback service start failed', e); }
    },
    async stopPlaybackService(){
      if (!plugin) return;
      try { await plugin.stopPlaybackService(); } catch(e) {}
    },
    async updatePlaybackState(isPlaying, title, artist){
      if (!plugin) return;
      try { await plugin.updatePlaybackState({ isPlaying:!!isPlaying, title:title||'Okvy MusiQ', artist:artist||'' }); } catch(e) {}
    }
  };
})();
