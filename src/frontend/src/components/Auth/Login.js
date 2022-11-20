import React from 'react';
import classes from './AuthForm.module.css';
import { Navigate } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import Request from '../../contexts/Request';
import { Alert } from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import constants from '../../constants';
import { useRef, useState, useContext } from 'react';

const Login = (props) => {
    const clientId = constants.CLIENT_ID
    const emailUserInp = useRef()
    const passwordInp = useRef()
    const phnoUserInp = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isMobileLogin, setMobileLogin] = useState(false)
    const authContext = useContext(AuthContext)
    const request = useContext(Request)
    const isLoggedIn = authContext.isLoggedIn

    const onSuccess = (res) => {
        let googleAuth = request.postRequest(constants.REQUEST.GOOGLE_EP,res);
        googleAuth.then(response => {
            if(response.ok){
                response.json().then((data)=>{
                    setSuccess("Signin Successful")
                    authContext.login(data.token)
                })
            }else{
                console.log(response)
            }
        });
    }

    const onFailure = (res) => {
        console.log(res.error)
    }

    const formSubmitted = (event) => {
        event.preventDefault()
        let data = {}
        if(!isMobileLogin){
            data = {
                email: emailUserInp.current.value,
                password: passwordInp.current.value,
                isEmail: true
            }
        }else{
            data = {
                cellphone_no: phnoUserInp.current.value,
                password: passwordInp.current.value,
                isEmail: false
            }
        }
        
        let loginAuth = request.postRequest(constants.REQUEST.EMAIL_LOGIN_EP,data);
        loginAuth.then(response => {
            if(response.ok){
                response.json().then((data)=>{
                    setSuccess("Signin Successful")
                    authContext.login(data.token)
                })
            }else{
                console.log(response)
                response.json().then((err)=>{
                    setError(err.message)
                })
            }
        })
    }

    const switchAuthModeHandler = () =>{
        props.handleToUpdate(false);
    }

    const mobileLoginHandler = (event) =>{
        event.preventDefault()
        if(!isMobileLogin){
            setMobileLogin(true)
        }else{
            setMobileLogin(false)
        }
    }

    return (  
            <>
            {isLoggedIn && <Navigate to="/"/>}
            {
                !isLoggedIn && 
                (
                    <section className={classes.auth}>
                    <h1>Login</h1>
                    { error && <h3><Alert variant="danger">{error}</Alert></h3>}
                    { success && 
                        <h2>
                            <Alert variant='success'>
                                {success}
                            </Alert>
                        </h2> 
                    }
                    <form onSubmit={formSubmitted.bind(this)}>
                        { !isMobileLogin && 
                            <div className={classes.control}>
                            <label htmlFor='email'>Your Email</label>
                            <input type='email' id='email' required  ref={emailUserInp}/>
                            </div>
                        }   
                        { isMobileLogin && 
                            <div className={classes.control}>
                            <label htmlFor='mobile'>Your Mobile Number</label>
                            <input type='number' id='phno' required  ref={phnoUserInp}/>
                            </div>
                        }
                        <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input type='password' id='password' required ref={passwordInp}/>
                        </div>
                        <div className={classes.actions}>
                        <button>Login</button>
                        <button type='button'
                            className={classes.toggle}
                            onClick={mobileLoginHandler}
                            >
                                {!isMobileLogin && 
                                <>
                                    Login With Mobile Number
                                </>
                                }
                                {isMobileLogin &&
                                    <>
                                    Login With Email
                                    </>
                                }   
                        </button>
                        <button type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                            >Create new account
                        </button>
                        <button type='button'
                            className={classes.toggle2}
                            >Forgot Password?
                        </button>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Google Sign In"
                            onSuccess={onSuccess.bind(this)}
                            onFailure={onFailure.bind(this)}
                            cookiePolicy={'single_host_origin'}
                            prompt="select_account"
                            isSignedIn={false}
                        />
                        </div>
                    </form>
                    </section>
                )
            }
            </>

    );
}

export default Login;
