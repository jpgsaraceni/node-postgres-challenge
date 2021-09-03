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

  const getAll = async (table) => {
    const result = await api.get(`/${table}`)
    return result
  }

  const purchaseDetails = async (purchaseId) => {
    const result = await api.get(`/purchases/${purchaseId}`)
    return result
  }

  const productDetails = async (id) => {
    const result = await api.get(`/products/${id}`)
    return result
  }

  const getDetails = async (table, id) => {
    const result = await api.get(`/${table}/${id}`)
    return result
  }

  const createPurchase = (body) => {
    return new Promise((resolve, reject) => {
    
    const totalPrice = body.amount*body.unitPrice

    api.post(
      '/purchases',
      {
        "supplier_id":body.supplier_id,
        "total_price": totalPrice, 
        "number_of_payments":body.number_of_payments, 
        "product_id": body.product_id, 
        "amount":body.amount, 
        "unit_price": body.unitPrice, 
        "payment_price": body.unitPrice, 
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
          payables,
          getPurchases, 
          createPurchase, 
          deletePurchase,
          purchaseDetails,
          productDetails,
          getDetails,
          getAll,
          // getPurchaseItems,
        }} >
          {props.children}
        </PurchasesContext.Provider>
    );
};

export default PurchasesProvider;
