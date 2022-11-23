import AuthForm from '../components/Auth/AuthForm';
import { useContext,useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import constants from "../constants";
import Request from '../contexts/Request';

const AuthPage = (props) => {
  const authContext = useContext(AuthContext)
  const request = useContext(Request)
  useEffect(() => {
    const loginToken = localStorage.getItem(constants.AUTH_TOKEN_KEY);
    let getProfile = request.getRequest("/test",{token:loginToken});
      getProfile.then(response => {
          if(response.ok){
              authContext.login(loginToken)
          }else{
              localStorage.removeItem(constants.AUTH_TOKEN_KEY)
          }
    });
    // eslint-disable-next-line
  }, []);
  return <AuthForm isLogin={true}/>;
};

export default AuthPage;
