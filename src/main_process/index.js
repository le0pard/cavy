import {app} from 'electron';
import {appMainMenu} from './menu';
import {isAllWindowsClosed, createWindow} from './windows';
import './engines';

// Report crashes to our server.
//require('crash-reporter').start();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  appMainMenu();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if ('darwin' !== process.platform) app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (isAllWindowsClosed()) createWindow();
});
