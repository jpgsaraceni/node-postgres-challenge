import React from 'react';
import GlobalStyle from './styles/GlobalStyle';

import AppProvider from './providers';
import Routes from './routes';

// wraps the provider around the application, and calls the routes and global styles.

function App() {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  );
}

export default App;
