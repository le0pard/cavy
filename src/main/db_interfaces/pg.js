import Promise from 'bluebird'
import pg from 'pg'
import ipcChannels from 'constants/ipc_channels'
import _groupBy from 'lodash/collection/groupBy'

let pgClients = {}

const PGInterface = {

  connectToDatabase: ({database, ipcRequestId, event}) => {
    const pgHostname = database.socket || database.hostname || 'localhost'
    const pgPort = database.port || 5432
    const pgDatabase = database.database || 'postgres'
    if (!pgClients[database.id]) {
      pgClients[database.id] = new pg.Pool({
        user: database.username,
        password: database.password,
        host: pgHostname,
        port: pgPort,
        database: pgDatabase,
        max: 10, // max number of clients in pool
        idleTimeoutMillis: 10000
      })
    }

    pgClients[database.id].connect().then((client) => {
      Promise.all([
        client.query('SELECT VERSION() as version'),
        client.query('SELECT pg_database.datname as name FROM pg_database WHERE pg_database.datistemplate = $1 AND pg_database.datallowconn = $2', [false, true]),
        client.query('SELECT n.nspname AS name, pg_catalog.pg_get_userbyid(n.nspowner) AS owner, pg_catalog.array_to_string(n.nspacl, E\'\n\') AS access_privileges, pg_catalog.obj_description(n.oid, \'pg_namespace\') AS description FROM pg_catalog.pg_namespace n WHERE n.nspname !~ \'^pg_\' AND n.nspname <> \'information_schema\' ORDER BY 1')
      ]).then((results) => {
        const [versionResult, databasesResult, schemasResult] = results
        const {version} = versionResult.rows[0]
        const databasesRows = databasesResult.rows
        const schemasRows = schemasResult.rows
        if (schemasRows.length) {
          const tablesQueries = schemasRows.map((schema) => client.query('SELECT * FROM information_schema.tables WHERE table_schema = $1', [schema.name]))
          Promise.all(tablesQueries).then((tablesResults) => {
            const schemas = schemasRows.reduce((agg, schema, index) => {
              const tables = _groupBy(tablesResults[index].rows, (table) => table.table_type)
              agg.push({...schema,
                tables: tables['BASE TABLE'] || [],
                views: tables['VIEW'] || [],
                ['foreign_tables']: tables['FOREIGN TABLE'] || [],
                ['local_temporary_tables']: tables['LOCAL TEMPORARY'] || []
              })
              return agg
            }, [])
            PGInterface._returnSchemaWithDatabases({pgDatabase, version, databasesRows, schemas, ipcRequestId, event})
          }).catch((queryError) => {
            event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: queryError, ipcRequestId})
          }).finally(() => client.release())
        } else {
          client.release()
          PGInterface._returnSchemaWithDatabases({pgDatabase, version, databasesRows, schemas: [], ipcRequestId, event})
        }

      }).catch((queryError) => {
        client.release()
        event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: queryError, ipcRequestId})
      })
    }).catch((connectError) => {
      event.sender.send(ipcChannels.IPC_ERROR_CHANNEL, {error: connectError, ipcRequestId})
    })
  },

  _returnSchemaWithDatabases({pgDatabase, version, databasesRows, schemas, ipcRequestId, event}) {
    const databases = databasesRows.map((database) => {
      if (database.name === pgDatabase)
        return {...database, schemas}
      else
        return database
    })
    event.sender.send(ipcChannels.IPC_SUCCESS_CHANNEL, {version, databases, ipcRequestId})
  },

  closeAllConnections: () => {
    Object.keys(pgClients).forEach((databaseId) => pgClients[databaseId].end())
  }

}

export default PGInterface
