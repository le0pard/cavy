import App from './pages/app';
import Login from './pages/login';

// routes
export const routes = [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: Login
  }]
}];
