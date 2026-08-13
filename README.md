# Okvy MusiQ

## Build APK via GitHub Actions (No local install needed)

### 1. Create a GitHub repo
Go to https://github.com/new and create a repo called `okvy-musiq`

### 2. Upload these files
Push all files from this folder to your repo:
- `package.json`
- `capacitor.config.json`
- `src/index.html`
- `.github/workflows/build.yml`

Or use GitHub web upload:
1. Open your repo on GitHub
2. Click "Add file" → "Upload files"
3. Drag all files/folders
4. Commit to `main` branch

### 3. Trigger the build
- Go to **Actions** tab in your repo
- Click **"Build Okvy MusiQ APK"**
- Click **"Run workflow"** → **"Run workflow"**

### 4. Download APK
- Wait ~3-5 minutes for the build to finish
- Click the completed run
- Scroll to **Artifacts** section
- Download `okvy-musiq-debug.zip`
- Unzip → `app-debug.apk` → install on Android

### 5. For Release APK (signed)
The workflow builds debug APK. For release:
- Add signing keystore to repo secrets
- Modify workflow to use `assembleRelease`

---

## Local dev (optional)
If you ever install Android Studio:
```bash
npm install
npx cap sync
npx cap open android
```
