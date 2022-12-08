import React from "react";
//import video from "./theatre.mp4";
//import background from "./movth.jpg";
import classes from "./AuthForm.module.css";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Request from "../../contexts/Request";
import { Alert } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import constants from "../../constants";
import { useRef, useState, useContext } from "react";

const Login = (props) => {
  const clientId = constants.CLIENT_ID;
  const emailUserInp = useRef();
  const passwordInp = useRef();
  const phnoUserInp = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMobileLogin, setMobileLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const request = useContext(Request);
  const isLoggedIn = authContext.isLoggedIn;

  const onSuccess = (res) => {
    let googleAuth = request.postRequest(constants.REQUEST.GOOGLE_EP, res);
    googleAuth.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setSuccess("Signin Successful");
          authContext.login(data.token);
        });
      } else {
        console.log(response);
      }
    });
  };

  const onFailure = (res) => {
    console.log(res.error);
  };

  const formSubmitted = (event) => {
    event.preventDefault();
    let data = {};
    if (!isMobileLogin) {
      data = {
        email: emailUserInp.current.value,
        password: passwordInp.current.value,
        isEmail: true,
      };
    } else {
      data = {
        cellphone_no: phnoUserInp.current.value,
        password: passwordInp.current.value,
        isEmail: false,
      };
    }

    let loginAuth = request.postRequest(constants.REQUEST.EMAIL_LOGIN_EP, data);
    loginAuth.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setSuccess("Signin Successful");
          authContext.login(data.token);
        });
      } else {
        console.log(response);
        response.json().then((err) => {
          setError(err.message);
        });
      }
    });
  };

  const switchAuthModeHandler = () => {
    props.handleToUpdate(false);
  };

  const mobileLoginHandler = (event) => {
    event.preventDefault();
    if (!isMobileLogin) {
      setMobileLogin(true);
    } else {
      setMobileLogin(false);
    }
  };

  async function facebookLogin() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) {
      console.log(authResponse);
      return;
    } else {
      console.log(authResponse);
      //window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
    }
  }

  return (
    <div>
      {isLoggedIn && <Navigate to="/" />}
      {!isLoggedIn && (
        <div>
          <h1 className={classes.brand}>BookInTime</h1>
          <section className={classes.auth}>
            {/*<video autoplay muted className={classes.tVid}>
              <source src={video} type="video/mp4/"></source>
              </video>*/}
            <h1
              style={{
                fontSize: "45px",
                color: "black",
                backgroundColor: "lightyellow",
                width: "150px",
                marginLeft: "28%",
                borderRadius: "30px",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingBottom: "8px",
                border: "5px solid black",
              }}
            >
              Login
            </h1>
            {error && (
              <h3>
                <Alert variant="danger">{error}</Alert>
              </h3>
            )}
            {success && (
              <h2>
                <Alert variant="success">{success}</Alert>
              </h2>
            )}
            <form onSubmit={formSubmitted.bind(this)}>
              {!isMobileLogin && (
                <div className={classes.control}>
                  <input
                    type="email"
                    id="email"
                    required
                    ref={emailUserInp}
                    placeholder="Your Email"
                  />
                </div>
              )}
              {isMobileLogin && (
                <div className={classes.control}>
                  <input
                    type="number"
                    id="phno"
                    required
                    ref={phnoUserInp}
                    placeholder="Your Mobile Number"
                  />
                </div>
              )}
              <div className={classes.control}>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInp}
                  placeholder="Your Password"
                />
              </div>
              <div className={classes.actions}>
                <button
                  style={{ borderRadius: "45px", border: "5px solid black" }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={mobileLoginHandler}
                >
                  {!isMobileLogin && <>Login With Mobile Number</>}
                  {isMobileLogin && <>Login With Email</>}
                </button>
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  Create new account
                </button>
                <button type="button" className={classes.toggle2}>
                  Forgot Password?
                </button>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Google Sign In"
                  onSuccess={onSuccess.bind(this)}
                  onFailure={onFailure.bind(this)}
                  cookiePolicy={"single_host_origin"}
                  prompt="select_account"
                  isSignedIn={false}
                />
                <button className="btn btn-facebook" onClick={facebookLogin}>
                  <i className="fa fa-facebook mr-1"></i>
                  Login with Facebook
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
export default Login;
