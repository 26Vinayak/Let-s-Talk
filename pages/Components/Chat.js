import React from 'react'
import styled from 'styled-components'; 
import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmails';
import { useCollection } from 'react-firebase-hooks/firestore';
import {useRouter} from 'next/router';

function Chat({id,users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const ref = db.collection('users')
    .where('email','==',getRecipientEmail(users,user));

    const [recipientSnapshot] = useCollection(ref);  
    const recipientEmail = getRecipientEmail(users,user);

    const enterChat = ()=>{
        router.push(`/chat/${id}`);
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient?.photoURL);
    const ch = recipientEmail?.[0];
   
    return (
        <Container onClick = {enterChat}>
            {recipient?(
                <UserAvatar src = {recipient?.photoURL}/>)
                :
                (<UserAvatar>{ch}</UserAvatar>)
            }
            <p>{recipientEmail}</p>
        </Container>
    );
}

export default Chat;



const Container = styled.div`
    display:flex;
    align-items:center;
    cursor:pointer;
    padding:15px;
    word-break:break-word;
    :hover{
        background-color:#e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
    margin:5px;
    margin-right:15px;
`;