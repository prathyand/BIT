import StartingPageContent from '../components/StartingPage/StartingPageContent';
import AuthContext from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";
import { useContext } from 'react';

const HomePage = () => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  return (
    <>
    {!isLoggedIn && <Navigate to="/auth"/>}
    {isLoggedIn && <StartingPageContent />}
    </>
  );
};

export default HomePage;
