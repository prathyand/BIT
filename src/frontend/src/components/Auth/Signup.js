import React from 'react';
import classes from './AuthForm.module.css';
import { Alert } from "react-bootstrap";
import AuthContext from '../../contexts/AuthContext';
import Request from '../../contexts/Request';
import { Navigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import constants from '../../constants';
import { useRef, useState, useContext } from 'react';

const clientId = constants.CLIENT_ID

const SignUp = (props) => {
    const firstNameInp = useRef()
    const lastNameInp = useRef()
    const emailUserInp = useRef()
    const passwordInp = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const context = useContext(AuthContext)
    const request = useContext(Request)


    const formSubmitted = (event) => {
        event.preventDefault()
        let data = {
            first_name: firstNameInp.current.value,
            last_name: lastNameInp.current.value,
            email: emailUserInp.current.value,
            password: passwordInp.current.value,
            cellphone_no:""
        }
        let signUpReq = request.postRequest(constants.SIGNUP_EP,data);
        signUpReq.then(response => {
                if(response.ok){
                    response.json().then((data)=>{
                        setSuccess("Signin Successful")
                        context.login(data)
                    })
                }else{
                    response.json().then((err)=>{
                        setError(err.message)
                    })
                }
            });
    }

    const onSuccess = (res) => {
        let googleAuth = request.postRequest(constants.GOOGLE_EP,res);
        googleAuth.then(response => {
            if(response.ok){
                response.json().then((data)=>{
                    setSuccess("Signin Successful")
                    context.login(data)
                })
            }else{
                console.log(response)
            }
        });
    }

    const onFailure = (res) => {
        console.log(res.error)
    }

    const switchAuthModeHandler = () =>{
        props.handleToUpdate(true);
    }
        
    return (
        <>
            {context.isLoggedIn && <Navigate to="/"/>}
            {!context.isLoggedIn && (
                <section className={classes.auth}>
                <h1>Sign Up</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant='success'>{success}</Alert> }
                <form onSubmit = {formSubmitted}>
                    <div className={classes.control}>
                        <label htmlFor='name'>First Name</label>
                        <input type='text' id='name' required ref={firstNameInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='lname'>Last Name</label>
                        <input type='text' id='lname' required ref={lastNameInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required ref={emailUserInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input type='password' id='password' required ref={passwordInp}/>
                    </div>
                    <div className={classes.actions}>
                        <button>Create Account</button>
                        <button type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >Login with existing account
                        </button>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Google Sign Up"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
                    </div>
                </form>
                </section>
            ) 
            }
        </>
    )
};

export default SignUp;
