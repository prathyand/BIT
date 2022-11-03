import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import classes from './MainNavigation.module.css';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
// import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs'
// import Button from 'react-bootstrap/Button';

const MainNavigation = () => {
  const ctxt = useContext(AuthContext)
  const navigate = useNavigate();
  const search = useRef()
  const updateLocation = (event) =>{
    event.preventDefault()
    ctxt.updateLocation(event.target.value)
  }
  const handleLogout = () => {
    ctxt.logout()
  }

  const data = [{
    poster:"Incredibles_2.jpeg",
    title:"Incredibles 2",
    description:"Test Description"
  },
  {
    poster:"Inside_out.jpeg",
    title:"Inside Out",
    description:"Test Description"
  },
  {
    poster:"Moana.jpeg",
    title:"Moana",
    description:"Test Description"
  },
  {
    poster:"Raya.jpeg",
    title:"Raya The Last Dragon",
    description:"Test Description"
  },
  {
    poster:"Soul.jpeg",
    title:"Soul",
    description:"Test Description"
  }]
  // Search value
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearchEnter = (event) => {
    if (event.which === 13) { handleSearch(event) }
  };

  const handleSearch = (event) => {
    event.preventDefault()
    if(value !== ""){
      navigate("/search",{state:{movie:data,searchVal:value}})
      setValue("")
    }
    // console.log(value)
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  return (
    <header className={classes.header}>
      <div style={{display:"flex"}}>
        <Link to='/' id="webTitle">
          <div className={classes.logo}>BookInTime</div>
        </Link>
        <Form.Select 
          aria-label="Choose Location" 
          style={{width:"11rem", marginLeft:"5px"}}
          onChange={updateLocation}
          placeholder="Select Location" size="sm">
          <option value="Bloomington">Bloomington</option>
          <option value="Indianapolis">Indianapolis</option>
          <option value="Minneapolis">Minneapolis</option>
        </Form.Select>
      </div>
      <div style={{display:"flex", alignItems:"center"}}>
        <div className={classes.searchContainer}>
          <div className={classes.searchInner}>
            <input type="text" ref={search}
                  onKeyDown={handleSearchEnter}
                  value={value}
                  onChange={onChange} 
                  placeholder="Search"/>
            <button onClick={handleSearch}>
              <BsSearch/>
            </button>
          </div>
          <div className={classes.dropdown}>
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const movieName = item.title.toLowerCase();

                return (
                  searchTerm &&
                  movieName.startsWith(searchTerm)
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.title)}
                  className={classes.dropdownRow}
                  key={item.title}
                >
                  {item.title}
                </div>
              ))}
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Movie</Link>
            </li>
            <li>
              <Link to='/theatrepage'>Theatre</Link>
            </li>
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
      </div>
    </header>
  );
};

export default MainNavigation;
