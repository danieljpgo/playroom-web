import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../modules/Home';
import Points from '../modules/Points';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route
      component={Home}
      path="/"
      exact
    />
    <Route
      component={Points}
      path="/cadastro"
    />
  </BrowserRouter>
);

export default Routes;
