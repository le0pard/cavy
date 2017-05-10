export const getIpcOnAppLoad = (winID) => {
  return {
    IPC_LOADED_APP_REQUEST:  `IPC_LOADED_APP_REQUEST_${winID}`, // channel for ipc
    IPC_LOADED_APP_RESPONSE: `IPC_LOADED_APP_RESPONSE_${winID}` // reply success channel for ipc
  };
};

export const getIpcActionTypes = (winID) => {
  return {
    IPC_CHANNEL:         `IPC_CHANNEL_${winID}`, // channel for ipc
    IPC_SUCCESS_CHANNEL: `IPC_SUCCESS_CHANNEL_${winID}`, // reply success channel for ipc
    IPC_ERROR_CHANNEL:   `IPC_ERROR_CHANNEL_${winID}`  // reply error channel for ipc
  };
};
