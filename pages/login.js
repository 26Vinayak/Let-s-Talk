import React from 'react'
import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

function Login() {
    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .catch(alert);
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginContainer>
                <Logo
                    src = 'https://i.pinimg.com/originals/22/ba/12/22ba12bba53a208c2e962ed275461b34.png'
                    alt = ''
                />
                <Button onClick = {signIn} variant = "outlined">Sign in with Google</Button>
            </LoginContainer>
       </Container>
    )
}

export default Login;


const Container = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:whitesmoke;
`;

const LoginContainer = styled.div`
    padding:50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    border-radius:5px;
    box-shadow: 0px 4px 14px rgba(0,0,0,0.7);
`;

const Logo = styled.img`
    height:250px;
    width:250px;
    margin-bottom:10px;
`;