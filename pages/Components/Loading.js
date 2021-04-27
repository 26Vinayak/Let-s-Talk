import React from 'react';
import {Circle} from 'better-react-spinkit';
import Head from 'next/head';

function Loading() {
    return (
        <center style = {{display:"grid",placeItems:"center",
            height:"100vh"}}>
            <div>
                <Head>
                    <title>Loading</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <img src = "https://i.pinimg.com/originals/22/ba/12/22ba12bba53a208c2e962ed275461b34.png"
                 alt = "" 
                 style = {{marginBottom:10}}
                 height = {200}
                 />
                 <Circle color = "skyblue" size = {60}/>
            </div>
        </center>
    )
}

export default Loading
