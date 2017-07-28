import {ipcMain} from 'electron';
import {getIpcOnRendererLoad} from 'shared/ipc';
import _omit from 'lodash/omit';
import {getDatabaseInfo} from '../backend/sqlite/schema';

let connectedDatabases = {};

export const getDatabaseConnection = (windowID) => {
  return connectedDatabases[windowID];
};

export const storeDatabaseConnection = (windowID, connection) => {
  connectedDatabases = {
    ...connectedDatabases,
    [windowID]: connection
  };
};

export const removeDatabaseConnection = (windowID) => {
  const database = getDatabaseConnection(windowID);
  if (database) {
    if (database.connection) {
      database.connection.close();
    }
    connectedDatabases = _omit(connectedDatabases, windowID);
  }
  return connectedDatabases;
};

export const initRenderListener = (windowID) => {
  const actionTypes = getIpcOnRendererLoad(windowID);

  ipcMain.on(actionTypes.IPC_RENDERER_LOADED_REQUEST, (event) => {

    new Promise((resolve, reject) => {
      const dbConnection = getDatabaseConnection(windowID);
      if (dbConnection && dbConnection.connection) {
        return getDatabaseInfo(dbConnection.connection).then((tables) => {
          return resolve({
            sqlite: {
              credentials: {},
              database: {tables}
            }
          });
        });
      } else {
        return resolve({});
      }
    }).then((result) => {
      event.sender.send(
        actionTypes.IPC_RENDERER_LOADED_RESPONSE,
        result
      );
    }).catch(() => {
      event.sender.send(
        actionTypes.IPC_RENDERER_LOADED_RESPONSE,
        {}
      );
    });
  });
};

export const cleanupRenderListener = (windowID) => {
  const actionTypes = getIpcOnRendererLoad(windowID);
  ipcMain.removeAllListeners(actionTypes.IPC_RENDERER_LOADED_REQUEST);
  removeDatabaseConnection(windowID);
};
