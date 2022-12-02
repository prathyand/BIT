const SuccessPage = () => {
let bookingDetails = localStorage.getItem("transaction")
bookingDetails = JSON.parse(bookingDetails)
console.log(bookingDetails)
bookingDetails["paymentSuccess"] = true 
bookingDetails = JSON.stringify(bookingDetails)

  return (
    <div>
      Booking Successful {bookingDetails}
    </div>
  );
};

export default SuccessPage;