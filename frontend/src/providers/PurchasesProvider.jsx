import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const PurchasesContext = createContext({});

export const PurchasesProvider = (props) => { 
  const [purchases, setPurchases] = useState();
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [payables, setPayables] = useState();

  const getPurchases = () => {
    api.get('/purchases').then((response) => setPurchases(response.data))
  }

  const getPurchaseItems = () => {
    api.get('/purchase_items')
  }

  const createPurchase = (body) => {
    return new Promise((resolve, reject) => {
    api.post(
      '/purchases',
      {
        "supplier_id":body.supplier_id,
        "total_price":100, 
        "number_of_payments":body.number_of_payments, 
        "product_id":body.product_id, 
        "amount":body.amount, 
        "unit_price":20, 
        "payment_price":100, 
        "due_date": "2021-09-21", 
        "purchase_date": "NOW()", 
        "payment_number": 1
      }).then((response) => {
        if (response.status === 200) resolve(true);
      }).catch((e) => {
        console.log(e)
        reject(e)
      });
    });

  }

    return (
        <PurchasesContext.Provider value={{purchases, getPurchases, createPurchase}} >
            {props.children}
        </PurchasesContext.Provider>
    );
};

export default PurchasesProvider;
