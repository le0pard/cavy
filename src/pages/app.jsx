import React from 'react';
import PropTypes from 'prop-types';
import {renderRoutes} from 'react-router-config';
import Header from 'components/header';
import LeftSidebar from 'components/left_sidebar';
import RightSidebar from 'components/right_sidebar';

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
          <div className="wrapper">
            <LeftSidebar />
            <div id="content">{renderRoutes(route.routes)}</div>
            <RightSidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
