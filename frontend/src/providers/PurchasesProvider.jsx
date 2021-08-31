import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const PurchasesContext = createContext({});

export const PurchasesProvider = (props) => { 
  const [purchases, setPurchases] = useState();

  // useEffect(() => {
  //   api.get('/purchases').then((response) => setPurchases(response.data))
  // }, [])

  const getPurchases = () => {
    api.get('/purchases').then((response) => setPurchases(response.data))
  }

    return (
        <PurchasesContext.Provider value={{purchases, getPurchases}} >
            {props.children}
        </PurchasesContext.Provider>
    );
};

export default PurchasesProvider;
