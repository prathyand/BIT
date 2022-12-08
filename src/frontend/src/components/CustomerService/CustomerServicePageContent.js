import './CustomerServicePageContent.module.css';


import React, { useRef, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

// import constants from './constants'
// https://console.firebase.google.com/u/0/project/thebittest-b00cf/authentication/users


firebase.initializeApp({ // storageBucket instead of database url?
  apiKey: "AIzaSyBUFO0sZ4xVBvH22YfmKIJce8kkeSs3b70",
  authDomain: "thebittest-b00cf.firebaseapp.com",
  projectId: "thebittest-b00cf",
  storageBucket: "thebittest-b00cf.appspot.com",
  messagingSenderId: "494192781743",
  appId: "1:494192781743:web:a5b939c8dd9d143578a75a",
  measurementId: "G-QQRS0TVCBV"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

const CustomerServicePageContent = () => {
  const [user] = useAuthState(auth);


  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return (
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    )
  }

  function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  function ChatMessage(props) {
    const { text, uid } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
          <p>{text}</p> 
        </div> 
    </>)
  }


  function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [formValue, setFormValue] = useState('')

    const sendMessage = async (e) => {
      e.preventDefault();

      const { uid, photoURL } = auth.currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })

      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth'})

    }

    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </main>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter message" />
          <button type='submit' disabled={!formValue}>Send</button>
        </form>
      </>)
  }



  return (
    <div className="CustomerServicePageContent">
      <header>
        <h1>TheBit Customer Service Chat</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
};

export default CustomerServicePageContent;