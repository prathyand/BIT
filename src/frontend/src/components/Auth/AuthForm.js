import React from 'react';
import SignUp from './Signup';
import Login from './Login';

// const AuthForm = (props) => {
class AuthForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin : true
    };
    this.handleToUpdate = this.handleToUpdate.bind(this);
  }

  handleToUpdate(val){
    this.setState({isLogin : val}, () => {
      console.log(this.state.isLogin)
    })
  }

  render(){
    var handleToUpdate = this.handleToUpdate;
    if(this.state.isLogin){
      return <Login handleToUpdate = {handleToUpdate.bind(this)} />;
    }
    else{
      return <SignUp handleToUpdate = {handleToUpdate.bind(this)}/>;
    }
  }
};

export default AuthForm;
