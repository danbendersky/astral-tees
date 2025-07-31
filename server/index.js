// index.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')('sk_test_51RqdhLAeDiglaAruwhJC5jLbEO57jS6E70FdXNUw6FbFAcNg6HxzQTSuyBottk8eIEnvOClcZKJxm7aq0N6BmqjI00aTF8R3vq');
const app = express();
const PORT = 3001;
const DOMAIN = 'http://localhost:3000'

// Middleware to parse JSON
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price: 'price_1RqxakAeDiglaAruBPLX42mv',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/fetchallproducts', async (_, res) => {
  console.log('Key');
  console.log('GELATO_KEY:', process.env.GELATO_KEY);
  try {
    const response = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/7ba90630-b393-41f1-a867-65dfb5380f02/products`, {
      headers: {
        'X-API-KEY': process.env.GELATO_KEY
      }
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

app.get('/fetchproduct', async (req, res) => {
  const productUid = req.query.id;
  if (!productUid) {
    return res.status(400).json({ error: 'Missing productUid parameter' });
  }
  try {
    const response = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/7ba90630-b393-41f1-a867-65dfb5380f02/products/${productUid}`, {
        headers: {
          'X-API-KEY': process.env.GELATO_KEY
        }
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
