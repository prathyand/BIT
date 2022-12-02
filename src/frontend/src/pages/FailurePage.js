const FailurePage = () => {
    let bookingDetails = localStorage.getItem("transaction")
    bookingDetails = JSON.parse(bookingDetails)
    console.log(bookingDetails)
    bookingDetails["paymentSuccess"] = false 
    bookingDetails = JSON.stringify(bookingDetails)
    return <div>
        Booking Failed {bookingDetails}
        </div>;
  };
  
  export default FailurePage;