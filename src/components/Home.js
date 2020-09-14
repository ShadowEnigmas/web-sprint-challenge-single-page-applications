import React from 'react';
import { Link, Router, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Home = (props) => {
    const history = useHistory();

    const Head = styled.div`
        background-size: cover no-repeat;
        height: 450px;
    `

    const Button = styled.button`
        background: white;
        color: black;
        font-size: 1rem;
        margin: 1rem;
        padding: 0.25rem 1rem;
        border: 1px solid darkblue;
        border-radius: 3px;
    `

return (
<Head className='banner-top'>
    <h1>Your favorite food, delivered while coding</h1>
    <Button 
    className='button' 
    onClick={() => history.push('/pizza')}>
        Pizza Time!
    </Button>
</Head>
)}
export default Home; 