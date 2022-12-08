import React from "react";
import SignUp from "./Signup";
import Login from "./Login";
import background from "./theat.jpg";
import classes from "./AuthForm.module.css";

// const AuthForm = (props) => {
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
    this.handleToUpdate = this.handleToUpdate.bind(this);
  }

  handleToUpdate(val) {
    this.setState({ isLogin: val });
  }

  render() {
    var handleToUpdate = this.handleToUpdate;
    if (this.state.isLogin) {
      return (
        <div className={classes.bg}>
          <div
            style={{ backgroundImage: `url(${background})` }}
            className={classes.bgimg}
          >
            <Login handleToUpdate={handleToUpdate.bind(this)} />;
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.bg}>
          <div
            style={{ backgroundImage: `url(${background})` }}
            className={classes.bgimg}
          >
            <SignUp handleToUpdate={handleToUpdate.bind(this)} />
          </div>
        </div>
      );
    }
  }
}

export default AuthForm;
