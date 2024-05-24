document.getElementById('locationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //Retrieving user inputs.
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    //Post request.
    axios.post('/get-uv', { latitude, longitude })
      .then(response => {
        //Retreiving UV index.
        const uvIndex = response.data.uvIndex;
        document.getElementById('uvIndex').textContent = uvIndex;
        //If UV index greater than 3 prompt users to wear sunscreen. Otherwise no.
        document.getElementById('sunscreenMessage').textContent = uvIndex > 3 ? 'It is recommended to wear sunscreen.' : 'No sunscreen needed.';
        //Making UV information 'visible'.
        document.getElementById('uv-info').classList.add('visible');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve UV index. Please try again later.');
      });
  });