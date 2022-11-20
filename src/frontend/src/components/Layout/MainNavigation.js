import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import classes from './MainNavigation.module.css';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
// import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
// import Button from 'react-bootstrap/Button';
import { useContext, useCallback, useEffect, useState,useRef } from 'react';
import Request from '../../contexts/Request';
import constants from '../../constants';

const MainNavigation = () => {
  const ctxt = useContext(AuthContext)
  const navigate = useNavigate()
  const search = useRef()
  const searchCriteria = useRef()
  const [cities,setCities] = useState([])
  const [movies, setMovies] = useState([])
  const [suggestions, setSuggestions] = useState("movie")
  const [theaters, setTheaters] = useState([])
  const request = useContext(Request);
  const [selectedCity,setSelectedCity] = useState("Bloomington")
  const updateLocation = (event) =>{
    event.preventDefault()
    setSelectedCity(event.target.value)
    ctxt.updateLocation(event.target.value)
  }
  const handleLogout = () => {
    ctxt.logout()
  }
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
      let criteria = searchCriteria.current.value
      if(!criteria){
        criteria = "movie"
      }
      let state = {}
      switch(criteria){
        case "movie":
          state = {
            movie: movies,
            searchVal: value,
            searchCriteria: criteria
          }
          break;
        case "theater":
          state = {
            theaters: theaters,
            searchVal: value,
            searchCriteria: criteria
          }
          break;
        default:

      }
      navigate("/search",{state:state})
      setValue("")
    }
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  const criteriaChange = (event) => {
    event.preventDefault()
    let criteria = searchCriteria.current.value
    if(criteria === "movie"){
      setSuggestions("movie")
    }else if(criteria === "theater"){
      setSuggestions("theater")
    }
  }

  const fetchCities = useCallback(() => {
    let getMovies = request.getRequest(constants.REQUEST.CITIES);
    getMovies.then(response => {
        if(response.ok){
            response.json().then((data)=>{
              console.log(data)
              setCities(data.cities)
            })
        }else{
            console.log(response)
        }
    });
  },[request]);

  const fetchMovies = useCallback(() => {
    let getMovies = request.getRequest(constants.REQUEST.MOVIES);
    getMovies.then(response => {
        if(response.ok){
            response.json().then((data)=>{
              console.log(data.movieidList)
              setMovies(data.movieidList)
            })
        }else{
            console.log(response)
        }
    });
  },[request]);

  const fetchTheaters = useCallback(() => {
    let getTheaters = request.getRequest(constants.REQUEST.THEATERS);
    getTheaters.then(response => {
        if(response.ok){
            response.json().then((data)=>{
              console.log(data.theaterList)
              setTheaters(data.theaterList)
            })
        }else{
            console.log(response)
        }
    });
  },[request]);

  useEffect(()=>{
      fetchCities()
      fetchMovies()
      fetchTheaters()
      // eslint-disable-next-line
  },[fetchMovies,fetchTheaters])

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
          value={selectedCity}
          placeholder="Select Location" size="sm">
            {cities.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
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
            <select 
              aria-label="Search By" 
              placeholder="Select Search Criteria" 
              ref={searchCriteria}
              onChange={criteriaChange}>
              <option value="movie">Movie</option>
              <option value="zip">ZipCode</option>
              <option value="theater">Theater</option>
            </select>
            <button onClick={handleSearch}>
              <BsSearch/>
            </button>
          </div>
          <div className={classes.dropdown}>
            {suggestions === "movie" && movies
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const movieName = item.title.toLowerCase();

                return (
                  searchTerm &&
                  searchTerm !== movieName && 
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
            {suggestions === "theater" && theaters
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const theterName = item.name.toLowerCase();

                return (
                  searchTerm &&
                  searchTerm !== theterName && 
                  theterName.startsWith(searchTerm)
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.name)}
                  className={classes.dropdownRow}
                  key={item.name}
                >
                  {item.name}
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
