const getTableSchema = (connection, table) => {
  return new Promise((resolve, reject) => {
    connection.all(`PRAGMA table_info(${table.name})`, (err, schema) => {
      if (err) {
        reject(err);
      } else {
        resolve(schema);
      }
    });
  });
};

export const getDatabaseInfo = (connection) => {
  return new Promise((resolve, reject) => {
    const SQL = [
      'SELECT name, type, sql FROM sqlite_master',
      'WHERE (type=\'table\' OR type=\'view\') AND name!=\'\'',
      'AND name NOT LIKE \'sqlite_%\'',
      'ORDER BY \'name\' ASC'
    ].join(' ');
    connection.all(SQL, (err, tables) => {
      if (err) {
        reject(err);
      } else {
        const tablesPromise = tables.map((table) => (
          getTableSchema(connection, table)
        ));

        Promise.all(tablesPromise).then((schemas) => {
          const result = tables.reduce((agg, table, index) => {
            agg[`${table.type}s`].push({
              ...table,
              schema: schemas[index]
            });
            return agg;
          }, {
            tables: [],
            views: []
          });
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  });
};
