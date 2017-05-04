/*
const pool = new pg.Pool({
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
});

ipcMain.on(actionTypes.IPC_CHANNEL, (event, arg) => {
  console.log(arg);
  const {ipcUUID, ...rest} = arg;
  const result = {pong: true};

  pool.connect((err, client, done) => {
    if (err) {
      event.sender.send(actionTypes.IPC_ERROR_CHANNEL, {ipcUUID, error: err});
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT datname, datdba, encoding, datcollate, datctype, datallowconn, datconnlimit FROM pg_database WHERE datistemplate = false;', [], (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        event.sender.send(actionTypes.IPC_ERROR_CHANNEL, {ipcUUID, error: err});
        return console.error('error running query', err);
      }
      event.sender.send(actionTypes.IPC_SUCCESS_CHANNEL, {ipcUUID, result: result.rows});
    });
  });

});
*/
