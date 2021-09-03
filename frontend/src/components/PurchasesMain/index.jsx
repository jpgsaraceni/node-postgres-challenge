import React, { useContext, useEffect, useState } from 'react';

import { PurchasesContext } from '../../providers/PurchasesProvider';

import PurchaseLine from '../../components/PurchaseLine';
import { Container } from './styles';
import { FormModal } from '../Modal';
import AddPurchase from '../AddPurchase';

function PurchasesMain() {
    const {purchases, getPurchases, getAll} = useContext(PurchasesContext);
    const [update, setUpdate] = useState(false)
    const [suppliers, setSuppliers] = useState({})
    const [products, setProducts] = useState({})

    function childCallback() {
      setUpdate(!update)
    }

    useEffect(() => {
      getPurchases()
      getAll('suppliers').then(result => setSuppliers(result.data))
      getAll('products').then(result => setProducts(result.data))
    }, [update])

    return (
        <Container>
          <div className="btn-container">
                <FormModal 
                  button={
                    <button type="button">
                      Nova compra
                    </button>}
                  component={
                    <AddPurchase 
                      callback={childCallback} 
                      suppliers={suppliers ? suppliers : ''} 
                      products={products ? products : ''}
                    />
                  }
                />
          </div>
            {
            purchases ?
              purchases.map(purchase => 
                <PurchaseLine purchase={purchase} key={purchase.id} callback={childCallback} />
              )
              : getPurchases()
            }    
        </Container>
    );
}

export default PurchasesMain;