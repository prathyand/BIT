import React, { useState } from "react"
import { useNavigate } from "react-router"

const AuthContext = React.createContext({
  token:"",
  isLoggedIn : false,
  login:(token)=>{},
  logout:()=>{}
})

export const AuthContextProvider = (props)=>{
  const [token,setToken] = useState(null)
  const [location,setLocation] = useState("Bloomington")

  const navigate = useNavigate();

  const isLoggedIn = !!token

  const loginHandler = (token) => {
    setToken(token.token)
  }

  const logoutHandler = () => {
    setToken(null)
    navigate("/")
  }

  const updateLocation = (value) => {
    setLocation(value)
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