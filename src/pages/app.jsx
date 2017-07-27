import React from 'react';
import PropTypes from 'prop-types';
import {renderRoutes} from 'react-router-config';
import Header from 'components/header';
import LeftSidebar from 'components/left_sidebar';

import './app.sass';

class App extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      routes: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
      ]).isRequired
    }).isRequired
  }

  render() {
    const {route} = this.props;

    return (
      <div>
        <Header />
        <div>
          <LeftSidebar />
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default App;
