import electron from 'electron'
import PGInterface from './db_interfaces/pg'
// Module to control application life.
const {app, BrowserWindow} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width:  1024,
    height: 768,
    title: 'Cavy'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if ('undefined' !== typeof process && 'development' === process.env.NODE_ENV) {
    mainWindow.webContents.openDevTools() // Open the DevTools.
    mainWindow.maximize()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    PGInterface.closeAllPool() // close all pg pools
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if ('darwin' !== process.platform)
    app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (null === mainWindow)
    createWindow()
})
