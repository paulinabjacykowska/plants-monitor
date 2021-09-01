import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TOKEN_STORAGE_KEY } from '../constants';
import * as api from '../api';

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
      setIsLoggedIn(false);
      setIsInitLoading(false);
      return;
    }

    api
      .checkIsLoggedIn()
      .then(response => {
        setIsLoggedIn(response.data);
        !response.data && localStorage.removeItem(TOKEN_STORAGE_KEY);
      })
      .finally(() => setIsInitLoading(false));
  }, []);

  const login = useCallback(({ email, password }) => {
    return api.login({ email, password }).then(response => {
      setIsLoggedIn(true);
      localStorage.setItem(TOKEN_STORAGE_KEY, response.data.token);
    });
  }, []);

  const register = useCallback(({ email, password, name }) => {
    return api.register({ email, password, name }).then(response => {
      setIsLoggedIn(true);
      localStorage.setItem(TOKEN_STORAGE_KEY, response.data.token);
    });
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  const state = {
    isLoggedIn,
    isInitLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
