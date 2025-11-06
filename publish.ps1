# PowerShell script to publish the application
Write-Host "Publishing Clinic Appointment System..." -ForegroundColor Green

# Clean previous publish
if (Test-Path "./publish") {
    Remove-Item -Recurse -Force "./publish"
    Write-Host "Cleaned previous publish folder" -ForegroundColor Yellow
}

# Publish application
dotnet publish -c Release -o ./publish

if ($LASTEXITCODE -eq 0) {
    Write-Host "Publish completed successfully!" -ForegroundColor Green
    Write-Host "Output location: ./publish" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Copy the 'publish' folder to your server" -ForegroundColor White
    Write-Host "2. Configure IIS or hosting service" -ForegroundColor White
    Write-Host "3. Update connection string in appsettings.json" -ForegroundColor White
    Write-Host "4. Start the application" -ForegroundColor White
} else {
    Write-Host "Publish failed!" -ForegroundColor Red
    exit 1
}

