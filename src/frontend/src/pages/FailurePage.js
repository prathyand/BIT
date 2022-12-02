const FailurePage = () => {
    let bookingDetails = localStorage.getItem("transaction")
    bookingDetails = JSON.parse(bookingDetails)
    console.log(bookingDetails)
    bookingDetails["paymentSuccess"] = false 
    return <div>
        Booking Failed 
        </div>;
  };
  
  export default FailurePage;