import {ipcMain} from 'electron';
import {getIpcActionTypes} from 'shared/ipc';
import {driverResponse} from '../drivers';

const initSuccessResponse = ({actionTypes, event, ipcSuccess}) => (result) => {
  event.sender.send(actionTypes.IPC_SUCCESS_CHANNEL, {ipcSuccess, result});
};

const initErrorResponse = ({actionTypes, event, ipcFailure}) => (error) => {
  event.sender.send(actionTypes.IPC_ERROR_CHANNEL, {ipcFailure, error});
};

const handleIpcRequest = ({winID, actionTypes, event, args}) => {
  const {ipcSuccess, ipcFailure} = args;
  const handleSuccessResponse = initSuccessResponse({actionTypes, event, ipcSuccess});
  const handleErrorResponse = initErrorResponse({actionTypes, event, ipcFailure});
  driverResponse({args, winID, handleSuccessResponse, handleErrorResponse});
};

export const listenIpcChannels = (winID) => {
  const actionTypes = getIpcActionTypes(winID);
  ipcMain.on(actionTypes.IPC_CHANNEL, (event, args) => {
    handleIpcRequest({winID, actionTypes, event, args});
  });
};

export const removeIpcChannels = (winID) => {
  const actionTypes = getIpcActionTypes(winID);
  ipcMain.removeAllListeners(actionTypes.IPC_CHANNEL);
};
