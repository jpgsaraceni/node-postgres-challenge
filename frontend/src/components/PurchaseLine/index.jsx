import React, { useContext, useState } from 'react';
import { PurchasesContext } from '../../providers/PurchasesProvider';
import { DeleteModal } from '../Modal';

import { Container } from './styles';

function PurchaseLine({purchase, callback}) {
  const {deletePurchase} = useContext(PurchasesContext);

  const {create_date, total_price, number_of_payments} = purchase;
  const date = new Date(create_date).toLocaleDateString();

  const confirmDelete = async () => {
    await deletePurchase(purchase.id)
    callback()
  }

    return (
        <Container>
          <div className="info">
            <p>Data da compra: {date}</p>
            <p>Valor da compra: <span>R${total_price}</span></p>
            <p>Número de parcelas: <span>{number_of_payments}</span></p>
          </div>
          <div className="actions">
            <button>Detalhes</button>
            <button>Parcelas</button>
            <DeleteModal
              button={<button>Deletar</button>}
              confirm={confirmDelete}
              title={'Tem certeza que deseja deletar essa compra? As contas a pagar vinculadas também serão apagadas.'}
            >
            </DeleteModal>
          </div>
        </Container>
    );
}

export default PurchaseLine;
