import AuthForm from '../components/Auth/AuthForm';
import { useContext,useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import constants from "../constants"

const AuthPage = (props) => {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    const loginToken = localStorage.getItem(constants.AUTH_TOKEN_KEY);
    if (loginToken) {
      authContext.login(loginToken)
    }
    // eslint-disable-next-line
  }, []);
  return <AuthForm isLogin={true}/>;
};

export default AuthPage;
