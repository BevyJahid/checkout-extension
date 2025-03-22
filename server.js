import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/apply-discount', async (req, res) => {
  const { discountPayload } = req.body;

  try {
    const response = await fetch('https://march1825.myshopify.com/admin/api/2025-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': 'your-access-token', // Replace with actual access token
      },
      body: JSON.stringify(discountPayload),
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});