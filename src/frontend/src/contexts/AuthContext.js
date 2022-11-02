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

  const navigate = useNavigate();

  const isLoggedIn = !!token

  const loginHandler = (token) => {
    setToken(token.token)
  }

  const logoutHandler = () => {
    setToken(null)
    navigate("/")
  }

  const context = {
    token : token,
    isLoggedIn : isLoggedIn,
    login : loginHandler,
    logout : logoutHandler
  }
  // console.log(props)
  return (<AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>)
}

export default AuthContext