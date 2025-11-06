# Create APK File - Step by Step

## Simple Method: Use WebView App Generator

### Option 1: Use Online Tool (Easiest)

1. Go to: https://www.appypie.com/app-builder
2. Choose "Web App to Android"
3. Enter your web URL: `https://your-app.azurewebsites.net`
4. Customize app name and icon
5. Download APK file
6. Done! ✅

### Option 2: Use Android Studio (More Control)

See detailed steps in `HOW-TO-USE-ON-DEVICES.md`

## Quick APK Creation Script

Save this as `create-apk.ps1`:

```powershell
Write-Host "Creating Android WebView App..." -ForegroundColor Green

# This is a template - you need Android Studio to build APK
Write-Host "1. Install Android Studio" -ForegroundColor Yellow
Write-Host "2. Create new project" -ForegroundColor Yellow
Write-Host "3. Use WebView code from HOW-TO-USE-ON-DEVICES.md" -ForegroundColor Yellow
Write-Host "4. Build → Build APK" -ForegroundColor Yellow
```

## Alternative: Use PWA Builder

1. Go to: https://www.pwabuilder.com
2. Enter your web URL
3. Click "Build My PWA"
4. Download Android package
5. Get APK file!

