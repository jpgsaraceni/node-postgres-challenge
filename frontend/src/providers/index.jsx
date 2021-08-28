/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { UserProvider } from './UserProvider';

function AppProvider(props) {
    // nests all the providers in the app.
    return (
        <UserProvider>
          {props.children}
        </UserProvider>
    );
}

export default AppProvider;
