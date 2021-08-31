import React, { useContext } from 'react';

import { PurchasesContext } from '../../providers/PurchasesProvider';

import Header from '../../components/Header';
import { Container } from './styles';
import PurchasesMain from '../../components/PurchasesMain';

function Purchases() {

    return (
        <Container>
            <Header />
            <PurchasesMain />          
        </Container>
    );
}

export default Purchases;
