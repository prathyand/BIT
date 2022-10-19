// import { useState } from 'react';

import React from 'react';
import classes from './AuthForm.module.css';
import { Alert } from "react-bootstrap";
import AuthContext from '../../contexts/AuthContext';
import { Navigate } from "react-router-dom";

const CONSTANTS = require("../../constants");
const domainName_gw1 = "http://" + CONSTANTS.GATEWAY1 + ":" + CONSTANTS.GATEWAY1_PORT;

class SignUp extends React.Component{

    static contextType = AuthContext

    constructor(props){
        super(props)
        this.firstNameInp = React.createRef(null)
        this.lastNameInp = React.createRef(null)
        this.emailUserInp = React.createRef(null)
        this.passwordInp = React.createRef(null)
        this.context = AuthContext
        this.state = {
            error : null,
            success : null
        }
        this.props = props
    }

    formSubmitted(event){
        event.preventDefault()
        this.firstNameEntered = this.firstNameInp.current.value;
        this.lastNameEntered = this.lastNameInp.current.value;
        this.mailEntered = this.emailUserInp.current.value;
        this.passwordEntered = this.passwordInp.current.value;
        
        console.log(this.firstNameEntered);
        console.log(this.lastNameEntered)
        console.log(this.mailEntered);
        console.log(this.passwordEntered);

        fetch(
            domainName_gw1+"/signup",
            {
            method : "POST",
            body : JSON.stringify(
            {
                firstname: this.firstNameEntered,
                lastname: this.lastNameEntered,
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
                        this.setState({success:"Signup Successful"})
                        this.context.login(data)
                        console.log(this.context)
                        // setTimeout(()=>{this.setState({isLoggedin:true})},2000)
                    })
                    console.log(this.context)
                    // this.props.navigation.navigate('./', {replace:true})
                }else{
                    response.json().then((err)=>{
                        this.setState({error:err.msg})
                    })
                }
            });
    }

    render(){
        const switchAuthModeHandler = () =>{
            this.props.handleToUpdate(true);
        }
        if(this.context.isLoggedIn){
            return <Navigate to="/"/>
        }else{
            return (
                <section className={classes.auth}>
                <h1>Sign Up</h1>
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                {this.state.success && <Alert variant='success'>{this.state.success}</Alert> }
                <form onSubmit = {this.formSubmitted.bind(this)}>
                    <div className={classes.control}>
                        <label htmlFor='name'>First Name</label>
                        <input type='text' id='name' required ref={this.firstNameInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='lname'>Last Name</label>
                        <input type='text' id='lname' required ref={this.lastNameInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required ref={this.emailUserInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input type='password' id='password' required ref={this.passwordInp}/>
                    </div>
                    <div className={classes.actions}>
                        <button>Create Account</button>
                        <button
                            type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >Login with existing account
                        </button>
                    </div>
                </form>
                </section>
            );
        }
    }
};

export default SignUp;
