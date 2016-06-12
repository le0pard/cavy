import './window'
import {ipcMain} from 'electron'
import channels from 'constants/ipc'
import Logger from './logger'

ipcMain.on(channels.IPC_CHANNEL, (event, request) => {
  Logger.info(channels.IPC_CHANNEL, request)
  event.sender.send(channels.IPC_SUCCESS_CHANNEL, request)
})
