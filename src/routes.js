import App from './pages/app';
import ServerConnect from './pages/server_connect';

// routes
export const routes = [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: ServerConnect
  }]
}];
