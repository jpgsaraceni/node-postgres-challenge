import React, { useContext, useEffect, useState } from 'react';
import { PurchasesContext } from '../../providers/PurchasesProvider';
import { DeleteModal, DetailsModal } from '../Modal';

import { Container } from './styles';

function PurchaseLine({purchase, callback}) {

  const {deletePurchase, purchaseDetails, productDetails, getDetails} = useContext(PurchasesContext);

  const {create_date, total_price, number_of_payments, supplier_id} = purchase;
  const date = new Date(create_date).toLocaleDateString();

  const [items, setItems] = useState({});
  const [payables, setPayables] = useState();
  const [products, setProducts] = useState({})
  const [supplier, setSupplier] = useState({})

  const confirmDelete = async () => {
    await deletePurchase(purchase.id)
    callback()
  }

  useEffect(() => {
    purchaseDetails(purchase.id).then(result => {
      setItems(result.data.items[0])

      productDetails(result.data.items[0].product_id)
        .then(result => {
          setProducts(result.data.product[0]);
      })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))

    getDetails('suppliers',supplier_id)
      .then(result => {
        setSupplier(result.data.supplier[0])
    })
      .catch(e => console.log(e))

    getDetails('payables', purchase.id)
      .then(result => {
        setPayables(result.data.payable[0])
    })
  }, [])

    return (
        <Container>
          <div className="info">
            <p>Data da compra: {date}</p>
            <p>Valor da compra: <span>R${total_price}</span></p>
            <p>Número de parcelas: <span>{number_of_payments}</span></p>
          </div>
          <div className="actions">
            <DetailsModal 
              button={<button>Detalhes</button>}
              title='Detalhes'
              items={items}
              payables={payables}
              products={products}
              supplier={supplier}
            />
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
