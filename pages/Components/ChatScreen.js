import React, {useState,useRef} from 'react'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { useRouter } from 'next/router';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttacFileIcon from '@material-ui/icons/AttachFile';
import { Avatar, Button } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase';
import getRecipientEmail from '../../utils/getRecipientEmails';
import TimeAgo from 'timeago-react';


function ChatScreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState("");
    const endofMessagesRef = useRef(null);

    const [messagesSnapShot] = useCollection(db.collection('chats')
    .doc(router.query.id).collection('messages')
    .orderBy('timestamp','asc'));


    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==',getRecipientEmail(chat.users,user))
    )

    console.log(recipientSnapshot);
    const showMessages = ()=>{
        console.log(JSON.parse(messages));
        if(messagesSnapShot)
        {
            console.log(messagesSnapShot.docs);
            return messagesSnapShot.docs.map((message)=>{
                return <Message
                        key = {message.id} 
                        user = {message.data().user} 
                        message = {{
                            ...message.data(),
                            timestamp: message.data().timestamp?.toDate().getTime(),
                        }}
                    />
            });
        }
        else{
            console.log(JSON.parse(messages));
            return JSON.parse(messages).map((message)=>{
                return <Message  
                    key = {message.id} 
                    user = {message.user} 
                    message = {message} />
            });
        }
    }


    const scrollToBottom = ()=>{
        endofMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start",
        });
    }

    const sendMessage = (e)=>{
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        {merge:true}
        );

        db.collection("chats").doc(router.query.id).collection('messages')
        .add(
        {
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        });

        setInput("");
        scrollToBottom();

    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient);
    const recipientEmail = getRecipientEmail(chat.users,user);

    return (
        <Container>
            <Header>
                {recipient?<Avatar src = {recipient?.photoURL}/>
                    :<Avatar>{recipientEmail[0]}</Avatar>
                }
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot?
                        <p>Last active: {' '} 
                        {recipient?.lastSeen?.toDate()?
                           <TimeAgo datetime = {recipient?.lastSeen?.toDate()}/>
                        :"Unavailable"}
                    </p>
                     :
                    <p>Loading Last active...</p>   
                } 
                </HeaderInformation>
                <HeaderIcons>
                        <IconButton>
                            <AttacFileIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndMessage ref = {endofMessagesRef}/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon/>
                <Input value={input} onChange = {e => setInput(e.target.value)}/> 
                <button hidden disabled = {!input} onClick = {sendMessage}>Send Message</button>
                <MicIcon/>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`
     
`;
const Input = styled.input`
    flex:1;
    outline:0;
    align-items:center;
    border:none;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:whitesmoke;
    padding:20px;
    margin-left:15px;
    margin-right:15px;
    border-radius:10px;
`;


const Header = styled.div`
    position:sticky;
    background-color:white;
    z-index:100;
    top:0;
    display:flex;
    padding:11px;
    height:80px;
    align-items:center;
    border-bottom:1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
    margin-left:15px;
    flex:1;
    >h3{
        margin-bottom:3px;
    }
    >p{
        font-size:14px;
        color:gray;
    }
`;

const HeaderIcons = styled.div`
`;
const IconButton  = styled(Button)`
`;

const MessageContainer = styled.div`
    padding:30px;
    background-color:#e5ded8;
    min-height:90vh;
`;

const EndMessage = styled.div`
    margin-bottom:50px;
`;

const InputContainer  = styled.form`
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:white;
    z-index:100;
`;