import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Ubuntu';
    }

    body {
        background: #B2D6FF;
        color: #333333;
    }

    body, input, button {
        font: 400 16px sans-serif;
    }

    h1, h2, h3, h4, p {
        cursor: default;
    }

    button {
        cursor: pointer;
        border: none;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        align-self: center;
        justify-self: center;
        max-width: 50vw;
        /* max-width: 400px; */
        margin-bottom: 20px;
        background: #fff;
        border-radius: 5px;
        padding: 22px 37px 44px 37px;
    }

    h1 {
        font-size: 58px;
        text-align: center;
        margin-bottom: 30px;
        color: #1f8fff;
    }

    input {
        display: flex;
        width: 68%;
        height: 86px;
        padding-left: 20px;
        font-size: 30px;
        background: inherit;
        border: 1px solid #b2d6ff;
        box-sizing: border-box;
    }

    input ~ input {
        margin-top: 30px;
    }

    input::placeholder {
        font-size: 30px;
        color: #b2d6ff;
    }


    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .button-container {
        width: 100%;
        display: flex;
        place-content: center;
    }
`;
