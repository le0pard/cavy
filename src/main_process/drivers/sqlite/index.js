import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import _endsWith from 'lodash/endsWith';
import _filter from 'lodash/filter';

export const connectToSqliteServer = (folder, extension = 'sqlite3') => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if (err) {
        reject(error);
      }
      const databases = _filter(files, (file) => {
        return _endsWith(file, extension)
      }).map((file) => {
        return path.parse(file).name;
      });

      resolve({databases, extension});
    });
    // const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (error) => {
    //   if (error) {
    //     reject(error);
    //   } else {
    //     resolve(db);
    //   }
    // });
  });
};
