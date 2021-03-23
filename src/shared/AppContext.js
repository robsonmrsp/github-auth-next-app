import React, { createContext, useReducer } from 'react';

const reducer = (state, pair) => ({ ...state, ...pair });

export const AppContext = createContext();

const initialState = {
  userName: '',
  isAuthUser: false,
  loading: false,
  user: null,
  authUser: null,
  starredRepos: [],
  isUserLoggedIn: false,
  secondUser: null,
};

export const AppProvider = ({ children }) => {
  const [state, update] = useReducer(reducer, initialState);
  return (
    <>
      <AppContext.Provider value={{ state, update }}>{children}</AppContext.Provider>
    </>
  );
};
