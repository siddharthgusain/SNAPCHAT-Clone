import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCrKh7amUHlDRtAPJ2_8uzd55cGHpTcVnM",
    authDomain: "snapchat-clone-da444.firebaseapp.com",
    projectId: "snapchat-clone-da444",
    storageBucket: "snapchat-clone-da444.appspot.com",
    messagingSenderId: "138415415799",
    appId: "1:138415415799:web:2a0445b841851fed818ef2"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db  = firebaseApp.firestore();
const auth = firebase.auth();
const storage  = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db , auth , storage , provider };
