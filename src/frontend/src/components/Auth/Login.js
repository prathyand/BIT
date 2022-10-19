// import { useState } from 'react';

import React from 'react';
import classes from './AuthForm.module.css';
import { Navigate } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap";

const CONSTANTS = require("../../constants");
const domainName_gw1 = "http://" + CONSTANTS.GATEWAY1 + ":" + CONSTANTS.GATEWAY1_PORT;

class Login extends React.Component{

    static contextType = AuthContext

    constructor(props){
        super(props)
        this.emailUserInp = React.createRef(null)
        this.passwordInp = React.createRef(null)
        this.state = {
            error : null,
            success : null
        }
        this.context = AuthContext
    }

    formSubmitted(event){
        event.preventDefault()
        this.mailEntered = this.emailUserInp.current.value;
        this.passwordEntered = this.passwordInp.current.value;
        console.log(this.mailEntered);
        console.log(this.passwordEntered);
        fetch(
            domainName_gw1+"/login",
            {
            method : "POST",
            body : JSON.stringify(
            {
                email: this.mailEntered,
                password: this.passwordEntered
            }),
            headers:
            {
                "Content-Type" : "application/json"
            }
            }).then(response => {
                if(response.ok){
                    response.json().then((data)=>{
                        this.setState({success:"Signin Successful"})
                        this.context.login(data)
                        alert("Signin Successful")
                        console.log(this.context)
                    })
                }else{
                    response.json().then((err)=>{
                        this.setState({error:err.message})
                        // alert(err.message)
                    })
                }
            })
    }

    render(){
        const switchAuthModeHandler = () =>{
            this.props.handleToUpdate(false);
        }
        if(this.context.isLoggedIn){
            return <Navigate to="/"/>
        }else{
            return (
                <section className={classes.auth}>
                <h1>Login</h1>
                {this.state.error && <h3><Alert variant="danger">{this.state.error}</Alert></h3>}
                {this.state.success && 
                    <h2>
                        <Alert variant='success'>
                            {this.state.success}
                        </Alert>
                    </h2> 
                }
                <form onSubmit={this.formSubmitted.bind(this)}>
                    <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required  ref={this.emailUserInp}/>
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={this.passwordInp}/>
                    </div>
                    <div className={classes.actions}>
                    <button>Login</button>
                    <button type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                        >Create new account
                    </button>
                    </div>
                </form>
                </section>
            );
        }
    }
};

export default Login;
