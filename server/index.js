// index.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_LIVE_KEY);
const app = express();
const PORT = process.env.PORT || 3001;
const DOMAIN = 'https://astral-tees-client.onrender.com';
const sharp = require('sharp');
const cors = require('cors');;
app.use(cors({
  origin: 'https://astral-tees-client.onrender.com',
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  console.log("REQ.BODY.ITEMS:", req.body.items);
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: req.body.items,
    mode: 'payment',
    automatic_tax: {
      enabled: true,
    },
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

app.get('/image-proxy-transparent', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Missing url');

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(404).send('Image not found');

    const buffer = await response.buffer();

    // Load image with sharp
    const image = sharp(buffer).ensureAlpha();

    // Extract raw RGBA pixels
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const threshold = 250; // 0-255, tweak to catch near-white

    // Iterate over pixels (RGBA)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (r > threshold && g > threshold && b > threshold) {
        // Set alpha to 0 to make pixel transparent
        data[i + 3] = 0;
      }
    }

    // Use Sharp to remove white-ish background (fuzz factor to remove near-white)
    const processedBuffer = await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      }
    }).png().toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(processedBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
