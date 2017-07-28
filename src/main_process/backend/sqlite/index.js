import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import _endsWith from 'lodash/endsWith';
import _filter from 'lodash/filter';
import {SQLITE_TYPE} from 'shared/constants';
import {getDatabaseConnection, storeDatabaseConnection} from '../../databases';

const connectToServer = (folder, extension = 'sqlite3') => {
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
  });
};

export const connectToSqliteServer = ({
  args,
  winID,
  handleSuccessResponse,
  handleErrorResponse
}) => {
  const {folder} = args.params;
  return connectToServer(folder).then(({databases, extension}) => {
    const result = {
      type: SQLITE_TYPE,
      folder,
      databases,
      extension
    };
    storeDatabaseConnection(winID, result);
    return handleSuccessResponse(result);
  }).catch((error) => {
    return handleErrorResponse(error);
  });
};

export const connectToSqliteDatabase = ({
  args,
  winID,
  handleSuccessResponse,
  handleErrorResponse
}) => {
  const {databaseName} = args;
  const databaseConnection = getDatabaseConnection(winID);
  if (databaseConnection.connection) {
    databaseConnection.connection.close();
  }
  const dbPath = path.join(databaseConnection.folder, `${databaseName}.${databaseConnection.extension}`);
  const connection = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (error) => {
    if (error) {
      handleErrorResponse(error);
    } else {
      storeDatabaseConnection(winID, {
        ...databaseConnection,
        databaseName,
        connection
      });
      const SQL = [
        'SELECT name, type FROM sqlite_master',
        'WHERE (type=\'table\') AND name!=\'\'',
        'AND name NOT LIKE \'sqlite_%\'',
        'ORDER BY \'name\' ASC'
      ].join(' ');
      connection.all(SQL, (err, tables) => {
        if (err) {
          handleErrorResponse(err);
        } else {
          handleSuccessResponse({
            tables
          });
        }
      });

    }
  });
};

export const selectSqliteTable = ({
  args,
  winID,
  handleSuccessResponse,
  handleErrorResponse
}) => {
  const {tableName} = args;
  const databaseConnection = getDatabaseConnection(winID);
  // FIXME: https://github.com/mapbox/node-sqlite3/issues/279 bind params not works for PRAGMA, need sanitize input manually
  databaseConnection.connection.all(`PRAGMA table_info(${tableName})`, (err, info) => {
    if (err) {
      handleErrorResponse(err);
    } else {
      handleSuccessResponse({
        info
      });
    }
  });
};
