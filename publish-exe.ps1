# PowerShell script to create Windows EXE file
Write-Host "Creating Windows EXE file..." -ForegroundColor Green

# Clean previous publish
if (Test-Path "./publish-exe") {
    Remove-Item -Recurse -Force "./publish-exe"
    Write-Host "Cleaned previous publish folder" -ForegroundColor Yellow
}

# Publish as self-contained EXE
Write-Host "Publishing application as self-contained EXE..." -ForegroundColor Cyan
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -o ./publish-exe

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ EXE file created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📁 Location: ./publish-exe/ClinicAppointmentSystem.exe" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Share the EXE file with Windows users" -ForegroundColor White
    Write-Host "2. Users can double-click to run (no installation needed)" -ForegroundColor White
    Write-Host "3. File size may be large (~100MB) - this is normal for self-contained apps" -ForegroundColor White
    Write-Host ""
    
    # Get file size
    $exePath = "./publish-exe/ClinicAppointmentSystem.exe"
    if (Test-Path $exePath) {
        $fileSize = (Get-Item $exePath).Length / 1MB
        Write-Host "📊 EXE file size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ Failed to create EXE file!" -ForegroundColor Red
    exit 1
}

