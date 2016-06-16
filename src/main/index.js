import './window'
import pg from 'pg'
import {ipcMain} from 'electron'
import channels from 'constants/ipc'
import Logger from './logger'

ipcMain.on(channels.IPC_CHANNEL, (event, request) => {
  Logger.info(channels.IPC_CHANNEL, request)

  const {ipcRequestId, ipcAction} = request

  switch (ipcAction) {
    case 'connectToDB':
      pg.connect('postgres://leo:@localhost:5432/leo', (error, client, done) => {
        if (error)
          return event.sender.send(channels.IPC_ERROR_CHANNEL, {error, ipcRequestId, ipcAction})

        return client.query('SELECT VERSION() as version', (err, result) => {
          done()
          const {version} = result.rows[0]
          if (err)
            return event.sender.send(channels.IPC_ERROR_CHANNEL, {error: err, ipcRequestId, ipcAction})
          return event.sender.send(channels.IPC_SUCCESS_CHANNEL, {version, ipcRequestId, ipcAction})
        })
      })
      break
    default:
      event.sender.send(channels.IPC_SUCCESS_CHANNEL, request)
  }

})
