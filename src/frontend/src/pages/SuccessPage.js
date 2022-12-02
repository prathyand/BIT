const SuccessPage = () => {
let bookingDetails = localStorage.getItem("transaction")
bookingDetails = JSON.parse(bookingDetails)
bookingDetails["paymentSuccess"] = true 

  return <div>
      Booking Successful {bookingDetails}
  </div>;
};

export default SuccessPage;