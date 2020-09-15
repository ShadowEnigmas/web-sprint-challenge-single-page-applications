import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    width: 100%
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%
`


    return (
    <Container className='container'>
        <div className='header'>
            Lambda Eats
            <Nav className='nav-container'>
                <ul>
                    <Link to='/'>Home</Link>
                </ul>
            </Nav>
        </div>
    </Container>
    )
}

export default Navigation; 