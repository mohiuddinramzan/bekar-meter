# 😴 বেকার মিটার (Bekar Meter) — Version 1.0

তোমার বেকারত্বের স্তর মাপো, চ্যালেঞ্জ নাও, এক্সকিউজ বানাও এবং শেয়ার করো!

## Features (v1)

- 🏠 **Dashboard** — Beker Score, Level, Today's Report
- ⏱️ **Beker Timer** — কতক্ষণ বেকার ছিলে ট্র্যাক করো
- 🎲 **আজকের Challenge** — প্রতিদিন নতুন চ্যালেঞ্জ + পয়েন্ট
- 🤥 **Excuse Generator** — কাজ এড়াতে মজার এক্সকিউজ
- 🏆 **Achievements** — মাইলস্টোন আনলক করো
- 📸 **Share Beker Card** — সোশ্যাল মিডিয়ায় শেয়ার করো

সব ডাটা **LocalStorage**-এ সেভ হয় (অফলাইন কাজ করে)।

---

## Quick Start (Web)

1. ফোল্ডার ডাউনলোড / ক্লোন করো
2. `index.html` ব্রাউজারে ওপেন করো  
   অথবা কোনো স্ট্যাটিক সার্ভার চালাও:

```bash
npx serve .
# or
python -m http.server 3000
```

---

## GitHub-এ আপলোড + APK বিল্ড (Capacitor)

### ১. রিপোজিটরি তৈরি

```bash
git init
git add .
git commit -m "Bekar Meter v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bekar-meter.git
git push -u origin main
```

### ২. Capacitor সেটআপ (লোকালে)

Node.js লাগবে।

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Bekar Meter" "com.bekar.meter" --web-dir .
npx cap add android
npx cap sync
```

### ৩. Android Studio দিয়ে APK

```bash
npx cap open android
```

Android Studio তে **Build → Build Bundle(s) / APK(s) → Build APK(s)**

### ৪. GitHub Actions দিয়ে অটো APK (ঐচ্ছিক)

`.github/workflows/build-apk.yml` ফাইল তৈরি করো:

```yaml
name: Build APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Install dependencies
        run: |
          npm init -y
          npm install @capacitor/core @capacitor/cli @capacitor/android
          npx cap init "Bekar Meter" "com.bekar.meter" --web-dir . || true
          npx cap add android || true
          npx cap sync

      - name: Build Debug APK
        working-directory: android
        run: ./gradlew assembleDebug

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: bekar-meter-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

Push করলে Actions ট্যাবে APK পাবে।

---

## Project Structure

```
bekar-meter/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/          (optional icons later)
└── README.md
```

---

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JavaScript
- LocalStorage for persistence
- No external framework (mobile-first, PWA-ready)
- Capacitor compatible for native Android/iOS

---

## Future Ideas (v2+)

- PWA manifest + service worker
- Cloud sync / leaderboard
- More challenges & levels
- Dark/Light theme toggle
- Sound effects
- Widget support

---

Made with 😴 for all the bekar legends out there.
