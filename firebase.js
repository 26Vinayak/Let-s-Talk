import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDGmzPsms3PAxgyqJstqoY81fEa5ECACA0",
    authDomain: "baatein-karo-45c14.firebaseapp.com",
    projectId: "baatein-karo-45c14",
    storageBucket: "baatein-karo-45c14.appspot.com",
    messagingSenderId: "428545181189",
    appId: "1:428545181189:web:42936701d76d116e82be6c"
};

const app  = !firebase.apps.length
             ? firebase.initializeApp(firebaseConfig)
             :firebase.app();


const db = app.firestore();
const auth = app.auth();



const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,provider};
