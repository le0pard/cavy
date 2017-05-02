import keyMirror from 'fbjs/lib/keyMirror';

export const actionTypes = keyMirror({
  IPC_CHANNEL:         null, // channel for ipc
  IPC_SUCCESS_CHANNEL: null, // reply success channel for ipc
  IPC_ERROR_CHANNEL:   null  // reply error channel for ipc
});
