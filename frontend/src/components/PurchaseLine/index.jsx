import React from 'react';

import { Container } from './styles';

function PurchaseLine({purchase}) {
    return (
        <Container>
          <div className="info">
            <p>ID da compra: {purchase.id}</p>
            <p>Valor da compra: <span>R${purchase.total_price}</span></p>
          </div>
          <div className="actions">
            <button>VER CONTAS A PAGAR</button>
            <button>DELETAR COMPRA</button>
          </div>
        </Container>
    );
}

export default PurchaseLine;
