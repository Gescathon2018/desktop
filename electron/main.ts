import {app, BrowserWindow, ipcMain, Tray, screen} from 'electron';
import {DeviceManager} from './deviceManager';
import * as path from 'path';

// const WebSocket = require('ws');

const assetsDirectory = path.join(__dirname, 'assets');

const WINDOW_WIDTH = 450;
const WINDOW_HEIGHT = 400;
const HORIZ_PADDING = 15;
const VERT_PADDING = 15;

let tray = undefined;
let window = undefined;

let device = new DeviceManager(
  () => {
    window.webContents.send('detach', {serial: device.serial})
  },
  () => {
    window.webContents.send('attach', {serial: device.serial})
  }
);

if ( process.platform === 'darwin') {
  app.dock.hide();
}
// Don't show the app in the doc
app.on('ready', () => {
  // startServer();
  createTray();
  createWindow();
});
// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit();
});



function createTray() {
  tray = new Tray(path.join(assetsDirectory, 'blinkmystick.png'));
  tray.on('click', function (event) {
    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'});
    }
    const cursorPosition = screen.getCursorScreenPoint();
    const primarySize = screen.getPrimaryDisplay().workAreaSize;
    const trayPositionVert = cursorPosition.y >= primarySize.height/2 ? 'bottom' : 'top';
    const trayPositionHoriz = cursorPosition.x >= primarySize.width/2 ? 'right' : 'left';
    window.setPosition(getTrayPosX(),  getTrayPosY());
    console.log('window is visible ? ' + window.isVisible());
    window.isVisible() ? window.hide() : window.show();
    function getTrayPosX() {
      const horizBounds = {
        left:   cursorPosition.x - WINDOW_WIDTH/2,
        right:  cursorPosition.x + WINDOW_WIDTH/2
      };
      if (trayPositionHoriz == 'left') {
        return horizBounds.left <= HORIZ_PADDING ? HORIZ_PADDING : horizBounds.left;
      }
      else {
        return horizBounds.right >= primarySize.width ? primarySize.width - HORIZ_PADDING - WINDOW_WIDTH: horizBounds.right - WINDOW_WIDTH;
      }
    }
    function getTrayPosY() {
      return trayPositionVert == 'bottom' ? cursorPosition.y - WINDOW_HEIGHT - VERT_PADDING : cursorPosition.y + VERT_PADDING;
    }
  });
  tray.setToolTip('BlinkMyStick');
}

function createWindow() {
  window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  });
  window.loadURL('file://' + path.join(__dirname, 'html', 'index.html'));
  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  });
  window.on('close', () => {
    window = null;
  });
}

ipcMain.on('connected', (event, message) => {
  if (device.serial) {
    window.webContents.send('attach', {serial: device.serial});
  }
});

ipcMain.on('blinkmystick', (event, message) => {
  // device.device.getColors(7, function(err, data) {
  //   console.log(JSON.stringify(data));
  //   try {
  //     ws.send(JSON.stringify({
  //       account:'',
  //       mode: server,
  //       leds: data
  //     }));
  //   } catch (e) {
  //     console.log('Error send to server')
  //   }
  // });
  console.log(message);
  if (message.method.name === 'getInfoBlock1' || message.method.name === 'getInfoBlock2') {
    device[message.method.name]((data) => {
      console.log('---' + data + '---');
      window.webContents.send(message.method.name, {info: data, method: message.method.name})
    })
  } else if (message.method.name === 'setInfoBlock1' || message.method.name === 'setInfoBlock2') {
    console.log(message.method.params);
    device[message.method.name](...message.method.params, (data) => {
      device.getInfoBlock1((data) => {
        window.webContents.send(message.method.name, data)
      });
      device.getInfoBlock2((data) => {
        window.webContents.send(message.method.name, data)
      });
    })
  } else {
    device.command(message);
  }
});

// const ws = new WebSocket('ws://192.168.76.239:8000/ws/bs/', {
//   perMessageDeflate: false
// });
// ws.on('message', function incoming(data) {
//   console.log(data);
// });