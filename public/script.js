document.getElementById('locationForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const apiKey = 'openuv-5a4urlwjo6ckx-io';
  
    const url = `/api/uv?lat=${latitude}&lng=${longitude}`;
  
    axios.get(url)
      .then(response => {
        const data = response.data;
        const uvIndex = data.uv;
        document.getElementById('uvIndex').textContent = uvIndex;
        document.getElementById('sunscreenMessage').textContent = uvIndex > 3 ? 'It is recommended to wear sunscreen.' : 'No sunscreen needed.';
        document.getElementById('uv-info').classList.add('visible');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve UV index. Please try again later.');
      });
  });
  