import React, { useContext, useState } from 'react';
import { PurchasesContext } from '../../providers/PurchasesProvider';
import { FormModal } from '../Modal';

import { Container } from './styles';


function AddPurchase(props) {
  const {createPurchase} = useContext(PurchasesContext);
  
  const [supplier, setSupplier] = useState(0)
  const [numberOfPayments, setNumberOfPayments] = useState(1)
  const [product, setProduct] = useState(0)
  const [unitPrice, setUnitPrice] = useState(0)
  const [amount, setAmount] = useState(1)

  const [added, setAdded] = useState(false)
  const [noSupplier, setNoSupplier] = useState(false)
  const [noProduct, setNoProduct] = useState(false)
  const [noUnitPrice, setNoUnitPrice] = useState(false)

    return (
        <Container>
          <h1>Nova compra</h1>

            <select defaultValue={supplier} label="A" onChange={event => {
              setSupplier(event.target.value)
              setNoSupplier(false)
              }}>
              <option value="0" disabled hidden>Selecione o fornecedor</option>
              {props.suppliers.map(supplier => {
                return <option value={supplier.id} key={supplier.id}>{supplier.name}</option>
              })}
            </select>

            <select defaultValue={numberOfPayments} onChange={event => setNumberOfPayments(event.target.value)}>
              <option value="1" disabled hidden>Número de parcelas</option>
              <option value="1">1 Parcela</option>
            </select>

            <select defaultValue={product} onChange={event => {
              setProduct(event.target.value)
              setNoProduct(false)
              }}>
              <option value="0" disabled hidden>Produto</option>
              {props.products.map(product => {
                return <option value={product.id} key={product.id}>{product.name}</option>
              })}
            </select>

            <div className="price-input-container" >
              Preço Unitário: R$
              <input className="price-input" type="decimal" step='0.1' placeholder="0.00" min="0.00" 
                onChange={event => {
                  setUnitPrice(event.target.value)
                  setNoUnitPrice(false)
                }}
              />
            </div>

            <div className="amount-input-container">
              Quantidade:
              <input className="amount-input" type="number" defaultValue="1" min="1" onChange={event => setAmount(event.target.value)}/>
            </div> 

            {added && <span className="added">Compra cadastrada!</span>}
            {noSupplier && <p className="missing-field">Selecione o fornecedor</p>}
            {noProduct && <p className="missing-field">Selecione o produto</p>}
            {noUnitPrice && <p className="missing-field">Informe o preço do produto</p>}

            {!added && <button onClick={() => {
              if (!supplier) setNoSupplier(true)
              if (!product) setNoProduct(true)
              if (!unitPrice) setNoUnitPrice(true)

              if (supplier && product !== 0) {
              createPurchase({
                supplier_id: supplier, 
                number_of_payments: numberOfPayments, 
                product_id: product, 
                amount: amount,
                unitPrice 
              }).then(() => {
                setAdded(true)
                props.callback()
              }).catch((e) => console.log(e))
            }
            }}>Adicionar</button>}

        </Container>
    );
}

export default AddPurchase;
