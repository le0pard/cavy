import path from 'path';
import url from 'url';
import uuid from 'node-uuid';
import _omit from 'lodash/omit';
import {BrowserWindow} from 'electron';
import windowStateKeeper from 'electron-window-state';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindows = {};

export const isAllWindowsClosed = () => {
  return 0 === Object.keys(appWindows).length;
};

export const createNewWindow = () => {
  const windowID = uuid.v4();

  const mainWindowState = windowStateKeeper({
    defaultWidth: 960,
    defaultHeight: 640
  });

  appWindows[windowID] = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  });

  mainWindowState.manage(appWindows[windowID]);

  // and load the index.html of the app.
  if (process.env.CAVY_DEV) {
    appWindows[windowID].loadURL('http://localhost:8888/');
    appWindows[windowID].webContents.openDevTools();
  } else {
    appWindows[windowID].loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  appWindows[windowID].on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    appWindows = _omit(appWindows, windowID);
  });
};
