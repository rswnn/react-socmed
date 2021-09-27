import React from 'react';
import {
  Switch,
  Route,
  Router as BrowserRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import {
  Dashboard, User, Albums
} from 'views';
import { Container, Navbar } from 'components';

const history = createBrowserHistory();

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true
  },
  {
    path: '/user/:id',
    component: User,
    exact: true
  },
  {
    path: '/user/:id/album/:albumId',
    component: Albums,
    exact: true
  },
];

const Routes = () => {
  return (
    <BrowserRouter history={ history }>
      <Navbar history={ history } />
      
      <Container>
        <Switch>
          {
            routes.map(route => <Route exact={ route.exact } key={ route.path } path={ route.path } component={ route.component }/>)
          }
          { /* <Route render={ () => <NotFound history={ history }/> } /> */ }
        </Switch>
        { /* <ScrollToTop history={ history }/> */ }
      </Container>
    </BrowserRouter>
  );
};

export default Routes;
