# Okvy MusiQ — Android test APK

This project is configured to build an installable **debug APK** through GitHub Actions.

## Build

1. Push the project to a GitHub repository.
2. Open **Actions**.
3. Run **Build Okvy MusiQ APK** with **Run workflow**, or push to `main`.
4. When the workflow finishes, download the `okvy-musiq-debug-apk` artifact.
5. Extract the artifact and install `app-debug.apk` on the Android test device.

The workflow generates the Capacitor Android project on the runner, syncs the current web app, adds audio-library permission handling, and builds the debug APK.

## Current Android scope

This is intentionally a **test wrapper**, not the final native music architecture. It requests audio-library access using `READ_MEDIA_AUDIO` on Android 13+ and `READ_EXTERNAL_STORAGE` on older supported Android versions. Proper MediaStore scanning, background playback/media notifications, native metadata editing, and other native integrations can be added later.

## Native Android media integration

The Android workflow now adds a native Capacitor `NativeMedia` plugin. On Android it requests the appropriate audio permission, scans the device's MediaStore audio collection, returns content URIs and metadata to the web app, and extracts available album artwork. The web scanner automatically uses this native scan when running inside Capacitor and falls back to the existing folder scanner elsewhere.

A lightweight foreground playback service is also included to keep playback visible in Android's notification area while the current web audio player is active. This is intentionally a bridge/keep-alive layer for the test APK; a future Media3 migration can replace it with a fully native player without requiring a redesign of the web UI.
