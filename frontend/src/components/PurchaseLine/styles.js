import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid;
  padding: 5px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  p {
    font-size: 18px;
    margin: 10px;
  }

  .actions {
    button {
      margin: 10px;
    }
    display: flex;
    flex-direction: column;
  }
`;