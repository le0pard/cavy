// inits
import './init';
import React from 'react';
import ReactDom from 'react-dom';
import Root from './root';
import {loadInitialState} from './initial_state';
import {initializeStore} from './redux/store';

const renderApp = (Component, appRoot, store) => {
  ReactDom.render(<Component store={store} />, appRoot, () => {
    // need to make this for feature tests - application ready for testing
    window.__isAppReady = true;
  });
};

const loadedApp = (initialState) => {
  const appRoot = document.getElementById('app-root');
  const store = initializeStore(initialState);
  renderApp(Root, appRoot, store);

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./root', () => {
      renderApp(Root, appRoot, store);
    });
  }
};

loadInitialState(loadedApp);
