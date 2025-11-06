# Quick Start - Deploy Online

## Fastest Way: Azure (5 minutes)

1. **Create Azure Account** (Free tier available)
   - Go to: https://portal.azure.com

2. **Deploy using Visual Studio:**
   - Right-click project → Publish
   - Select "Azure" → "Azure App Service"
   - Create new App Service
   - Click Publish

3. **Configure Database:**
   - In Azure Portal, create SQL Database
   - Copy connection string
   - Paste in App Service → Configuration → Connection strings

4. **Access from Any Device:**
   - Your app URL: `https://your-app-name.azurewebsites.net`
   - Open in any browser (Android, iPhone, Desktop)

## Alternative: Docker (10 minutes)

```bash
# 1. Build and run
docker-compose up -d

# 2. Access at http://your-server-ip:8080
```

## Mobile Access Tips

### Add to Home Screen (Android)
1. Open app in Chrome
2. Tap menu (⋮) → "Add to Home screen"
3. App will work like native app

### Add to Home Screen (iPhone)
1. Open app in Safari
2. Tap Share (□↑) → "Add to Home Screen"
3. App will work like native app

## Security

**IMPORTANT:** Change default password!
- Edit `appsettings.json`
- Change `ResetPassword` value
- Restart application

## Need Help?

See `DEPLOYMENT.md` for detailed instructions.

