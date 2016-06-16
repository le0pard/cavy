import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import AppLayout from './pages/app_layout'
import DatabasePage from './pages/database'
import IndexPage from './pages/index'


class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route component={AppLayout} path='/'>
          <Route component={DatabasePage} path='databases/:id' />
          <IndexRoute component={IndexPage} />
        </Route>
      </Router>
    )
  }
}

export default App
