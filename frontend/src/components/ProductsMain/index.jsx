import React, { useContext, useEffect, useState } from 'react';

import { PurchasesContext } from '../../providers/PurchasesProvider';

import { Container } from './styles';
import { FormModal } from '../Modal';
import AddProduct from '../AddProduct';

function PurchasesMain() {
    const {getAll} = useContext(PurchasesContext);
    const [update, setUpdate] = useState(false)
    const [products, setProducts] = useState({})

    function childCallback() {
      setUpdate(!update)
    }

    useEffect(() => {
      getAll('products').then(result => setProducts(result.data))
    }, [update])

    return (
        <Container>
          <div className="btn-container">
                <FormModal 
                  button={
                    <button type="button">
                      Cadastrar produto
                    </button>}
                  component={
                    <AddProduct
                      callback={childCallback} 
                    />
                  }
                />
          </div>    
        </Container>
    );
}

export default PurchasesMain;