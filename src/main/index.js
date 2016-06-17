import './window'
import {ipcMain} from 'electron'
import ipcChannels from 'constants/ipc_channels'
import ipcActions from 'constants/ipc_actions'
import PGInterface from './db_interfaces/pg'

ipcMain.on(ipcChannels.IPC_REQUEST_CHANNEL, (event, request) => {
  const {ipcRequestId, ipcAction} = request

  switch (ipcAction) {
    case ipcActions.IPC_ACTION_CONNECT_TO_DB:
      const {database} = request
      switch (database.dbType) {
        case 'mysql':
        default:
          return PGInterface.connectToDatabase({database, ipcRequestId, ipcAction, event})
      }
    default:
      event.sender.send(ipcChannels.IPC_SUCCESS_CHANNEL, request)
  }

})
