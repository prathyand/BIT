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
    const phnoUserInp = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const context = useContext(AuthContext)
    const request = useContext(Request)
    const [isMobileLogin, setMobileLogin] = useState(false)


    const formSubmitted = (event) => {
        event.preventDefault()
        let data = {}
        if(!isMobileLogin){
            data = {
                first_name: firstNameInp.current.value,
                last_name: lastNameInp.current.value,
                email: emailUserInp.current.value,
                password: passwordInp.current.value,
                cellphone_no:"",
                isEmail:true
            }
        }else{
            data = {
                first_name: firstNameInp.current.value,
                last_name: lastNameInp.current.value,
                email: emailUserInp.current.value,
                password: passwordInp.current.value,
                cellphone_no:phnoUserInp.current.value,
                isEmail:false
            }
        }
        let signUpReq = request.postRequest(constants.REQUEST.SIGNUP_EP,data);
        signUpReq.then(response => {
                if(response.ok){
                    response.json().then((data)=>{
                        setSuccess("Signin Successful")
                        context.login(data.token)
                    })
                }else{
                    response.json().then((err)=>{
                        setError(err.message)
                    })
                }
            });
    }

    const onSuccess = (res) => {
        let googleAuth = request.postRequest(constants.REQUEST.GOOGLE_EP,res);
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
                    <input type='email' id='email' required  ref={emailUserInp}/>
                    </div>  
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
                        <button>Create Account</button>
                        <button type='button'
                            className={classes.toggle}
                            onClick={mobileLoginHandler}
                            >
                                {!isMobileLogin && 
                                <>
                                    Signup With Mobile Number
                                </>
                                }
                                {isMobileLogin &&
                                    <>
                                    Signup With Email
                                    </>
                                }   
                        </button>
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
