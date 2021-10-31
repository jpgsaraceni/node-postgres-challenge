import React, { useContext, useState } from 'react';
import { PurchasesContext } from '../../providers/PurchasesProvider';

import { Container } from './styles';


function AddProduct(props) {
  const {createProduct} = useContext(PurchasesContext);
 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [added, setAdded] = useState(false)
  const [noName, setNoName] = useState(false)

    return (
        <Container>
          <h1>Novo produto</h1>

          <div className="amount-input-container">
              Nome do produto:
              <input className="amount-input" type="text" onChange={event => {
                setName(event.target.value)
                setNoName(false)  
                }}
              />
            </div> 

            <div className="amount-input-container">
              Descrição (opcional):
              <textarea className="amount-input" type="text" onChange={event => {
                setDescription(event.target.value)
                // max chars  
                }}
              />
            </div> 

            {added && <span className="added">Produto cadastrado!</span>}
            {noName && <p className="missing-field">Informe o nome do produto</p>}

            {!added && <button onClick={() => {
              if (!name) setNoName(true)

              if (name !== '') {
              createProduct({
                name, 
                description, 
              }).then(() => {
                setAdded(true)
                props.callback()
              }).catch((e) => console.log(e))
            }
            }}>Adicionar</button>}

        </Container>
    );
}

export default AddProduct;
