import './window'
import {ipcMain} from 'electron'
import dabatasesConstants from 'constants/databases'
import ipcChannels from 'constants/ipc_channels'
import ipcActions from 'constants/ipc_actions'
import PGInterface from './db_interfaces/pg'

ipcMain.on(ipcChannels.IPC_REQUEST_CHANNEL, (event, request) => {
  const {ipcRequestId, ipcAction} = request

  switch (ipcAction) {
    case ipcActions.IPC_ACTION_CONNECT_TO_DB:
      const {database} = request
      switch (database.dbType) {
        case dabatasesConstants.MYSQL_DATABASE:
          return true
        case dabatasesConstants.PG_DATABASE:
          return PGInterface.connectToDatabase({database, ipcRequestId, event})
        case dabatasesConstants.SQLITE_DATABASE:
          return true
      }
    default:
      event.sender.send(ipcChannels.IPC_SUCCESS_CHANNEL, request)
  }

  return true

})
