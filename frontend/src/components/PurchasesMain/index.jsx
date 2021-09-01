import React, { useContext } from 'react';

import { PurchasesContext } from '../../providers/PurchasesProvider';

import PurchaseLine from '../../components/PurchaseLine';
import { Container } from './styles';
import {FormModal} from '../Modal';
import AddPurchase from '../AddPurchase';
import api from '../../services/api';

function PurchasesMain() {
    const {purchases, getPurchases} = useContext(PurchasesContext);

    return (
        <Container>
          <div className="btn-container">
                <FormModal 
                  button={
                    <button type="button">
                      Nova compra
                    </button>}
                  component={<AddPurchase />}
                  confirm={() => {}}
                />
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