import React from 'react';
import Header from '../../components/Header';
import HomeMain from '../../components/HomeMain';

import { Container } from './styles';

function Home() {
    return (
        <Container>
            <Header />
            <HomeMain />
        </Container>
    );
}

export default Home;
