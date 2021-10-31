import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../assets/images/logo.svg';
import logout from '../../assets/images/logout.svg';
import api from '../../services/api';
import { LogoutModal } from '../Modal';

function Header() {
  // header with logo and navigation buttons. Rendered in all pages after login.
  const history = useHistory();

  // function navigateToHome() {
  //     history.push(`/home`);
  // }

  function navigateToLogIn() {
    api.post('/logout')
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          history.push(`/login`);
        }
      }).catch(err => console.log(err));
  }

  function navigateToPurchases() {
    history.push('/purchases');
  }

  function navigateToProducts() {
    history.push('/products');
  }

  return (
    <Container>
      <div className="top">
        {/* <button
                    type="button"
                    className="right home-button"
                    // onClick={() => navigateToHome()}
                    disabled="true"
                > */}
        <img
          className="logo"
          src={logo}
          alt="Logo da AlphaDB. Ícone que representa bancos de dados (cilindro com circunferências paralelas às bases marcadas na superfície)."
        />
        {/* </button> */}
      </div>
      <div className="main-navigation">
        <button
          type="button"
          className="navigate-btn purchases-btn"
          onClick={() => navigateToPurchases()}
        >
          Compras
        </button>
        <button
          type="button"
          className="navigate-btn"
          onClick={() => { }}
        >
          Contas a Pagar
        </button>
        <button
          type="button"
          className="navigate-btn"
          onClick={() => { }}
        >
          Fornecedores
        </button>
        <button
          type="button"
          className="navigate-btn  products-btn"
          onClick={() => navigateToProducts()}
        >
          Produtos
        </button>
      </div>
      <div className="bottom">
        <LogoutModal
          button={
            <button
              type="button"
              className="logout-btn"
            // onClick={() => navigateToLogIn()}
            >
              <img
                className="logout-icon"
                src={logout}
                alt="Log out icon"
              />
              Sair
            </button>}
          title="Deseja mesmo sair?"
          confirm={() => navigateToLogIn()}
        />
      </div>
    </Container>
  );
}

export default Header;
