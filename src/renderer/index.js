import React from 'react'
import ReactDom from 'react-dom'
import Root from './root'
import configureStore from './configureStore'

import './pages.css'

const store = configureStore()

ReactDom.render(<Root store={store} />, document.getElementById('app-root'))
