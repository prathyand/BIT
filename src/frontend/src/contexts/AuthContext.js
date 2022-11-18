import React, { useState } from "react"
import { useNavigate } from "react-router"
import constants from "../constants"

const AuthContext = React.createContext({
  token:"",
  isLoggedIn : false,
  login:(token)=>{},
  logout:()=>{},
  location:"",
  updateLocation:(value)=>{}
})

export const AuthContextProvider = (props)=>{
  const [token,setToken] = useState(null)
  const [location,setLocation] = useState("Bloomington")

  const navigate = useNavigate();

  const isLoggedIn = !!token

  const loginHandler = (token) => {
    setToken(token)
    window.localStorage.setItem(constants.AUTH_TOKEN_KEY,token)
  }

  const logoutHandler = () => {
    setToken(null)
    window.localStorage.removeItem(constants.AUTH_TOKEN_KEY)
    navigate("/auth")
  }

  const updateLocation = (value) => {
    setLocation(value)
    navigate("/")
  }

  const context = {
    token : token,
    isLoggedIn : isLoggedIn,
    location: location,
    login : loginHandler,
    logout : logoutHandler,
    updateLocation : updateLocation
  }
  // console.log(props)
  return (<AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>)
}

export default AuthContext