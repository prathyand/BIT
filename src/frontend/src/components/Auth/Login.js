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
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const clientId = constants.CLIENT_ID;
  const emailUserInp = useRef();
  const passwordInp = useRef();
  const phnoUserInp = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotPassword,setForgotPassword] = useState(false);
  const [isMobileLogin, setMobileLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const request = useContext(Request);
  const isLoggedIn = authContext.isLoggedIn;

  const ForgotPassword = () => {
    const emailUserInp = useRef();
    const request = useContext(Request);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()
    const resetpassword = (event) => {
      event.preventDefault()
      let data = JSON.stringify({
        email: emailUserInp.current.value
      });
      let resetPassword = request.postRequest(constants.REQUEST.FORGOT_PASSWORD, data);
      resetPassword.then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setSuccess("New password sent to the entered email.Please login again.Redirecting to Login page in 3sec");
            setTimeout(()=>{
              setForgotPassword(false)
              navigate("/auth")
            },3000)
          });
        }
      });
    }
    return (
      <section className={classes.auth}>
        {success && <Alert variant="success">{success}</Alert>}
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailUserInp}
            placeholder="Your Email"
          />
        </div>
        <div className={classes.actions}>
          <button type="button" style={{ borderRadius: "45px", border: "5px solid black" }} onClick={resetpassword}>
            Reset Password
          </button>
        </div>
      </section>
    )
  }

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
      {(!isLoggedIn && forgotPassword) && (
        <ForgotPassword/>
      )}
      {(!isLoggedIn && !forgotPassword) && (
        <div>
          <h1 className={classes.brand}>BookInTime</h1>
          <section className={classes.auth}>
            <h1 className={classes.login}>
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
                <button type="button" className={classes.toggle2} onClick={()=>setForgotPassword(true)}>
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
