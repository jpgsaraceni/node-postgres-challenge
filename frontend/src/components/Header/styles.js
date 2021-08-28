import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20vh;
    background: #ffb32b;
    padding: 0 20px 0 40px;
    font-family: 'Ubuntu';
    font-size: 30px;

    .right {
        height: inherit;
        display: flex;
        align-items: center;
        padding: 10px 0;
    }

    .logo {
        height: 80%;
    }

    .left {
        height: 100%;
    }

    button {
        background: none;
        border: none;
    }

    .navigate-button {
        color: #1f8fff;
        letter-spacing: 2px;
        padding: 30px;
        height: 100%;
    }

    button ~ button {
        margin-left: 10px;
    }

    button:hover {
    }

    .logout-button {
        vertical-align: middle;
        margin-right: 10px;
    }
`;
