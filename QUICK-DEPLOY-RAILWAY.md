# 🚀 Deploy to Railway in 5 Minutes (BEST for ASP.NET Core)

## Why Railway?
- ✅ Free tier available
- ✅ Supports .NET Core perfectly
- ✅ Easy database setup
- ✅ Auto-deploy from GitHub
- ✅ Much better than Vercel for .NET apps

## Step-by-Step:

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/clinic-appointment.git
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Go to Railway:**
   - Visit: https://railway.app
   - Sign up (free with GitHub)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Database:**
   - Click "+ New"
   - Select "Database" → "PostgreSQL" or "SQL Server"
   - Railway will create it automatically

4. **Set Environment Variables:**
   - Go to your service → Variables
   - Add:
     ```
     ConnectionStrings__DefaultConnection=postgresql://user:pass@host:port/db
     ```
   - (Railway provides this automatically)

5. **Deploy:**
   - Railway auto-detects .NET
   - Builds and deploys automatically
   - Get your URL: `https://your-app.railway.app`

### Step 3: Access Your App
- Open: `https://your-app.railway.app`
- Works on all devices!

## That's It! ✅

Your app is now online and accessible from:
- Android phones
- iPhones
- Desktop computers
- Any device with a browser!

## Update Connection String

If using PostgreSQL (Railway default), update `Program.cs`:

```csharp
// Add Npgsql package first:
// dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

// Then in Program.cs:
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));
```

Or use SQL Server if Railway supports it.

## Need Help?

Railway automatically:
- Detects .NET projects
- Builds your app
- Runs migrations
- Provides database connection

Just connect GitHub and deploy!

