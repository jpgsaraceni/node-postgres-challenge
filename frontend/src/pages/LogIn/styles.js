import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;

    figure {
      height: 40vh;
    }

    button {
        background: none;
        border: none;
    }

    button:hover {
        color: #ffb32b;
    }

    .left-side {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffb32b;
    }

    .logo {
        max-width: 40vw;
    }

    .right-side {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10%;
    }

    .forgot-password-text {
        margin-top: 10px;
        font-size: 22px;
    }

    .forgot-password-btn {
        padding-left: 5px;
        font-size: 22px;
        font-weight: bold;
        color: #1f8fff;
    }

    .enter-btn {
        font-weight: bolder;
        width: 50%;
        margin-top: 20px;
        padding: 10px;
        font-size: 30px;
        background: #1f8fff;
        border-radius: 5px;
    }

    .sign-up-caption {
        color: #4f4f4f;
        font-size: 30px;
    }

    .sign-up-btn {
        font-weight: bold;
        color: #1f8fff;
        padding-left: 5px;
        font-size: 30px;
    }

    span {
        color: red;
    }
`;
