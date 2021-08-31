import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 200px;
    background: white;
    font-family: 'Ubuntu';
    font-size: 30px;

    .top {
      margin: 20px 0;
      display: flex;
      /* width: 100%; */
      align-items: center;
      place-content: center;
      img {
        /* width: 60%; */
      }
    }

    .logo {
        height: 60%;
    }

    .main-navigation {
        display: flex;
        flex-direction: column;
        flex: 2;
    }

    button {
        background: none;
        border: none;
    }
  
    button:hover {
        color: black;
    }
  
    .navigate-btn {
        color: #1f8fff;
        letter-spacing: 2px;
        padding: 10px 20px;
        text-align: left;
    }

    .navigate-btn:hover {
      background-color: lightgray;
    }

    .logout-btn {
      width: 100%;
      text-align: right;
      color: #1f8fff;
      letter-spacing: 2px;
      padding: 10px 20px;
    }

    .logout-icon {
        vertical-align: middle;
        margin-right: 10px;
    }

    .navigate-btn { // ANCHOR
      cursor: not-allowed;
    }
    .logout-icon, .logout-btn, .purchases-btn {
      cursor: pointer !important;
    }
`;
