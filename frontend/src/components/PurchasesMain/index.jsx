import React, { useContext } from 'react';

import { PurchasesContext } from '../../providers/PurchasesProvider';

import PurchaseLine from '../../components/PurchaseLine';
import { Container } from './styles';

function PurchasesMain() {
    const {purchases, getPurchases} = useContext(PurchasesContext);

    return (
        <Container>
          <div className="btn-container">
            <button>Nova compra</button>
          </div>
            {
            purchases 
              ? purchases.map(purchase => 
                <PurchaseLine purchase={purchase} key={purchase.id} />
              ):
              getPurchases()
            }    
        </Container>
    );
}

export default PurchasesMain;