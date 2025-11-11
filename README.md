# Doctor Appointment System

A modern, responsive appointment management system for doctors with support for Android and Desktop platforms.

## Features

- ✅ Separate appointment management for Dr. Umar Farooq and Dr. Samreen Malik
- ✅ Auto-generated appointment numbers with daily reset
- ✅ Frozen appointment numbers (cannot be edited/deleted)
- ✅ Search functionality
- ✅ Today's appointments view
- ✅ Statistics dashboard
- ✅ Dark mode support
- ✅ Mobile responsive design
- ✅ Offline support (PWA)
- ✅ Desktop application support

## Installation

### Android Installation (PWA)

1. **Open the app** in Chrome or Edge browser on your Android device
2. **Tap the menu** (three dots) in the browser
3. **Select "Add to Home screen"** or "Install app"
4. The app will be installed and can be launched from your home screen

### Desktop Installation

#### Option 1: Web Browser (PWA)
1. Open the app in Chrome, Edge, or Safari
2. Click the install icon in the address bar
3. Follow the installation prompts
4. The app will be installed as a desktop application

#### Option 2: Electron Desktop App

**Prerequisites:**
- Node.js (v16 or higher)
- npm or yarn

**Installation Steps:**

1. Install dependencies:
```bash
npm install
```

2. Run the desktop app:
```bash
npm run electron
```

3. Build for production (optional):
```bash
npm run build
```

## Development

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## Frozen Appointment Numbers

### Dr. Umar Farooq
- Emergency Patient Numbers: 1, 2, 3, 10, 15, 20

### Dr. Samreen Malik
- Dr. Umar Farooq Ultrasound Patient Numbers: 1, 2, 3, 4, 5, 9, 10, 13, 16, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34, 37, 38

## Features Overview

### Dashboard
- View appointments for both doctors
- Search appointments by patient name or number
- See next available appointment number
- View statistics (total and today's appointments)

### Appointment Management
- Add new appointments with auto-generated numbers
- Edit appointments (except frozen numbers)
- Delete appointments (except frozen numbers)
- Daily number reset (numbers reset each day)

### Additional Features
- Today's appointments list
- Password-protected reset function
- Dark mode toggle
- Toast notifications
- Responsive design for all devices

## Browser Support

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Opera

## Data Storage

All data is stored locally in the browser using localStorage. No data is sent to any server.

## Reset Password

Default password: `admin123`

You can change this in `app.js`:
```javascript
const RESET_PASSWORD = 'your-password-here';
```

## License

MIT License

## Support

For issues or questions, please check the code comments or documentation.

