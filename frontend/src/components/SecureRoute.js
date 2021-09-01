import { Redirect, Route } from 'react-router-dom';
import React from 'react';

const SecureRoute = ({
  path,
  condition,
  children,
  redirectPath = '/',
  ...routeProps
}) => (
  <Route path={path} exact {...routeProps}>
    {!!condition ? children : <Redirect to={redirectPath} exact />}
  </Route>
);

export default SecureRoute;
