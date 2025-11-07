# Fix 404 NOT_FOUND Error

## Quick Fixes

### Issue: Getting 404 error when accessing the application

### Solution 1: Check Your URL

Make sure you're accessing the correct URL:
- ✅ Correct: `https://your-app.azurewebsites.net/Dashboard`
- ✅ Correct: `https://your-app.azurewebsites.net/` (redirects to Dashboard)
- ❌ Wrong: `https://your-app.azurewebsites.net/Home` (doesn't exist)

### Solution 2: Verify Routes

The application has these routes:
- `/` → Redirects to Dashboard
- `/Dashboard` → Main dashboard page
- `/Dashboard/Index` → Same as above
- `/Appointments/Create` → Create appointment (POST)
- `/Appointments/Update` → Update appointment (POST)
- `/Appointments/Delete` → Delete appointment (POST)
- `/Appointments/GetAppointments` → Get appointments (GET)

### Solution 3: Check Deployment

If deployed to cloud (Azure, Google Cloud, etc.):

1. **Verify Application is Running:**
   - Check deployment logs
   - Ensure application started successfully
   - Check for database connection errors

2. **Check Static Files:**
   - Ensure `wwwroot` folder is deployed
   - Check CSS/JS files are accessible

3. **Verify Database Connection:**
   - Check connection string in `appsettings.json`
   - Ensure database is accessible
   - Check firewall rules

### Solution 4: Common Issues

#### Issue: Error Handler References Missing Controller
**Fixed:** Added `HomeController` with `Error` action

#### Issue: Root URL Not Working
**Fixed:** Added root route redirect to Dashboard

#### Issue: Static Files Not Loading
**Check:**
- `wwwroot` folder exists
- Files are included in publish
- Paths are correct in views

### Solution 5: Test Locally First

Before deploying, test locally:

```bash
dotnet run
```

Then access: `http://localhost:5000` or `https://localhost:5001`

### Solution 6: Check Deployment Logs

**Azure:**
1. Go to Azure Portal
2. Your App Service → Log stream
3. Check for errors

**Google Cloud:**
1. Go to Cloud Console
2. Check logs for errors

**Docker:**
```bash
docker logs <container-name>
```

### Solution 7: Rebuild and Redeploy

1. Clean build:
```bash
dotnet clean
dotnet build
```

2. Publish:
```bash
dotnet publish -c Release -o ./publish
```

3. Redeploy

### Solution 8: Check web.config (IIS)

If using IIS, ensure `web.config` is correct:
- ASP.NET Core module is configured
- Routes are properly set

## Still Getting 404?

1. **Check the exact URL you're accessing**
2. **Check browser console for errors (F12)**
3. **Check server logs**
4. **Verify all files are deployed**
5. **Test with a simple route first**

## Test Routes

Try these URLs to test:
- `/Dashboard` - Should show dashboard
- `/Dashboard/Index` - Same as above
- `/` - Should redirect to Dashboard

If these work, routing is fine. If not, check deployment.

