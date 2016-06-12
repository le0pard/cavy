import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import Layout from './pages/layout'
import TestPage from './pages/test'


class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route component={Layout} path='/'>
          <IndexRoute component={TestPage} />
        </Route>
      </Router>
    )
  }
}

export default App
