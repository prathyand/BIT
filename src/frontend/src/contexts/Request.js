import React from "react";
import constants from '../constants';
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';

const Request = React.createContext({
    getRequest : (url,data) => {},
    postRequest : (url,data) => {}
});

export const RequestProvider = (props)=>{
    const domainName_gw1 = "http://" + constants.REACT_APP_GATEWAY + ":" + constants.REACT_APP_GATEWAY_PORT;
    const webDomain = "http://" + constants.DOMAIN + ":" + constants.FE_PORT;
    const authContext = useContext(AuthContext)
    const fetchRequest =  (method,url,reqBody,reqHeader) => {
        let headerPart = reqHeader ? reqHeader : {
            "Content-Type" : "application/json"
        }
        let params = {
            method : method,
            headers: headerPart
        };
        if(method === "POST"){
            params["body"] = reqBody
        }
        console.log(params)
        return fetch(domainName_gw1+url,params)
    };
    // const fetchRequesttemp =  (method,url,reqBody,reqHeader) => {
    //     let headerPart = reqHeader ? reqHeader : {
    //         "Content-Type" : "application/json"
    //     }
    //     let params = {
    //         method : method,
    //         headers: headerPart
    //     };
    //     if(method === "POST"){
    //         params["body"] = reqBody
    //     }
    //     return fetch("http://localhost:3001"+url,params)
    // };
    const sendGoogleAuth = (url,data) => {
        let body = JSON.stringify(
        {
            idToken: data.tokenId
        });
        let header = {
            "Content-Type" : "application/json",
            "Origin" : webDomain
        }
        return fetchRequest("POST",url,body,header)
    };

    const sendAuthCreds = (url,data) => {
        let body = JSON.stringify(data)
        return fetchRequest("POST",url,body);
    };

    const sendUpdateProfile = (url,data) => {
        let header = {
            "Content-Type" : "application/json",
            token : authContext.token
        }
        return fetchRequest("POST",url,data,header)
    }

    const getProfile = (url) => {
        let header = {
            token : authContext.token
        }
        return fetchRequest("GET",url,"",header)
    }

    const testToken = (url,data) => {
        let header = {
            token : data.token
        }
        return fetchRequest("GET","/profile","",header)
    }

    const getMovies = (url) => {
        let header = {
            token : authContext.token
        }
        let tempUrl = url + authContext.location
        return fetchRequest("GET",tempUrl,"",header)
    }

    const getMovieTheatersndShows = (url,data) => {
        let header = {
            token : authContext.token
        }
        let tempUrl = url + data.movieId
        return fetchRequest("GET",tempUrl,"",header)
    }

    const getCities = (url) => {
        let header = {
            token : authContext.token
        }
        return fetchRequest("GET",url,"",header)
    }

    const getCustomerInfo = (url, data) => {
        let header = {
            token : authContext.token
        }
        console.log(header)
        return fetchRequest("GET",url,data,header)
    }

    const getTheaterMovies = (url,data) => {
        let header = {
            token : authContext.token
        }
        let tempUrl = url + data.theaterId
        return fetchRequest("GET",tempUrl,"",header)
    }

    const getResultsByZipcode = (url,data) => {
        let header = {
            token : authContext.token
        }
        let tempUrl = url + data.zipcode
        return fetchRequest("GET",tempUrl,"",header)
    }

    const sendPaymentReq = (url,data) => {
        let body = JSON.stringify(data)
        let header = {
            "Content-Type" : "application/json"
        }
        if(authContext.token && authContext.isLoggedIn){
            header = {
                "Content-Type" : "application/json",
                token : authContext.token
            }
        }
        return fetchRequest("POST",url,body,header)
    }

    const sendBookingDetails = (url,data) => {
        let header = {
            "Content-Type" : "application/json"
        }
        if(authContext.token && authContext.isLoggedIn){
            header = {
                "Content-Type" : "application/json",
                token : authContext.token
            }
        }
        return fetchRequest("POST",url,data,header)
    }

    const sendChangePassword = (url,data) => {
        let header = {
            "Content-Type" : "application/json"
        }
        if(authContext.token && authContext.isLoggedIn){
            header = {
                "Content-Type" : "application/json",
                token : authContext.token
            }
        }
        return fetchRequest("POST",url,data,header)
    }

    const handleGet = (url,data) => {
        switch(url){
            case "/profile":
                return getProfile(url)
            case "/movies/city/":
            case "/theaters/city/":
                return getMovies(url)
            case "/theaters/movie/":
                return getMovieTheatersndShows(url,data)
            case "/cities":
                return getCities(url)
            case constants.REQUEST.THEATERS_MOVIES:
                return getTheaterMovies(url,data)
            case "/test":
                return testToken(url,data)
            case constants.REQUEST.MOVIEZIP:
            case constants.REQUEST.THEATERZIP:
                return getResultsByZipcode(url,data)
            case '/bookings/customerInfo':
                return getCustomerInfo(url, data)
            default:
                break;
        }
    };

    const handlePost = (url,data) => {
        switch(url){
            case "/auth/google":
                return sendGoogleAuth(url,data)
            case "/login":
            case "/signup":
                return sendAuthCreds(url,data)
            case "/updateprofile":
                return sendUpdateProfile(url,data)
            case "/payment":
                return sendPaymentReq(url,data)
            case constants.REQUEST.BOOKING:
                return sendBookingDetails(url,data)
            case constants.REQUEST.CHANGE_PASSWORD:
            case constants.REQUEST.FORGOT_PASSWORD:
                return sendChangePassword(url,data)
            default:
                break;
        }
    };
    const context = {
        getRequest : handleGet,
        postRequest : handlePost
    };

    return (<Request.Provider value={context}>{props.children}</Request.Provider>)
}

export default Request