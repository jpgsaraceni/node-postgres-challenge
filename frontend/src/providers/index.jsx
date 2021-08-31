/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { PurchasesProvider } from './PurchasesProvider';

function AppProvider(props) {
    // nests all the providers in the app.
    return (
        <PurchasesProvider>
          {props.children}
        </PurchasesProvider>
    );
}

export default AppProvider;
