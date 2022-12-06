import classes from './SuccessPage.module.css';

const FailurePage = () => {
    let bookingDetails = localStorage.getItem("transaction")
    bookingDetails = JSON.parse(bookingDetails)
    console.log(bookingDetails)
    bookingDetails["paymentSuccess"] = false 
    // bookingDetails = JSON.stringify(bookingDetails)
    return (
        <section className={classes.card}>
        <h3 className={classes.fail}>Booking Unsuccessful</h3>
          <span>Your transaction with transaction id <b>{bookingDetails.transactionId}</b> is unsuccessful. Please try again or reach out to the customer care for further clarification.</span>
          <br/>
        </section>
    );
  };
  
  export default FailurePage;