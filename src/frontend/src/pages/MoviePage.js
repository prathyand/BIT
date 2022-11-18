import MovieBooking from '../components/MovieBooking/MovieBooking';
import {useLocation} from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";
import { useContext } from 'react';

const MoviePage = (props) => {
  const location = useLocation()
  const movie = location.state.movie
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn

  return (
  <>
  {!isLoggedIn && <Navigate to="/auth"/>}
  {isLoggedIn && <MovieBooking params={movie}/>}
  </>
  )
};

export default MoviePage;