export const getDatabaseInfo = (connection) => {
  return new Promise((resolve, reject) => {
    const SQL = [
      'SELECT name, type FROM sqlite_master',
      'WHERE (type=\'table\') AND name!=\'\'',
      'AND name NOT LIKE \'sqlite_%\'',
      'ORDER BY \'name\' ASC'
    ].join(' ');
    connection.all(SQL, (err, tables) => {
      if (err) {
        reject(err);
      } else {
        Promise.all(tables.map((table) => {
          return new Promise((resolvePragma, rejectPragma) => {
            connection.all(`PRAGMA table_info(${table.name})`, (err, schema) => {
              if (err) {
                rejectPragma(err);
              } else {
                resolvePragma(schema);
              }
            });
          })
        })).then((schemas) => {
          const resultTables = tables.map((table, index) => {
            return {
              ...table,
              schema: schemas[index]
            };
          });
          resolve(resultTables);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  });
};
