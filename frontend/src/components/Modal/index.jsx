import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // for accessibility purposes

export function LogoutModal(props) {
    // react-modal

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '30vh',
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    return (
      <div onClick={!modalIsOpen? openModal: undefined}>
        {props.button}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="modal de logout"
        >
          <h2
            style={{
              color: '#1f8fff',
              textAlign: 'center'
            }}
          >
            {props.title}
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            <button
            onClick={() => props.confirm()}
            style={{
              color: 'red',
              fontSize: '30px',
              fontWeight: 'bold',
              background: 'none',
            }}
            >
              Sair
            </button>
            <button
              onClick={closeModal}
              style={{
                fontSize: '30px',
                background: 'none',
              }}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      </div>
    );
};

export function FormModal(props) {
  // react-modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // height: '70vh',
      width: 'min-content',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div onClick={!modalIsOpen? openModal: undefined}>
      {props.button}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="modal de formulário"
      >
        {props.component ? props.component : ''}
        <h2
          style={{
            color: '#1f8fff',
            textAlign: 'center'
          }}
        >
          {props.title}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <button
            onClick={closeModal}
            style={{
              fontSize: '24px',
              background: 'none',
            }}
          >
            Voltar para lista de compras
          </button>
        </div>
      </Modal>
    </div>
  );
};

export function DeleteModal(props) {
   // react-modal

   const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '30vh',
      width: '30vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div onClick={!modalIsOpen? openModal: undefined}>
      {props.button}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="modal de deleção"
      >
        <h2
          style={{
            color: '#1f8fff',
            textAlign: 'center'
          }}
        >
          {props.title}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <button
          onClick={() => {
            props.confirm(closeModal())
          }}
          style={{
            color: 'red',
            fontSize: '30px',
            fontWeight: 'bold',
            background: 'none',
          }}
          >
            Deletar
          </button>
          <button
            onClick={closeModal}
            style={{
              fontSize: '30px',
              background: 'none',
            }}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export function DetailsModal(props) {
  // react-modal
  const [date, setDate] = useState()

  const customStyles = {
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
     height: 'fit-content',
     width: '30vw',
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'space-around',
   },
 };

 const h3Styles = {
    color: '#1f8fff',
    textAlign: 'center'
 }

 const [modalIsOpen, setIsOpen] = useState(false);


 function openModal() {
  const localDate = new Date(props.payables.due_date).toLocaleDateString();
  setDate(localDate)
  setIsOpen(true);
 }

 function closeModal() {
   setIsOpen(false);
 }

 return (
  <div onClick={
    !modalIsOpen? openModal: undefined 
  }>
     {props.button}
     <Modal
       isOpen={modalIsOpen}
       onRequestClose={closeModal}
       style={customStyles}
       contentLabel="modal de detalhes"
     >
       
       <h3 style={h3Styles}>Produto:</h3>
       
       <p style={{marginBottom: '5px', marginTop: '10px'}}>Nome: <strong>{props.products.name}</strong></p>
       <p style={{marginBottom: '5px'}}>Preço unitário: <strong>R${props.items.unit_price}</strong></p>
       <p style={{marginBottom: '10px'}}>Quantidade: <strong>{props.items.amount}</strong></p>
       
       <h3 style={h3Styles}>Fornecedor:</h3>
       
       <p style={{marginBottom: '5px',  marginTop: '10px'}}>Nome: <strong>{props.supplier.name}</strong></p>
       <p style={{marginBottom: '10px'}}>Cidade: <strong>{props.supplier.city}</strong></p>
       
       <h3 style={h3Styles}>Pagamento:</h3>

       <p style={{marginBottom: '10px',  marginTop: '10px'}}>Vencimento: <strong>{date}</strong></p>

       <div
         style={{
           display: 'flex',
           justifyContent: 'space-around'
         }}
       >
         <button
           onClick={closeModal}
           style={{
             fontSize: '30px',
             background: 'none',
           }}
         >
           Voltar
         </button>
       </div>
     </Modal>
   </div>
 );
}
