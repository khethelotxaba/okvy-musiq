import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const androidRoot = path.join(root, 'android');
const appRoot = path.join(androidRoot, 'app');
const manifest = path.join(appRoot, 'src', 'main', 'AndroidManifest.xml');

function mkdirp(p){ fs.mkdirSync(p, { recursive:true }); }
function write(p, value){ mkdirp(path.dirname(p)); fs.writeFileSync(p, value); }

let xml = fs.readFileSync(manifest, 'utf8');
const perms = [
  '<uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />',
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />',
  '<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />',
  '<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />',
  '<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />'
];
for (const perm of perms) if (!xml.includes(perm)) xml = xml.replace(/(<manifest[^>]*>)/, `$1\n    ${perm}`);
if (!xml.includes('NativePlaybackService')) {
  xml = xml.replace(/(\s*<\/application>)/, `\n        <service\n            android:name=".NativePlaybackService"\n            android:exported="false"\n            android:foregroundServiceType="mediaPlayback" />\n$1`);
}
fs.writeFileSync(manifest, xml);

// Capacitor 6 does not automatically discover local custom Android plugins.
// Add the plugin to the generated registration list so window.Capacitor
// registerPlugin('NativeMedia') resolves on Android.
const capConfigPath = path.join(root, 'android', 'capacitor.config.json');
if (fs.existsSync(capConfigPath)) {
  try {
    const capConfig = JSON.parse(fs.readFileSync(capConfigPath, 'utf8'));
    const list = Array.isArray(capConfig.packageClassList) ? capConfig.packageClassList : [];
    if (!list.includes('com.okvymusiq.app.NativeMediaPlugin')) list.push('com.okvymusiq.app.NativeMediaPlugin');
    capConfig.packageClassList = list;
    fs.writeFileSync(capConfigPath, JSON.stringify(capConfig, null, 2) + '\n');
  } catch (e) {
    console.warn('Could not patch android/capacitor.config.json:', e.message);
  }
}

// Determine generated Java/Kotlin package from appId.
const pkg = 'com.okvymusiq.app';
const javaDir = path.join(appRoot, 'src', 'main', 'java', ...pkg.split('.'));
mkdirp(javaDir);

write(path.join(javaDir, 'NativeMediaPlugin.java'), `package ${pkg};

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Base64;

import androidx.core.content.ContextCompat;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONObject;

@CapacitorPlugin(name = "NativeMedia", permissions = {
    @Permission(alias = "audio", strings = { Manifest.permission.READ_MEDIA_AUDIO }),
    @Permission(alias = "legacyAudio", strings = { Manifest.permission.READ_EXTERNAL_STORAGE }),
    @Permission(alias = "notifications", strings = { Manifest.permission.POST_NOTIFICATIONS })
})
public class NativeMediaPlugin extends Plugin {
    private static final int AUDIO_PERMISSION_REQUEST = 4201;
    private PluginCall pendingPermissionCall;
    private PluginCall pendingNotificationCall;

    private boolean hasReadAudio() {
        if (Build.VERSION.SDK_INT >= 33) {
            return ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_MEDIA_AUDIO) == PackageManager.PERMISSION_GRANTED;
        }
        if (Build.VERSION.SDK_INT >= 23) {
            return ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
        }
        return true;
    }

    @PluginMethod
    public void hasAudioPermission(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("granted", hasReadAudio());
        call.resolve(ret);
    }

    @PluginMethod
    public void requestAudioPermission(PluginCall call) {
        String alias = Build.VERSION.SDK_INT >= 33 ? "audio" : "legacyAudio";
        if (hasReadAudio()) {
            JSObject ret = new JSObject(); ret.put("granted", true); call.resolve(ret); return;
        }
        requestPermissionForAlias(alias, call, "audioPermissionCallback");
    }

    @PermissionCallback
    public void audioPermissionCallback(PluginCall call) {
        JSObject ret = new JSObject(); ret.put("granted", hasReadAudio()); call.resolve(ret);
    }

    @PluginMethod
    public void requestNotificationPermission(PluginCall call) {
        if (Build.VERSION.SDK_INT < 33) {
            JSObject ret = new JSObject(); ret.put("granted", true); call.resolve(ret); return;
        }
        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
            JSObject ret = new JSObject(); ret.put("granted", true); call.resolve(ret); return;
        }
        requestPermissionForAlias("notifications", call, "notificationPermissionCallback");
    }

    @PermissionCallback
    public void notificationPermissionCallback(PluginCall call) {
        boolean granted = Build.VERSION.SDK_INT < 33 || ContextCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
        JSObject ret = new JSObject(); ret.put("granted", granted); call.resolve(ret);
    }

    @PluginMethod
    public void scanAudio(PluginCall call) {
        if (!hasReadAudio()) { call.reject("Audio permission has not been granted"); return; }
        ContentResolver resolver = getContext().getContentResolver();
        Uri collection = Build.VERSION.SDK_INT >= 29 ? MediaStore.Audio.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY) : MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String[] projection = new String[]{
            MediaStore.Audio.Media._ID,
            MediaStore.Audio.Media.TITLE,
            MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.ALBUM,
            MediaStore.Audio.Media.ALBUM_ID,
            MediaStore.Audio.Media.DURATION,
            MediaStore.Audio.Media.TRACK,
            MediaStore.Audio.Media.YEAR,
            MediaStore.Audio.Media.DISPLAY_NAME,
            MediaStore.Audio.Media.MIME_TYPE,
            MediaStore.Audio.Media.SIZE,
            MediaStore.Audio.Media.DATE_ADDED,
            MediaStore.Audio.Media.IS_MUSIC
        };
        String selection = MediaStore.Audio.Media.IS_MUSIC + " != 0";
        String sort = MediaStore.Audio.Media.TITLE + " COLLATE NOCASE ASC";
        JSArray tracks = new JSArray();
        Map<Long, String> albumArtCache = new HashMap<>();
        try (Cursor cursor = resolver.query(collection, projection, selection, null, sort)) {
            if (cursor != null) {
                int idCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID);
                int titleCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE);
                int artistCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST);
                int albumCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM);
                int albumIdCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM_ID);
                int durationCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION);
                int trackCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TRACK);
                int yearCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.YEAR);
                int displayCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME);
                int mimeCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.MIME_TYPE);
                int sizeCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.SIZE);
                int dateCol = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATE_ADDED);
                while (cursor.moveToNext()) {
                    long id = cursor.getLong(idCol);
                    long albumId = cursor.getLong(albumIdCol);
                    JSObject t = new JSObject();
                    t.put("id", "native-" + id);
                    t.put("nativeId", id);
                    t.put("nativeUri", ContentUris.withAppendedId(collection, id).toString());
                    t.put("title", cursor.getString(titleCol) == null ? "Unknown Title" : cursor.getString(titleCol));
                    t.put("artist", cursor.getString(artistCol) == null ? "Unknown Artist" : cursor.getString(artistCol));
                    t.put("albumArtist", cursor.getString(artistCol) == null ? "Unknown Artist" : cursor.getString(artistCol));
                    t.put("album", cursor.getString(albumCol) == null ? "Unknown Album" : cursor.getString(albumCol));
                    t.put("albumId", albumId);
                    t.put("duration", cursor.isNull(durationCol) ? 0 : cursor.getLong(durationCol));
                    t.put("trackNumber", cursor.isNull(trackCol) ? 0 : (cursor.getInt(trackCol) % 1000));
                    t.put("year", cursor.isNull(yearCol) ? 0 : cursor.getInt(yearCol));
                    t.put("fileName", cursor.getString(displayCol));
                    t.put("mimeType", cursor.getString(mimeCol));
                    t.put("size", cursor.isNull(sizeCol) ? 0 : cursor.getLong(sizeCol));
                    t.put("dateAdded", cursor.isNull(dateCol) ? 0 : cursor.getLong(dateCol) * 1000L);
                    String art = albumArtCache.get(albumId);
                    if (art == null && !albumArtCache.containsKey(albumId)) {
                        art = readAlbumArt(albumId);
                        albumArtCache.put(albumId, art == null ? "" : art);
                    }
                    if (art != null && !art.isEmpty()) t.put("artwork", art);
                    tracks.put(t);
                }
            }
            JSObject ret = new JSObject(); ret.put("tracks", tracks); call.resolve(ret);
        } catch (Exception e) {
            call.reject("MediaStore scan failed: " + e.getMessage(), e);
        }
    }

    private String readAlbumArt(long albumId) {
        try {
            Uri albums = MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI;
            String[] projection = new String[]{MediaStore.Audio.Albums.ALBUM_ART};
            try (Cursor c = getContext().getContentResolver().query(albums, projection, MediaStore.Audio.Albums._ID + "=?", new String[]{String.valueOf(albumId)}, null)) {
                if (c != null && c.moveToFirst()) {
                    int col = c.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART);
                    if (col >= 0) {
                        String path = c.getString(col);
                        if (path != null && !path.isEmpty()) {
                            File f = new File(path);
                            if (f.exists() && f.isFile()) return fileToDataUrl(f);
                        }
                    }
                }
            }
        } catch (Exception ignored) {}
        return null;
    }

    private String fileToDataUrl(File file) throws IOException {
        try (FileInputStream in = new FileInputStream(file); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buf = new byte[8192]; int n;
            while ((n = in.read(buf)) >= 0) out.write(buf, 0, n);
            String mime = file.getName().toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
            return "data:" + mime + ";base64," + Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP);
        }
    }

    @PluginMethod
    public void getArtwork(PluginCall call) {
        long albumId = call.getLong("albumId", -1L);
        JSObject ret = new JSObject();
        String art = albumId >= 0 ? readAlbumArt(albumId) : null;
        ret.put("dataUrl", art == null ? JSONObject.NULL : art);
        call.resolve(ret);
    }

    @PluginMethod
    public void startPlaybackService(PluginCall call) {
        String title = call.getString("title", "Okvy MusiQ");
        String artist = call.getString("artist", "");
        Intent intent = new Intent(getContext(), NativePlaybackService.class);
        intent.putExtra("title", title); intent.putExtra("artist", artist);
        if (Build.VERSION.SDK_INT >= 26) getContext().startForegroundService(intent); else getContext().startService(intent);
        call.resolve();
    }

    @PluginMethod
    public void stopPlaybackService(PluginCall call) {
        getContext().stopService(new Intent(getContext(), NativePlaybackService.class));
        call.resolve();
    }

    @PluginMethod
    public void updatePlaybackState(PluginCall call) {
        Intent intent = new Intent(getContext(), NativePlaybackService.class);
        intent.setAction(NativePlaybackService.ACTION_UPDATE_STATE);
        intent.putExtra("isPlaying", call.getBoolean("isPlaying", false));
        intent.putExtra("title", call.getString("title", "Okvy MusiQ"));
        intent.putExtra("artist", call.getString("artist", ""));
        try { getContext().startService(intent); } catch (Exception ignored) {}
        call.resolve();
    }
}
`);

write(path.join(javaDir, 'NativePlaybackService.java'), `package ${pkg};

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class NativePlaybackService extends Service {
    public static final String ACTION_UPDATE_STATE = "${pkg}.UPDATE_STATE";
    private static final String CHANNEL_ID = "okvy_music_playback";
    private boolean playing = true;

    @Override public void onCreate() {
        super.onCreate(); createChannel();
        startForeground(9001, buildNotification("Okvy MusiQ", "Ready"));
    }

    @Override public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_UPDATE_STATE.equals(intent.getAction())) {
            playing = intent.getBooleanExtra("isPlaying", false);
            String title = intent.getStringExtra("title");
            String artist = intent.getStringExtra("artist");
            NotificationManager nm = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
            nm.notify(9001, buildNotification(title == null ? "Okvy MusiQ" : title, artist == null ? "" : artist));
        }
        return START_STICKY;
    }

    private Notification buildNotification(String title, String artist) {
        Intent launch = getPackageManager().getLaunchIntentForPackage(getPackageName());
        PendingIntent pi = launch == null ? null : PendingIntent.getActivity(this, 1, launch, Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT : PendingIntent.FLAG_UPDATE_CURRENT);
        String text = artist.isEmpty() ? (playing ? "Playing" : "Paused") : artist + " • " + (playing ? "Playing" : "Paused");
        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setContentTitle(title)
            .setContentText(text)
            .setContentIntent(pi)
            .setOngoing(playing)
            .setSilent(true)
            .setCategory(NotificationCompat.CATEGORY_TRANSPORT)
            .build();
    }

    private void createChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel c = new NotificationChannel(CHANNEL_ID, "Music playback", NotificationManager.IMPORTANCE_LOW);
            c.setDescription("Keeps Okvy MusiQ playback visible while playing");
            getSystemService(NotificationManager.class).createNotificationChannel(c);
        }
    }

    @Nullable @Override public IBinder onBind(Intent intent) { return null; }
}
`);

// MainActivity: register custom plugin. Use constructor-compatible Capacitor 6 pattern.
const stack = [path.join(appRoot,'src','main','java')];
let mainActivity = null;
while (stack.length) {
  const d = stack.pop();
  for (const e of fs.readdirSync(d,{withFileTypes:true})) {
    const f=path.join(d,e.name);
    if (e.isDirectory()) stack.push(f); else if (e.name === 'MainActivity.java') mainActivity=f;
  }
}
if (!mainActivity) throw new Error('MainActivity.java not found');
let java = fs.readFileSync(mainActivity,'utf8');
if (!java.includes('NativeMediaPlugin')) {
  java = java.replace(/^(package\s+[^;]+;)/m, `$1\n\nimport android.os.Bundle;\nimport ${pkg}.NativeMediaPlugin;`);
  java = java.replace(/public\s+class\s+MainActivity\s+extends\s+BridgeActivity\s*\{/, m => m + `\n\n    @Override\n    public void onCreate(Bundle savedInstanceState) {\n        registerPlugin(NativeMediaPlugin.class);\n        super.onCreate(savedInstanceState);\n    }`);
}
fs.writeFileSync(mainActivity, java);

console.log('Prepared Android native media integration.');
