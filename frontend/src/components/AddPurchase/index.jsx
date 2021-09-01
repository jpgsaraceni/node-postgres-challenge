import React, { useContext, useState } from 'react';
import { PurchasesContext } from '../../providers/PurchasesProvider';
import { FormModal } from '../Modal';

import { Container } from './styles';


function AddPurchase() {
  const {createPurchase} = useContext(PurchasesContext);
  
  const [supplier, setSupplier] = useState(1)
  const [numberOfPayments, setNumberOfPayments] = useState(1)
  const [product, setProduct] = useState(1)
  const [amount, setAmount] = useState(1)
  const [added, setAdded] = useState(false)

    return (
        <Container>
          <h1>Nova compra</h1>
            <select defaultValue={supplier} label="A" onChange={event => setSupplier(event.target.value)}>
              <option value="1" disabled hidden>Selecione o fornecedor</option>
              <option value="1">Fornecedor Padrão</option>
            </select>
            <select defaultValue={numberOfPayments} onChange={event => setNumberOfPayments(event.target.value)}>
              <option value="1" disabled hidden>Número de parcelas</option>
              <option value="1">1 Parcela</option>
            </select>
            <select defaultValue={product} onChange={event => setProduct(event.target.value)}>
              <option value="1" disabled hidden>Produto</option>
              <option value="1">Produto Padrão</option>
            </select>
            <div className="amount-input-container">
              Quantidade:
              <input className="amount-input" type="number" defaultValue="1" min="1" onChange={event => setAmount(event.target.value)}/>
            </div> 
            {added && <span className="added">Compra cadastrada!</span>}
            {!added && <button onClick={() => {
              createPurchase({
                supplier_id: supplier, 
                number_of_payments: numberOfPayments, 
                product_id: product, 
                amount: amount
              }).then(() => {
                console.log("ok")
                setAdded(true)
              }).catch((e) => console.log(e))
            }}>Adicionar</button>}
        </Container>
    );
}

export default AddPurchase;
