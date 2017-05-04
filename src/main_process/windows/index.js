import path from 'path';
import url from 'url';
import uuid from 'node-uuid';
import _omit from 'lodash/omit';
import {BrowserWindow} from 'electron';
import windowStateKeeper from 'electron-window-state';
import {listenIpcChannels, removeIpcChannels} from '../ipc';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindows = {};

const createWindowWithID = (options = {}) => {
  const windowUUID = uuid.v4();
  appWindows = {
    ...appWindows,
    [windowUUID]: new BrowserWindow(options)
  };
  return {
    windowUUID,
    win: appWindows[windowUUID]
  };
};

const removeWindowByID = (windowUUID) => {
  appWindows = _omit(appWindows, windowUUID);
};

export const isAllWindowsClosed = () => {
  return 0 === Object.keys(appWindows).length;
};

export const createNewWindow = () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 960,
    defaultHeight: 640
  });

  const {windowUUID, win} = createWindowWithID({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  });

  mainWindowState.manage(win);

  const winID = win.id;
  listenIpcChannels(winID);

  // and load the index.html of the app.
  if (process.env.CAVY_DEV) {
    win.loadURL('http://localhost:8888/');
    win.webContents.openDevTools();
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    removeIpcChannels(winID);
    removeWindowByID(windowUUID);
  });

  return {windowUUID, win};
};
