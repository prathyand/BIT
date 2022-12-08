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
import {Fragment, useContext, useState} from 'react';
import classes from './CustomerServicePageContent.module.css';
import { BsColumns, BsSearch } from 'react-icons/bs';
import Request from '../../contexts/Request';

// https://www.youtube.com/watch?v=zQyrwxMPm88
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'


const CustomerServiceEmployeePageContent = () => {
    return (
    <section >
        <Fragment >
            <div className={classes.searchContainer}>
            </div>
        </Fragment>
    </section>
    );
};

export default CustomerServiceEmployeePageContent;