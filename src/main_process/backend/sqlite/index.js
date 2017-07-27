import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import _endsWith from 'lodash/endsWith';
import _filter from 'lodash/filter';
import {SQLITE_TYPE} from 'shared/constants';
import {storeDatabaseConnection} from '../../databases';

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
    // const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (error) => {
    //   if (error) {
    //     reject(error);
    //   } else {
    //     resolve(db);
    //   }
    // });
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
