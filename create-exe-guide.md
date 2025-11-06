# Create EXE File - Step by Step

## Method 1: Self-Contained EXE (Easiest)

### Step 1: Open PowerShell in Project Folder

### Step 2: Run This Command:

```powershell
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -o ./publish-exe
```

### Step 3: Find Your EXE

- Location: `./publish-exe/ClinicAppointmentSystem.exe`
- This EXE works on any Windows PC!

### Step 4: Share EXE File

- Send this file to Windows users
- They double-click to run
- No installation needed!

## Method 2: Create Installer

### Step 1: Install Wix Toolset

Download from: https://wixtoolset.org/

### Step 2: Create Installer Project

1. Add new project → Wix Setup Project
2. Configure installer settings
3. Build project
4. Get `.msi` installer file

## Quick Script

I've created `publish.ps1` - run it:

```powershell
.\publish.ps1
```

Then check `./publish` folder for your files.

## Make EXE Smaller

Add to `.csproj`:

```xml
<PropertyGroup>
  <PublishTrimmed>true</PublishTrimmed>
  <TrimMode>link</TrimMode>
</PropertyGroup>
```

## Result

- Single EXE file
- No dependencies needed
- Works on Windows 10/11
- Share with anyone!

