import React from 'react';

import { Container } from './styles';

function PurchaseLine({purchase}) {
  const {create_date, total_price, number_of_payments} = purchase;
  const date = new Date(create_date).toLocaleDateString();

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
            <button>Deletar</button>
          </div>
        </Container>
    );
}

export default PurchaseLine;
