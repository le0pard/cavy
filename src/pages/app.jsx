import React from 'react';
import PropTypes from 'prop-types';
import {renderRoutes} from 'react-router-config';

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

    return renderRoutes(route.routes);
  }
}

export default App;
