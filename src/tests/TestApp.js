import React, { useContext } from 'react';
import { AppProvider } from '@/shared/AppContext';

const App = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default App;
