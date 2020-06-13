import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../modules/Home';
import Points from '../modules/Points';
import Navigation from '../common/layout/Navigation';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Navigation>
      <Switch>
        <Route
          component={Home}
          path="/"
          exact
        />
        <Route
          component={Points}
          path="/cadastro"
        />
      </Switch>
    </Navigation>
  </BrowserRouter>
);

export default Routes;
