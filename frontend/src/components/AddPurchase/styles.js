import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;

  input, select, .amount-input-container {
    padding: 4px 10px;
    height: fit-content;
    width: fit-content;
  }

  .amount-input-container {
    display: flex;
    width: min-content;
    padding: 5px 14px;
    font-size: 26px;
    background: inherit;
    border: 1px solid #b2d6ff;
    box-sizing: border-box;
    margin-top: 10px;
  }

  .amount-input {
    margin: 0;
    padding: 0px 10px;
    border: none;
    width: min-content;
  }

  select {
    width: 100%;
  }

  input ~ input, input ~ select, select ~ input, select ~ select {
    margin-top: 10px;
  }

  h1 {
    font-size: 46px;
  }

  button {
    font-weight: bolder;
    width: 50%;
    margin-top: 20px;
    padding: 10px;
    font-size: 30px;
    background: #1f8fff;
    border-radius: 5px;
  }

  button:hover {
      color: #ffb32b;
  }

  .added {
    display: block;
    width: 100%;
    text-align: center;
    margin: 20px;
  }
`;