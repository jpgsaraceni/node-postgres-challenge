import React from 'react';

import Header from '../../components/Header';
import { Container } from './styles';
import ProductsMain from '../../components/ProductsMain';

function Products() {

    return (
        <Container>
            <Header />
            <ProductsMain />          
        </Container>
    );
}

export default Products;
