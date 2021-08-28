import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {setUser} from '../../services/auth'
// import { useContext } from 'react';
// import { UserContext } from '../providers/UserProvider';
import { Container } from './styles';
import api from '../../services/api';

import logo from '../../assets/images/logo.svg';

function LogIn() {
    // states that receive the values of the input fields. Set with onChange events.
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // when these states are set to true, an error message appears below the input fields. Set true when validation fails and false with onChange events.
    const [noEmail, setNoEmail] = useState(false);
    const [noPassword, setNoPassword] = useState(false);
    const [showInvalidUserMessage, setShowInvalidUserMessage] = useState(false);

    // sets logged user to provider.
    // const { setUser } = useContext(UserContext);
    const history = useHistory();

    const navigateToHome = useCallback(() => {
      setShowInvalidUserMessage(false);
        api.post('/login', { email, password })
          .then(response => {
          if (response.status === 200) {
            history.push(`/home`);
          }}).catch(() => {
            if (!email) {
              setNoEmail(true);
              return false;
            } 
            if (!password) {
              setNoPassword(true);
              return false;
            } 
            setShowInvalidUserMessage(true);
          })
    }, [email, password, history])

    function navigateToSignUp() {
        history.push(`signup`);
    }

    function navigateToRecoverPassword() {
        history.push(`recover`);
    }

    return (
        <Container>
            <div className="left-side">
              <figure>
                <img
                    className="logo"
                    src={logo}
                    alt="Logo da AlphaDB. Ícone que representa bancos de dados (cilindro com circunferências paralelas às bases marcadas na superfície)."
                />
              </figure>
            </div>
            <div className="right-side">
                <form>
                    <h1>Já possui cadastro?</h1>
                    <input
                        type="e-mail"
                        placeholder="Digite seu e-mail"
                        onChange={event => {
                            setNoEmail(false);
                            setShowInvalidUserMessage(false);
                            setEmail(event.target.value)
                        }}
                    />
                    {noEmail && <span>Informe seu e-mail!</span>}
                    <input type="password" placeholder="Digite sua senha" onChange={event => {
                        setNoPassword(false);
                        setShowInvalidUserMessage(false);
                        setPassword(event.target.value)
                    }} />
                    {noPassword && <span>Informe sua senha!</span>}
                    {showInvalidUserMessage && <span>Usuário ou senha inválido!</span>}
                    <p className="forgot-password-text">
                        Esqueceu sua senha? Clique
                        <button
                            className="forgot-password-btn"
                            type="button"
                            onClick={() => navigateToRecoverPassword()}
                        >
                            aqui
                        </button>
                        .
                    </p>
                    <button
                        className="enter-btn"
                        type="button"
                        onClick={() => navigateToHome()}
                    >
                        Entrar
                    </button>
                </form>
                <p className="sign-up-caption">
                    É novo aqui?
                    <button className="sign-up-btn" type="button" onClick={() => navigateToSignUp()}>
                        Cadastre-se!
                    </button>
                </p>
            </div>
        </Container>
    );
}

export default LogIn;
