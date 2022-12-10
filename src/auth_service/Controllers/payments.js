const stripe = require('stripe')('sk_test_51M5rnlBv4mV1XPloqdurElfnDWwMoggATRBIAVAOxJSs04CDqDbIWBe2FQsrWjsMMqF583j2eMMIvswWE2baOxVI00Bbo4GT5Y');
const CONSTANTS = require("../constants");

let YOUR_DOMAIN = 'http://localhost/';
if(CONSTANTS.environment!="docker"){
  YOUR_DOMAIN="http://149.165.169.69.nip.io/"
}

const payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Seat Reservation',
          },
          unit_amount: 1000,
        },
        quantity: parseInt(req.body.seats)
      },
    ],
    mode: 'payment',
    allow_promotion_codes: true,
    success_url: `${YOUR_DOMAIN}bookingsuccess`,
    cancel_url: `${YOUR_DOMAIN}bookingfail`,
  });
  res.send({redirect:session.url});
  // res.redirect(303, session.url);
};

module.exports = {payment};