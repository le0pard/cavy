import {ipcMain} from 'electron'
import pg from 'pg'
import {PG_CONNECT_CHANNEL, PG_CONNECT_REPLY_CHANNEL} from 'constants/db'
import {generateDBConnection} from './base'
import Logger from 'utils/logger'



ipcMain.on(PG_CONNECT_CHANNEL, (event, arg) => {
  Logger.info('arg', arg)
  event.sender.send(PG_CONNECT_REPLY_CHANNEL, generateDBConnection())
})
