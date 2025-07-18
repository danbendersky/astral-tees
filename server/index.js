// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
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
    console.log(response);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
