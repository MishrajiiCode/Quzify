# Quizify AI — Smart Quiz Platform & Mobile App

Quizify AI is a gamified educational platform featuring real-time quizzes, an interactive AI study tutor, weakness profiler diagnostics, mock tests, and a vibrant community store and battle pass.

---

## 📱 Mobile Application (Flutter & Kotlin)

Quizify is now available as a full-fledged Android mobile application built with the **Dart (Flutter)** framework and **Kotlin** Android embedding, directly connected to the live **Firebase** backend.

### Project Architecture
- `mobile/lib/main.dart` — Flutter entry point with portrait lock and dark system overlay styling.
- `mobile/lib/screens/app_shell.dart` — Native shell with offline state banner, back-button safety interceptor, and hardware acceleration.
- `mobile/lib/theme/app_theme.dart` — Brand design system with cyberpunk neon tokens.
- `mobile/assets/web/` — Bundled offline-first app assets.
- `mobile/android/` — Kotlin Android runner (`MainActivity.kt`, permissions, launcher icons).
- `.github/workflows/release-apk.yml` — Automated CI/CD pipeline building the APK and releasing it to GitHub Releases.

---

## 🚀 Releasing the APK on GitHub

The repository includes an automated GitHub Actions pipeline (`.github/workflows/release-apk.yml`) that builds and packages the standalone Android APK automatically.

### Method 1: Release via Git Tag (Recommended)
Tagging your commit triggers the automated build and publishes a formal GitHub Release:
```bash
# 1. Commit your latest changes
git add .
git commit -m "Prepare v1.0.0 release"
git push origin main

# 2. Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```
GitHub Actions will automatically build `Quizify-Release.apk` and attach it to a newly created GitHub Release under your repository's **Releases** tab.

### Method 2: Manual Trigger via GitHub Actions UI
1. Go to your repository on GitHub: `https://github.com/MishrajiiCode/Quzify`
2. Click the **Actions** tab.
3. In the left sidebar, select **Build & Release Quizify APK**.
4. Click **Run workflow**, specify the tag name (e.g. `v1.0.0`), and click **Run workflow**.
5. Once complete, download the APK from the GitHub Release or from the workflow run artifacts!

---

## 💻 Local Mobile Development

### Prerequisites
- Flutter SDK 3.24+ (`C:\flutter\bin`)
- Dart SDK
- Android SDK (or Android Studio / Command-line Tools)
- Java 17

### Syncing Web Assets to Mobile
Whenever you make updates to the web files in the root folder, run:
```bash
npm run sync:mobile
```

### Running the Mobile App
```bash
cd mobile
flutter pub get
flutter run
```

### Building the APK Locally
```bash
cd mobile
flutter build apk --release
```
The output APK will be located at:
`mobile/build/app/outputs/flutter-apk/app-release.apk`

---

## 🌐 Web Application Development

1. Install dependencies:
```bash
npm install
```

2. Start local server:
```bash
node server.js
```
Open `http://localhost:3000/` in your browser.
