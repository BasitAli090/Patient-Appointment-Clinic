@echo off
echo ====================================
echo Doctor Appointment System - Setup
echo ====================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Node.js found!
echo.

echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ====================================
echo Installation Complete!
echo ====================================
echo.
echo To run the desktop app, use:
echo   npm run electron
echo.
echo To run as web server, use:
echo   npm start
echo.
pause

