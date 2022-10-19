import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App(props) {
  return (
    <Layout>
      <Routes>
          <Route path='/' element={<HomePage />}exact></Route>
          <Route path='/auth' element={<AuthPage />}></Route>
          <Route path='/profile' element={<UserProfile />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
