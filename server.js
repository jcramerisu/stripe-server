// 1 Day Pass price_1N1LWzBXnoWqaCfiq3bhB6uB
// 2 Day Pass price_1N1LXTBXnoWqaCfiFeSbpcHO

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51N1KwIBXnoWqaCfihEV0xZfVBrmvniS9R9srFJHOYFVuq3FShd8S1C7mqrzTB8PdaCIKP3RuqYoDoPJzWbhpXYWO00gDuY8Snv'
);

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItmes,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log('Listening on port 4000'));
