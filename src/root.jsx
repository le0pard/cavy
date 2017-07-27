import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import {blue, orange, red} from 'material-ui/colors';
import {Provider} from 'react-redux';
import {routerHistory} from './redux/store';
import {ConnectedRouter} from 'react-router-redux';
import {renderRoutes} from 'react-router-config';
import {routes} from './routes';

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const {store} = this.props;
    const muiTheme = createMuiTheme({
      palette: createPalette({
        primary: blue,
        accent: orange,
        error: red,
        type: 'light'
      })
    });

    return (
      <Provider store={store} key="provider">
        <ConnectedRouter history={routerHistory}>
          <MuiThemeProvider theme={muiTheme}>
            {renderRoutes(routes)}
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
