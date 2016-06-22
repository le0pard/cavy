import pg from 'pg'
import ipcChannels from 'constants/ipc_channels'

const PGInterface = {

  connectToDatabase: ({database, ipcRequestId, event}) => {
    const conString = (() => {
      if (database.socket)
        return `socket:${database.socket}?db=${database.database || 'postgres'}&encoding=utf8`
      else
        return `postgres://${database.username}:${database.password}@${database.hostname || 'localhost'}:${database.port || '5432'}/${database.database || 'postgres'}`
    })()
    pg.connect(conString, (connectError, client, done) => {
      if (connectError)
        return event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: connectError, ipcRequestId})

      return client.query('SELECT VERSION() as version', (queryError, result) => {
        done() //back connection to pool

        if (queryError)
          return event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: queryError, ipcRequestId})

        const {version} = result.rows[0]
        return event.sender.send(ipcChannels.IPC_SUCCESS_CHANNEL, {version, ipcRequestId})
      })
    })
  },

  closeAllPool: () => {
    pg.end()
  }

}

export default PGInterface
