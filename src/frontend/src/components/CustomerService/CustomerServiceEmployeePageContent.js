
import './CustomerServiceEmployeePageContent.css';


import React, { useRef, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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

const email = 'agent@gmail.com'
// const email = 'agent@gmail.com'
const password = 'TheBit1234'

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

const CustomerServiceEmployeePageContent = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // const user = userCredential.user;
        // const messagesRef = firestore.collection('messages');
        firestore.collection('messages').listDocuments().then(val => {
            val.map((val) => {
                val.delete()
            })
        })
    })
    .catch((error) => {
        console.log(error)
    })

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

    if (messageClass === 'received'){
        return (<>
            <div className={`message ${messageClass}`}>
            <img className="profileImg" src={require("./images/default2.PNG")}/>
            <p className="txtMsg">{text}</p> 
            </div> 
        </>)
    } else {
        return (<>
            <div className={`message ${messageClass}`}>
            <img className="profileImg" src={require("./images/image3.png")}/>
            <p className="txtMsg">{text}</p> 
            </div> 
        </>)
    }
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
        <main className="messagePane">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </main>
        <form className="messageForm" onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter message" />
          <button type='submit' disabled={!formValue}>Send</button>
        </form>
      </>)
  }



  return (
    <div className='CustomerServicePageWrapper'>
        <div className="CustomerServicePageContent">
        <div className="chatHeader">
            You've been connected to TheBit Customer Service!
        </div>
        <section>
            {user ? <ChatRoom /> : <SignIn />}
        </section>
        </div>
    </div>
  );
};
      // <header>
        // <h1>TheBit Customer Service Chat</h1>
        // <SignOut />
      // </header>

export default CustomerServiceEmployeePageContent;