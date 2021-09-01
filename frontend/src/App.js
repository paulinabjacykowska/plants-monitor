import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlantsList from './screens/PlantsList/PlantsList';
import SecureRoute from './components/SecureRoute';
import PlantDetails from './screens/PlantDetails';
import SensorsList from './screens/SensorsList/SensorsList';
import Register from './screens/Register';
import { useAuth } from './services/auth';
import Login from './screens/Login';
import Home from './screens/Home';
import React from 'react';
import './App.css';

function App() {
  const { isLoggedIn, isInitLoading } = useAuth();

  if (isInitLoading) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PlantsList /> : <Home />}
        </Route>
        <SecureRoute path="/login" condition={!isLoggedIn}>
          <Login />
        </SecureRoute>
        <SecureRoute path="/register" condition={!isLoggedIn}>
          <Register />
        </SecureRoute>

        <SecureRoute path="/plants" condition={isLoggedIn}>
          <PlantsList />
        </SecureRoute>
        <SecureRoute path="/sensors" condition={isLoggedIn}>
          <SensorsList />
        </SecureRoute>
        <SecureRoute path="/plant/:id" condition={isLoggedIn}>
          <PlantDetails />
        </SecureRoute>
      </Switch>
    </Router>
  );
}
export default App;
