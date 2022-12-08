import constants from '../constants';
import Request from '../contexts/Request';
import AuthContext from '../contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';
import classes from './SuccessPage.module.css';

const SuccessPage = () => {
  const [fetching, setFetchVal] = useState(true)
  const [bookingConfirmation, setBookingDets] = useState("")
  const request = useContext(Request)
  const loginToken = localStorage.getItem(constants.AUTH_TOKEN_KEY);
  let authContext = useContext(AuthContext)
  // const isLoggedin = authContext.isLoggedIn
  let bookingDetails = localStorage.getItem("transaction")
  bookingDetails = JSON.parse(bookingDetails)
  console.log(bookingDetails)
  bookingDetails["paymentSuccess"] = true 
  bookingDetails = JSON.stringify(bookingDetails)

  useEffect(()=>{
    authContext.login(loginToken)
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(authContext.isLoggedIn){
      let getProfile = request.getRequest(constants.REQUEST.PROFILE_EP);
      getProfile.then(response => {
          if(response.ok){
              response.json().then((data)=>{
                // eslint-disable-next-line
                  bookingDetails = JSON.parse(bookingDetails)
                  bookingDetails["email"] = data.user_email
                  bookingDetails["fname"] = data.first_name
                  bookingDetails["lname"] = data.last_name
                  let bookingReq = request.postRequest(constants.REQUEST.BOOKING,JSON.stringify(bookingDetails));
                  bookingReq.then(response => {
                    if(response.ok){
                        response.json().then((data)=>{
                            console.log(data)
                            setBookingDets(data)
                            setFetchVal(false)
                        })
                    }else{
                        console.log(response)
                        response.json().then((err)=>{
                            console.log(err)
                        })
                    }
                  })
              })
              // console.log(context)
              // this.props.navigation.navigate('./', {replace:true})
          }
      });
      // return fname,lname,mail
    }else{
      let bookingReq = request.postRequest(constants.REQUEST.BOOKING,bookingDetails);
      bookingReq.then(response => {
        if(response.ok){
            response.json().then((data)=>{
                console.log(data)
                setBookingDets(data)
                setFetchVal(false)
            })
        }else{
            console.log(response)
            response.json().then((err)=>{
                console.log(err)
            })
        }
      })
    }
    // eslint-disable-next-line
  },[authContext.isLoggedIn])

  return (
    <>
    {fetching && 
        <h1>Fetching Booking Details</h1>
    }
    {!fetching && 
      <div>
        <section className={classes.card}>
        <h3>Booking Successful</h3>
          <span>Hey {bookingConfirmation.details.fname},<br/> We have sent a confirmation mail to <b>{bookingConfirmation.details.email}</b>. Hope you enjoy the movie.Please find the booking details below</span>
          <br/>
          <br/>
          {/* <div>
            <div>
              <span className={classes.label}>Booking Id </span>
              <span>{bookingConfirmation.details.booking_id}</span>
            </div>
            <div>
              <span className={classes.label}>Movie Name </span>
              <span>{bookingConfirmation.details.moviename}</span>
            </div>
            <div>
              <span className={classes.label}>Theater Name </span>
              <span>{bookingConfirmation.details.theater}</span>
            </div>
            <div>
              <span className={classes.label}>Date</span>
              <span>{bookingConfirmation.details.reservation_date}</span>
            </div>
            <div>
              <span className={classes.label}>Show Time</span>
              <span>{bookingConfirmation.details.reservation_time}</span>
            </div>
            <div>
              <span className={classes.label}>Number of Seats</span>
              <span>{bookingConfirmation.details.seats}</span>
            </div>
            <div>
              <span className={classes.label}>Seat Numbers</span>
              <span>{bookingConfirmation.details.seatIDs}</span>
            </div>
          </div> */}
          <table>
            <tbody>
              <tr>
                <td><span className={classes.label}>Booking Id </span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.booking_id}</span></td>
              </tr>
              <tr>
                <td><span className={classes.label}>Movie Name </span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.moviename}</span></td>
              </tr>
              <tr>
                <td><span className={classes.label}>Theater Name </span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.theater}</span></td>
              </tr>
              <tr>
                <td><span className={classes.label}>Date</span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.reservation_date}</span></td>
              </tr>
              <tr>
                <td><span className={classes.label}>Show Time</span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.reservation_time}</span></td>
              </tr>
              <tr>
                <td><span className={classes.label}>Number of Seats</span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.seats}</span></td>
              </tr>
              <tr>
                <td><span className={classes.label}>Seat Numbers</span></td>
                <td><span className={classes.value}>{bookingConfirmation.details.seatIDs}</span></td>
              </tr>
            </tbody>
          </table>
          {/* <span>{JSON.stringify(bookingConfirmation)}</span> */}
        </section>
      </div>
    }
    </>
  );
};

export default SuccessPage;