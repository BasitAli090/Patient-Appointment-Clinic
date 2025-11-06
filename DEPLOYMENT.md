# Deployment Guide - Clinic Appointment System

This guide will help you deploy the Clinic Appointment System online so it can be accessed from Android, iOS, desktop, and any device with a web browser.

## Prerequisites

- .NET 8.0 SDK installed
- SQL Server (or SQL Server Express)
- Internet connection
- Domain name (optional, can use IP address)

## Deployment Options

### Option 1: Deploy to Azure (Recommended for Beginners)

#### Step 1: Create Azure Account
1. Go to https://azure.microsoft.com
2. Create a free account (includes $200 credit)

#### Step 2: Create Azure App Service
1. Login to Azure Portal
2. Click "Create a resource"
3. Search for "Web App"
4. Fill in details:
   - Name: `clinic-appointment-system`
   - Runtime stack: `.NET 8`
   - Operating System: `Windows` or `Linux`
5. Click "Review + Create"

#### Step 3: Create Azure SQL Database
1. In Azure Portal, click "Create a resource"
2. Search for "SQL Database"
3. Create database with:
   - Database name: `ClinicAppointmentDB`
   - Server: Create new server
   - Pricing tier: Basic (for testing)

#### Step 4: Update Connection String
1. In Azure Portal, go to your Web App
2. Go to "Configuration" > "Connection strings"
3. Add connection string:
   - Name: `DefaultConnection`
   - Value: Copy from Azure SQL Database connection string
   - Type: `SQLAzure`

#### Step 5: Deploy Application
```bash
# Install Azure CLI
# Then login
az login

# Deploy using Visual Studio or Azure CLI
az webapp up --name clinic-appointment-system --resource-group YOUR_RESOURCE_GROUP
```

### Option 2: Deploy to IIS (Windows Server)

#### Step 1: Install Prerequisites
```powershell
# Install .NET 8.0 Hosting Bundle
# Download from: https://dotnet.microsoft.com/download/dotnet/8.0
```

#### Step 2: Publish Application
```bash
dotnet publish -c Release -o ./publish
```

#### Step 3: Configure IIS
1. Open IIS Manager
2. Create new Application Pool:
   - Name: `ClinicAppointmentSystem`
   - .NET CLR Version: `No Managed Code`
   - Managed Pipeline Mode: `Integrated`
3. Create new Website:
   - Physical path: Point to `publish` folder
   - Binding: Set port (e.g., 80) and host name
4. Configure SQL Server connection string in `web.config` or `appsettings.json`

#### Step 4: Configure Firewall
- Open port 80 (HTTP) and 443 (HTTPS) in Windows Firewall
- Configure router to forward ports if needed

### Option 3: Deploy using Docker

#### Step 1: Build Docker Image
```bash
docker build -t clinic-appointment-system .
```

#### Step 2: Run Container
```bash
docker-compose up -d
```

#### Step 3: Access Application
- Open browser to: `http://your-server-ip:8080`

### Option 4: Deploy to Linux Server (Ubuntu/Debian)

#### Step 1: Install .NET Runtime
```bash
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y aspnetcore-runtime-8.0
```

#### Step 2: Install SQL Server
```bash
# Follow Microsoft's guide for SQL Server on Linux
# https://docs.microsoft.com/sql/linux/sql-server-linux-setup
```

#### Step 3: Publish and Deploy
```bash
dotnet publish -c Release -o /var/www/clinic-appointment
sudo systemctl enable clinic-appointment
sudo systemctl start clinic-appointment
```

## Mobile Access Configuration

### 1. Enable Responsive Design
The application is already mobile-responsive. Test on mobile devices.

### 2. Configure CORS (if needed)
If accessing from different domains, update `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

### 3. Enable HTTPS
For secure access, configure SSL certificate:
- Use Let's Encrypt (free) for production
- Or use Azure App Service SSL (included)

## Access from Different Devices

### Desktop/Laptop
- Open web browser
- Navigate to: `https://your-domain.com` or `http://your-ip-address`

### Android Phone/Tablet
1. Open Chrome or any browser
2. Navigate to: `https://your-domain.com`
3. (Optional) Add to Home Screen:
   - Tap menu (3 dots)
   - Select "Add to Home screen"

### iPhone/iPad
1. Open Safari
2. Navigate to: `https://your-domain.com`
3. (Optional) Add to Home Screen:
   - Tap Share button
   - Select "Add to Home Screen"

## Security Checklist

- [ ] Change default password in `appsettings.json`
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Use strong database passwords
- [ ] Enable SQL Server authentication
- [ ] Regular backups
- [ ] Update .NET runtime regularly

## Troubleshooting

### Cannot Access from Mobile Device
1. Check firewall settings
2. Verify server is accessible from internet
3. Check if using correct IP/domain
4. Verify port is open (80/443)

### Database Connection Issues
1. Verify connection string
2. Check SQL Server is running
3. Verify firewall allows SQL Server port (1433)
4. Check SQL Server authentication mode

### Performance Issues
1. Enable caching
2. Optimize database queries
3. Use CDN for static files
4. Consider Azure App Service scaling

## Maintenance

### Backup Database
```sql
BACKUP DATABASE ClinicAppointmentDB 
TO DISK = 'C:\Backups\ClinicAppointmentDB.bak'
```

### Update Application
1. Publish new version
2. Stop application
3. Copy new files
4. Start application

## Support

For issues or questions, check:
- .NET Documentation: https://docs.microsoft.com/dotnet
- Azure Documentation: https://docs.microsoft.com/azure
- SQL Server Documentation: https://docs.microsoft.com/sql

