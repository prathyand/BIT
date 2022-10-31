import MovieBooking from '../components/MovieBooking/MovieBooking';
import {useLocation} from 'react-router-dom';

const MoviePage = (props) => {
  const location = useLocation()
  const movie = location.state.movie

  return <MovieBooking params={movie}/>;
};

export default MoviePage;