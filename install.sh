#!/bin/bash

echo "===================================="
echo "Doctor Appointment System - Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "===================================="
echo "Installation Complete!"
echo "===================================="
echo ""
echo "To run the desktop app, use:"
echo "  npm run electron"
echo ""
echo "To run as web server, use:"
echo "  npm start"
echo ""

