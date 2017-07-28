import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import _endsWith from 'lodash/endsWith';
import _filter from 'lodash/filter';
import {SQLITE_TYPE} from 'shared/constants';
import {getDatabaseConnection, storeDatabaseConnection} from '../../databases';
import {getDatabaseInfo} from './schema';

export const connectToSqliteServer = ({
  args,
  winID,
  handleSuccessResponse,
  handleErrorResponse
}) => {
  const {folder} = args.params;
  const extension = 'sqlite3';
  return fs.readdir(folder, (err, files) => {
    if (err) {
      return handleErrorResponse(err);
    }
    const databases = _filter(files, (file) => {
      return _endsWith(file, extension)
    }).map((file) => {
      return path.parse(file).name;
    });

    const result = {
      type: SQLITE_TYPE,
      folder,
      databases,
      extension
    };
    storeDatabaseConnection(winID, result);
    return handleSuccessResponse(result);
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
      getDatabaseInfo(connection).then((schema) => {
        handleSuccessResponse(schema);
      }).catch((err) => {
        handleErrorResponse(err);
      });
    }
  });
};
