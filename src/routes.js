import App from './pages/app';
import DbConnect from './pages/db_connect';

// routes
export const routes = [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: DbConnect
  }]
}];
