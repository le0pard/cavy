import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {renderRoutes} from 'react-router-config';
import Header from 'components/header';
import LeftSidebar from 'components/left_sidebar';

import './app.sass';

const styleSheet = createStyleSheet('App', theme => ({
  appFrame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%'
  }
}));

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    route: PropTypes.shape({
      routes: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
      ]).isRequired
    }).isRequired
  }

  render() {
    const {classes, route} = this.props;

    return (
      <div className={classes.appFrame}>
        <Header />
        <LeftSidebar />
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
