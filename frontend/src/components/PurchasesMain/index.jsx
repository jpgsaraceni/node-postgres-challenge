import React, { useContext, useEffect, useState } from 'react';

import { PurchasesContext } from '../../providers/PurchasesProvider';

import PurchaseLine from '../../components/PurchaseLine';
import { Container } from './styles';
import { FormModal } from '../Modal';
import AddPurchase from '../AddPurchase';

function PurchasesMain() {
    const {purchases, getPurchases} = useContext(PurchasesContext);
    const [update, setUpdate] = useState(false)

    function childCallback() {
      setUpdate(!update)
    }

    useEffect(() => {
      getPurchases()
    }, [update])

    return (
        <Container>
          <div className="btn-container">
                <FormModal 
                  button={
                    <button type="button">
                      Nova compra
                    </button>}
                  component={<AddPurchase callback={childCallback} />}
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