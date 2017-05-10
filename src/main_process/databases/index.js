import {ipcMain} from 'electron';
import {getIpcOnAppLoad} from 'shared/ipc';
import _omit from 'lodash/omit';

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
  const connection = getDatabaseConnection(windowID);
  if (connection) {
    connectedDatabases = _omit(connectedDatabases, windowID);
  }
};

export const provideInitialState = (windowID) => {
  const actionTypes = getIpcOnAppLoad(windowID);

  ipcMain.on(actionTypes.IPC_LOADED_APP_REQUEST, (event) => {
    event.sender.send(actionTypes.IPC_LOADED_APP_RESPONSE, {});
    ipcMain.removeAllListeners(actionTypes.IPC_LOADED_APP_REQUEST);
  });
};
