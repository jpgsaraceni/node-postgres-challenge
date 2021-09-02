import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const PurchasesContext = createContext({});

export const PurchasesProvider = (props) => { 
  const [purchases, setPurchases] = useState();
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [payables, setPayables] = useState();

  const getPurchases = () => {
    api.get('/purchases')
      .then((response) => setPurchases(response.data))
      .catch((error) => console.log(error))
  }

  // const getPurchaseItems = (purchaseId) => {
  //   api.get(`/purchase_items/${purchaseId}`)
  //     .then((response) => { return response.data })
  //     .catch((error) => console.log(error))
  // }

  const createPurchase = (body) => {
    return new Promise((resolve, reject) => {
    api.post(
      '/purchases',
      {
        "supplier_id":body.supplier_id,
        "total_price":100, 
        "number_of_payments":body.number_of_payments, 
        "product_id":2, 
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

  const deletePurchase = (id) => {
    api.delete('/purchases', {data: {id: id}}).then(response => {return true}).catch(err => { return false })
  }

    return (
        <PurchasesContext.Provider value={{
          purchases,
          purchaseItems,
          getPurchases, 
          createPurchase, 
          deletePurchase,
          // getPurchaseItems,
        }} >
          {props.children}
        </PurchasesContext.Provider>
    );
};

export default PurchasesProvider;
