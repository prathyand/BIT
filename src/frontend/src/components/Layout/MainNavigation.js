import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctxt = useContext(AuthContext)
  const handleLogout = () => {
    ctxt.logout()
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>BookInTime</div>
      </Link>
      <nav>
        <ul>
          {!ctxt.isLoggedIn && 
            (
              <li>
                <Link to='/auth'>Login</Link>
              </li>
            )
          }
          {ctxt.isLoggedIn && 
            (
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
            )
          }
          {ctxt.isLoggedIn && 
            (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
