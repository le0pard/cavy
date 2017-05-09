import sqlite3 from 'sqlite3';

const connectToSqliteServer = (path) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });
}
