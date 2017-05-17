import {ipcRenderer, remote} from 'electron';
import {getIpcOnRendererLoad} from 'shared/ipc';

export const loadInitialState = (callback) => {
  const winID = remote.getCurrentWindow().id;
  const actionTypes = getIpcOnRendererLoad(winID);

  ipcRenderer.on(actionTypes.IPC_RENDERER_LOADED_RESPONSE, (_, initialState) => {
    callback(initialState);
    ipcRenderer.removeAllListeners(actionTypes.IPC_RENDERER_LOADED_RESPONSE);
  });
  ipcRenderer.send(actionTypes.IPC_RENDERER_LOADED_REQUEST);
};
