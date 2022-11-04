import React from "react"
import constants from '../constants';

const Request = React.createContext({
    getRequest : (url,data) => {},
    postRequest : (url,data) => {}
});

export const RequestProvider = (props)=>{
    const domainName_gw1 = "http://" + constants.GATEWAY1 + ":" + constants.GATEWAY1_PORT;
    const webDomain = "http://" + constants.DOMAIN + ":" + constants.FE_PORT
    const fetchRequest =  (method,url,reqBody,reqHeader) => {
        let headerPart = reqHeader ? reqHeader : {
            "Content-Type" : "application/json"
        }
        return fetch(
            domainName_gw1+url,
            {
            method : method,
            body : reqBody,
            headers:headerPart
        });
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
    const handleGet = (url,data) => {

    };
    const handlePost = (url,data) => {
        switch(url){
            case "/auth/google":
                return sendGoogleAuth(url,data)
            case "/login":
            case "/signup":
                return sendAuthCreds(url,data)
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