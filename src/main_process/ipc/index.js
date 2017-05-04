import {ipcMain} from 'electron';
import {getIpcActionTypes} from 'shared/ipc';
import {driverResponse} from '../drivers';

const initSuccessResponse = ({actionTypes, event, args}) => (result) => {
  const {ipcSuccess} = args;
  event.sender.send(actionTypes.IPC_SUCCESS_CHANNEL, {ipcSuccess, result});
};

const initErrorResponse = ({actionTypes, event, args}) => (error) => {
  const {ipcFailure} = args;
  event.sender.send(actionTypes.IPC_ERROR_CHANNEL, {ipcFailure, error});
};

const handleIpcRequest = ({actionTypes, event, args}) => {
  const handleSuccessResponse = initSuccessResponse({actionTypes, event, args});
  const handleErrorResponse = initErrorResponse({actionTypes, event, args});
  driverResponse({args, handleSuccessResponse, handleErrorResponse});
};

export const listenIpcChannels = (winID) => {
  const actionTypes = getIpcActionTypes(winID);
  ipcMain.on(actionTypes.IPC_CHANNEL, (event, args) => {
    handleIpcRequest({actionTypes, event, args});
  });
};

export const removeIpcChannels = (winID) => {
  const actionTypes = getIpcActionTypes(winID);
  ipcMain.removeAllListeners(actionTypes.IPC_CHANNEL);
};
