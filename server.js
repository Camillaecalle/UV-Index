//Using AXIOS for HTTP requests and EJS templating.
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3006;

app.set('view engine', 'ejs');
//Set directory for EJS template, in 'views' folder.
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/get-uv', (req, res) => {
  const { latitude, longitude } = req.body;
  //API key for OpenUV.
  const apiKey = 'openuv-5a4urlwjo6ckx-io';
  const url = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;

  //Get request to OpenUV.
  axios.get(url, {
    headers: {
      'x-access-token': apiKey
    }
  })
  .then(response => {
    const uvIndex = response.data.result.uv;
    //Sending the response (UV Index) as JSON.
    res.json({ uvIndex });
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send('Error: Failed to retrieve UV index.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});