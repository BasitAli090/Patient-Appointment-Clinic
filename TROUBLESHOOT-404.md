# Troubleshoot 404 Error - Step by Step

## Quick Diagnosis

### Step 1: Check What URL You're Accessing

**Common Mistakes:**
- ❌ `https://your-app.com/Home` → This doesn't exist
- ❌ `https://your-app.com/Index` → Wrong
- ✅ `https://your-app.com/` → Correct (redirects to Dashboard)
- ✅ `https://your-app.com/Dashboard` → Correct
- ✅ `https://your-app.com/Dashboard/Index` → Correct

### Step 2: Test Locally First

```bash
# Run locally
dotnet run

# Then open browser to:
http://localhost:5000
# or
https://localhost:5001
```

**If local works but online doesn't:**
→ Deployment issue (see Step 3)

**If local doesn't work:**
→ Code issue (see Step 4)

### Step 3: Check Deployment

#### For Azure:
1. Go to Azure Portal
2. Your App Service → **Log stream**
3. Look for errors
4. Check **Deployment Center** → **Logs**

#### For Google Cloud:
1. Check Cloud Console → Logs
2. Look for application errors

#### For Docker:
```bash
docker logs <container-name>
```

### Step 4: Verify Files Are Deployed

**Check these files exist:**
- ✅ `ClinicAppointmentSystem.dll`
- ✅ `appsettings.json`
- ✅ `web.config` (for IIS)
- ✅ `wwwroot` folder with CSS/JS
- ✅ `Views` folder

### Step 5: Check Database Connection

**Common Issue:** App can't connect to database

**Fix:**
1. Check connection string in `appsettings.json`
2. Verify database is accessible
3. Check firewall rules
4. Test connection manually

### Step 6: Check Static Files

**Issue:** CSS/JS not loading

**Fix:**
1. Ensure `wwwroot` folder is deployed
2. Check file paths in browser (F12 → Network tab)
3. Verify static files middleware is enabled

### Step 7: Common Solutions

#### Solution 1: Clear Browser Cache
- Press `Ctrl+Shift+Delete`
- Clear cache
- Try again

#### Solution 2: Try Different Browser
- Test in Chrome, Firefox, Edge
- Check if issue is browser-specific

#### Solution 3: Check URL Case Sensitivity
- URLs are case-sensitive in some servers
- Use: `/Dashboard` not `/dashboard`

#### Solution 4: Verify Route Configuration
- Check `Program.cs` has correct routes
- Ensure controllers are registered

### Step 8: Enable Detailed Errors

**For Development:**
```csharp
// In Program.cs
app.UseDeveloperExceptionPage();
```

**For Production:**
- Check logs instead
- Don't show detailed errors to users

### Step 9: Test Specific Routes

Try these URLs one by one:

1. `/` → Should redirect to Dashboard
2. `/Dashboard` → Should show dashboard
3. `/Dashboard/Index` → Should show dashboard
4. `/Home/Error` → Should show error page

**If all fail:**
→ Application not running or not deployed

**If some work:**
→ Routing issue (check route configuration)

### Step 10: Check Application Startup

**Look for these in logs:**
- ✅ "Application started"
- ✅ "Now listening on: http://..."
- ❌ "Failed to start"
- ❌ "Database connection failed"

## Still Not Working?

### Last Resort: Complete Rebuild

```bash
# 1. Clean everything
dotnet clean
Remove-Item -Recurse -Force bin, obj

# 2. Restore packages
dotnet restore

# 3. Build
dotnet build

# 4. Test locally
dotnet run

# 5. Publish
dotnet publish -c Release -o ./publish

# 6. Redeploy
```

## Get Help

**Provide this information:**
1. Exact URL you're accessing
2. Error message (full text)
3. Deployment platform (Azure, GCP, etc.)
4. Local test results
5. Logs from deployment

## Quick Fix Checklist

- [ ] Tested locally - works?
- [ ] Using correct URL (`/Dashboard`)
- [ ] Files are deployed
- [ ] Database connection works
- [ ] Static files are accessible
- [ ] Application is running
- [ ] No errors in logs
- [ ] Cleared browser cache

