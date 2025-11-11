# Setup Guide - Android & Desktop Installation

## Quick Start

### For Android (PWA - Progressive Web App)

1. **Open the app** in Chrome or Edge browser on your Android device
2. **Tap the menu** (three dots) in the browser
3. **Select "Add to Home screen"** or "Install app"
4. The app icon will appear on your home screen
5. Tap the icon to launch the app in standalone mode

**Note:** The app works offline after first load!

### For Desktop (Windows/Mac/Linux)

#### Method 1: Install as PWA (Recommended)

1. Open the app in **Chrome** or **Edge** browser
2. Look for the **install icon** in the address bar (or menu)
3. Click **"Install"** or **"Add to Home Screen"**
4. The app will be installed and can be launched from your desktop/start menu

#### Method 2: Electron Desktop App

**Prerequisites:**
- Node.js installed (download from nodejs.org)

**Steps:**

1. Open terminal/command prompt in the project folder

2. Install dependencies:
```bash
npm install
```

3. Run the desktop app:
```bash
npm run electron
```

4. (Optional) Create desktop shortcuts:
   - Windows: Right-click the app window → Create shortcut
   - Mac: Drag app to Applications folder
   - Linux: Create .desktop file

## Creating App Icons

The app needs icon files (`icon-192.png` and `icon-512.png`). You can:

1. **Use the icon generator:**
   - Open `create-icons.html` in a browser
   - Icons will be automatically downloaded

2. **Create manually:**
   - Create 192x192 and 512x512 PNG images
   - Use any image editor
   - Save as `icon-192.png` and `icon-512.png`

3. **Use online tools:**
   - Visit: https://www.pwabuilder.com/imageGenerator
   - Upload your logo/image
   - Download generated icons

## Testing Locally

1. Install a local server (if not using Electron):
```bash
npm install -g http-server
```

2. Run the server:
```bash
http-server -p 8080
```

3. Open browser: `http://localhost:8080`

## Troubleshooting

### Android Installation Issues

- **"Add to Home screen" not showing:**
  - Make sure you're using Chrome or Edge
  - Visit the site multiple times
  - Check if site is served over HTTPS (required for PWA)

- **App not working offline:**
  - Clear browser cache
  - Reinstall the app
  - Check service worker registration in browser console

### Desktop Installation Issues

- **Electron not working:**
  - Make sure Node.js is installed: `node --version`
  - Delete `node_modules` folder and run `npm install` again
  - Check for error messages in terminal

- **PWA install button not showing:**
  - Use Chrome or Edge browser
  - Make sure you're accessing via HTTP/HTTPS (not file://)
  - Check browser console for errors

## Features After Installation

✅ **Offline Support** - Works without internet after first load
✅ **App-like Experience** - No browser UI in standalone mode
✅ **Desktop Integration** - Appears in start menu/applications
✅ **Quick Access** - Launch from home screen/desktop
✅ **Auto-updates** - Service worker updates in background

## Security Notes

- All data is stored locally (localStorage)
- No data is sent to external servers
- Works completely offline
- No internet connection required after initial load

## Support

For issues:
1. Check browser console for errors
2. Verify all files are in the same folder
3. Make sure manifest.json and service-worker.js are accessible
4. Check that icons exist (icon-192.png, icon-512.png)

