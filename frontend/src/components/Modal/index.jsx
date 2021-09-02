import React from 'react';
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
