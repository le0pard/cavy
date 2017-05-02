import config from 'config';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './root_reducer';
import {AsyncMiddleware} from './middlewares';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';

export const routerHistory = createHistory();

export const initializeStore = (preloadedState = null) => {
  let middlewares = [
    AsyncMiddleware,
    routerMiddleware(routerHistory)
  ];

  if (config.logger.reduxEnabled) {
    middlewares.push(createLogger({
      level: 'info',
      collapsed: true,
      diff: true
    }));
  }

  const store = (() => {
    let storeArg = [
      rootReducer,
      applyMiddleware(...middlewares)
    ];

    if (preloadedState) {
      storeArg.splice(1, 0, preloadedState);
    }

    return createStore(...storeArg);
  })();

  if (module.hot) {
    module.hot.accept('./root_reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
