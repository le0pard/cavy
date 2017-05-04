import {ipcMain} from 'electron';
import {actionTypes} from 'shared/ipc';

const ipcChannelBuss = (winID, event, arg) => {
  event.sender.send(`${actionTypes.IPC_SUCCESS_CHANNEL}_${winID}`, {...arg, result: 'pong'});
};

export const listenIpcChannels = (winID) => {
  ipcMain.on(`${actionTypes.IPC_CHANNEL}_${winID}`, (event, arg) => ipcChannelBuss(winID, event, arg));
};

export const removeIpcChannels = (winID) => {
  ipcMain.removeAllListeners(`${actionTypes.IPC_CHANNEL}_${winID}`);
};
