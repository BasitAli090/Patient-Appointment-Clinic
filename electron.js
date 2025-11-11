const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'icon-512.png'),
    titleBarStyle: 'default',
    backgroundColor: '#667eea'
  });

  // Load the app
  win.loadFile('index.html');

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    win.webContents.openDevTools();
  }

  // Handle window closed
  win.on('closed', () => {
    app.quit();
  });
}

// App ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

