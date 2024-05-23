const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the EJS view for the root URL
app.get('/', (req, res) => {
  res.render('index');
});

// API endpoint to fetch UV index data
app.get('/api/uv', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get('https://api.openuv.io/api/v1/uv', {
      params: { lat, lng },
      headers: { 'x-access-token': process.env.OPENUV_API_KEY }
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching UV data:', error);
    res.status(500).json({ error: 'Failed to retrieve UV index data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
