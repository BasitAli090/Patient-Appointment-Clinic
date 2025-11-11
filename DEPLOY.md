# Deployment Guide - Vercel + Supabase

## Quick Deploy to Vercel

### Step 1: Prepare Your Code

1. Make sure all files are committed to Git
2. Push to GitHub, GitLab, or Bitbucket

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Import your repository
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty or `npm run vercel-build`)
   - **Output Directory**: ./
6. Click **"Deploy"**

### Step 3: Set Up Supabase Database

1. Follow instructions in `database/setup.md`
2. Get your Supabase URL and API key

### Step 4: Configure Environment Variables

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
RESET_PASSWORD=admin123
```

3. Click **Save**
4. Go to **Deployments** tab
5. Click **"Redeploy"** on latest deployment

### Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test creating an appointment
3. Check Vercel function logs for any errors

## Manual Deployment

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Set Environment Variables via CLI

```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add RESET_PASSWORD
```

## Database Migration

### Initial Setup

1. Run the SQL in `database/schema.sql` in Supabase SQL Editor
2. Verify table creation in Table Editor
3. Test with a sample insert

### Backup & Restore

```sql
-- Export data
COPY appointments TO '/path/to/backup.csv' WITH CSV HEADER;

-- Import data
COPY appointments FROM '/path/to/backup.csv' WITH CSV HEADER;
```

## Monitoring

### Vercel Analytics

1. Enable in Vercel dashboard
2. View real-time analytics
3. Monitor API function performance

### Supabase Monitoring

1. Go to Supabase dashboard
2. Check **Database** → **Logs**
3. Monitor API usage in **Settings** → **Usage**

## Troubleshooting

### API Functions Not Working

- Check Vercel function logs
- Verify environment variables are set
- Check Supabase connection
- Verify RLS policies

### Database Connection Errors

- Verify SUPABASE_URL is correct
- Check SUPABASE_ANON_KEY is valid
- Ensure RLS policies allow operations
- Check network connectivity

### CORS Issues

- Verify CORS headers in `vercel.json`
- Check API function responses
- Test with curl/Postman

## Production Checklist

- [ ] Environment variables configured
- [ ] Database schema created
- [ ] RLS policies configured
- [ ] API functions tested
- [ ] Error handling verified
- [ ] Analytics enabled
- [ ] Backup strategy in place
- [ ] Domain configured (optional)

## Custom Domain

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain
3. Configure DNS records as shown
4. Wait for DNS propagation (up to 48 hours)

## Performance Optimization

- Enable Vercel Edge Functions for faster response
- Use Supabase connection pooling
- Implement caching strategies
- Optimize database queries

