
//import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
// import context from 'react-bootstrap/esm/AccordionContext';
// import AuthContext from '../../contexts/AuthContext';
// import { useState } from 'react';
// import CONSTANTS from '../../constants';

// import React from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Request from '../../contexts/Request';
// import constants from '../../constants';
// import AuthContext from '../../contexts/AuthContext';
// import classes from './StartingPageContent.module.css';
import {Component, Fragment, useContext, useState} from 'react';
import classes from './CustomerServiceSearchPageContent.module.css';
import { BsSearch } from 'react-icons/bs';
import Request from '../../contexts/Request';


class TableRow extends Component {
    render() {
        var row = this.props.row;
        return (
            <tr>
                {row.map((val) => (
                    <td>{val}</td>
                ))}
            </tr>
        )
    }
}

class Table extends Component {
    render() {
        var columns = this.props.columns;
        var body = this.props.body;

        return (
            <table style={{width: 500}}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                        <th>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {body.map((row) => (
                        <TableRow row={row}/>
                    ))}
                </tbody>
            </table>)
    }
}


const CustomerServiceSearchPageContent = () => {
    const [entry, setEntry] = useState("");
    const [searchCriteria, setCriteria] = useState("email");
    const [userData, setUserData] = useState([[]])
    const request = useContext(Request);
    const path = "/bookings/customerInfo"
    // const columns = ["Date", "Theater", "Movie", "Price", "Seats"]
    const columns = ["User_ID", "Email", "Theater_ID", "Theater", "Movie_ID", "Movie_Name", "Price", "Seats"]
    //const columns = ["User_ID", "Email", "fname", "lname", "Theater_ID", "Theater", "Movie_ID", "Movie_Name", "Price", "Seats", "transactionID", "Date", "Time"]
    const body = [["12/1/2", "AMC12", "Film Red", "20", "3"]]


    const handleSearch = async () => {
        let value = entry
        let criteria = searchCriteria
        console.log(value)
        console.log(criteria)
        let body = {
            email: "",
            userID: ""
        }

        if (value !== "" && criteria !== "") {
            if(criteria == "email"){
                body = {
                    email: value,
                    userId: ""
                }
            } else {
                body = {
                    email: "",
                    userId: value
                }
            }

            console.log(body)

            let getBookings = request.getRequest(path, body);
            console.log(getBookings)
            getBookings.then(response => {
                if(response.ok){
                    response.json()
                    .then((data) => {
                        console.log(data)
                        setUserData(data)
                        // need some function for displaying data
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
        }
    }

    const changeValue = (event) => {
        setEntry(event.target.value) // might not need current here?
    }

    const changeCriteria = (choice) => {
        setCriteria(choice.target.value)
    }

    // use table tag
    // predefine header, called thead for header names
    // look at line 241 of MovieBooking.js
    // for rows have state variable that will dynamically update

    return (
    <section className={classes.main}>
        <Fragment >
            <div className={classes.searchContainer}>
                <input type="text"
                    placeholder="Search"
                    onChange={changeValue}/>
                <select placeholder="Search by"
                        aria-label="Seach by"
                        // ref={searchCriteria} // makes page go blank?
                        onChange={changeCriteria}>
                    <option value="email">Email</option>
                    <option value="userID">userID</option>
                </select>
                <button onClick={handleSearch}>
                    <BsSearch/>
                </button>
            </div>
            <div className={classes.tableContainer}>
                <Table columns={columns} body={body}/>
            </div>
            <div></div>
        </Fragment>
    </section>
    );
};

export default CustomerServiceSearchPageContent;