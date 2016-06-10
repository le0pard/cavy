import {ipcRenderer} from 'electron'
import uuid from 'node-uuid'
import {PG_CONNECT_CHANNEL, PG_CONNECT_REPLY_CHANNEL} from 'constants/db'

import './app.css'

setTimeout(function(){
  ipcRenderer.on(PG_CONNECT_REPLY_CHANNEL, (event, arg) => {
    console.log(arg)
  })
  ipcRenderer.send(PG_CONNECT_CHANNEL, uuid.v4())
}, 2000)
