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
import classes from './CustomerServiceEmployeePageContent.module.css';
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

const CustomerServiceEmployeePageContent = () => {
    const [entry, setEntry] = useState("");
    const [searchCriteria, setCriteria] = useState("email");
    const request = useContext(Request);
    const path = "bookings/getCustomerInfo"
    const columns = ["Date", "Theater", "Movie", "Price", "Seats"]
    const data = [["12/1/2", "AMC12", "Film Red", "20", "3"]]


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
                    userID: ""
                }
            } else {
                body = {
                    email: "",
                    userID: value
                }
            }


            let getBookings = request.getRequest(path, body);
            getBookings.then(response => {
                if(response.ok){
                    response.json().then((data) => {
                        console.log(data)
                        // need some function for displaying data
                    })
                }
            })
        }
    }

    const changeValue = (event) => {
        setEntry(event.current.value) // might not need current here?
    }

    const changeCriteria = (choice) => {
        setCriteria(choice.value)
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
                <Table columns={columns} body={data}/>
            </div>
            <div></div>
        </Fragment>
    </section>
    );
};

export default CustomerServiceEmployeePageContent;