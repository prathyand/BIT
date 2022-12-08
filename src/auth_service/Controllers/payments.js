const stripe = require('stripe')('sk_test_51M5rnlBv4mV1XPloqdurElfnDWwMoggATRBIAVAOxJSs04CDqDbIWBe2FQsrWjsMMqF583j2eMMIvswWE2baOxVI00Bbo4GT5Y');
const YOUR_DOMAIN = 'https://localhost:3000/';

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