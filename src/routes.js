import App from './pages/app';
import ServerDashboard from './pages/server_dashboard';

// routes
export const routes = [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: ServerDashboard
  }]
}];
