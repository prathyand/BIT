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
        return fetch(domainName_gw1+url,params)
    };
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

    const handleGet = (url,data) => {
        switch(url){
            case "/profile":
                return getProfile(url)
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