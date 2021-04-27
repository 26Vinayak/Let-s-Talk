import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth,db} from '../firebase';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import Login from './login';
import Loading from './Components/Loading';
import { useEffect } from 'react';
import firebase from 'firebase';

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth); // Firebase hooks


  // It will show the Component Life cycle if user is authenticated it will store into the firebase store;
  useEffect(()=>{
    if(user)
    {
        db.collection('users').doc(user.uid).set({
          email:user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(), 
          photoURL:user.photoURL,
        },
        {merge:true}
      );
    }
  },[user]);
  
  if(loading)
  {
    return <Loading/>
  }
  if(!user){
    return <Login/>
  }

  return <Component {...pageProps} />
}

export default MyApp
