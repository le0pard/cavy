import {ipcMain} from 'electron';
import {getIpcOnRendererLoad} from 'shared/ipc';
import _omit from 'lodash/omit';

let connectedDatabases = {};

const getDatabaseConnection = (windowID) => {
  return connectedDatabases[windowID];
};

export const storeDatabaseConnection = (windowID, connection) => {
  connectedDatabases = {
    ...connectedDatabases,
    [windowID]: connection
  };
};

const removeDatabaseConnection = (windowID) => {
  const connection = getDatabaseConnection(windowID);
  if (connection) {
    connectedDatabases = _omit(connectedDatabases, windowID);
  }
};

export const initRenderListener = (windowID) => {
  const actionTypes = getIpcOnRendererLoad(windowID);

  ipcMain.on(actionTypes.IPC_RENDERER_LOADED_REQUEST, (event) => {
    event.sender.send(actionTypes.IPC_RENDERER_LOADED_RESPONSE, {});
  });
};

export const cleanupRenderListener = (windowID) => {
  const actionTypes = getIpcOnRendererLoad(windowID);
  ipcMain.removeAllListeners(actionTypes.IPC_RENDERER_LOADED_REQUEST);
  removeDatabaseConnection(windowID);
};
