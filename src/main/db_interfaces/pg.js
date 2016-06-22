import Promise from 'bluebird'
import pg from 'pg'
import ipcChannels from 'constants/ipc_channels'

let pgClients = {}

const PGInterface = {

  connectToDatabase: ({database, ipcRequestId, event}) => {
    if (!pgClients[database.id]) {
      pgClients[database.id] = new pg.Pool({
        user: database.username,
        password: database.password,
        host: database.socket || database.hostname || 'localhost',
        port: database.port || 5432,
        database: database.database || 'postgres',
        max: 10, // max number of clients in pool
        idleTimeoutMillis: 10000
      })
    }

    pgClients[database.id].connect().then((client) => {
      Promise.all([
        client.query('SELECT VERSION() as version'),
        client.query('SELECT n.nspname AS name, pg_catalog.pg_get_userbyid(n.nspowner) AS owner, pg_catalog.array_to_string(n.nspacl, E\'\n\') AS access_privileges, pg_catalog.obj_description(n.oid, \'pg_namespace\') AS description FROM pg_catalog.pg_namespace n WHERE n.nspname !~ \'^pg_\' AND n.nspname <> \'information_schema\' ORDER BY 1')
      ]).then((results) => {
        const [versionResult, schemasResult] = results
        const {version} = versionResult.rows[0]
        const schemasRows = schemasResult.rows
        if (schemasRows.length) {
          const tablesQueries = schemasRows.map((schema) => client.query('SELECT * FROM information_schema.tables WHERE table_schema = $1', [schema.name]))
          Promise.all(tablesQueries).then((tablesResults) => {
            const schemas = schemasRows.reduce((agg, schema, index) => {
              agg.push({...schema, tables: tablesResults[index].rows})
              return agg
            }, [])
            event.sender.send(ipcChannels.IPC_SUCCESS_CHANNEL, {version, schemas, ipcRequestId})
          }).catch((queryError) => {
            event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: queryError, ipcRequestId})
          }).finally(() => client.release())
        } else {
          client.release()
          event.sender.send(ipcChannels.IPC_SUCCESS_CHANNEL, {version, schemas: [], ipcRequestId})
        }

      }).catch((queryError) => {
        client.release()
        event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: queryError, ipcRequestId})
      })
    }).catch((connectError) => {
      event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: connectError, ipcRequestId})
    })
  },

  closeAllConnections: () => {
    Object.keys(pgClients).forEach((databaseId) => pgClients[databaseId].end())
  }

}

export default PGInterface
