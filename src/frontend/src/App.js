import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
// import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import constants from './constants';
import MoviePage from './pages/MoviePage';
import TheatreMoviePage from './pages/TheatrePage';
import TheatreMovieBooking from './components/MovieBooking/TheatreMovieBooking';
import SearchPage from './pages/SearchPage'

function App(props) {
  const clientId = constants.CLIENT_ID
  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });
  return (
    <Layout>
      <Routes>
          <Route path='/' element={<HomePage />}exact></Route>
          <Route path='/auth' element={<AuthPage />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/movie' element={<MoviePage />}></Route>
          <Route path='/theatrepage' element={<TheatreMoviePage />}></Route>
          <Route path='/theatremovie' element={<TheatreMovieBooking />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
