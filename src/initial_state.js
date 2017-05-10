import {ipcRenderer, remote} from 'electron';
import {getIpcOnAppLoad} from 'shared/ipc';

export const loadInitialState = (callback) => {
  const winID = remote.getCurrentWindow().id;
  const actionTypes = getIpcOnAppLoad(winID);

  ipcRenderer.on(actionTypes.IPC_LOADED_APP_RESPONSE, (_, initialState) => {
    callback(initialState);
    ipcRenderer.removeAllListeners(actionTypes.IPC_LOADED_APP_RESPONSE);
  });
  ipcRenderer.send(actionTypes.IPC_LOADED_APP_REQUEST);
};
