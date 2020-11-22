function displayTodaysWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=eb7b907aaf0cbad063ad71c08ba628dc`)
    .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        document.querySelector("#todays-weather").innerHTML = `
        <h2>${data.name}</h2>
        <h2>Date: 11/21/2020</h2>
        <h3>Temperature: ${data.main.temp} F </h3>
        <h3>Humidity: 20%</h3>
        <h3>Wind Speed:4.7 mph</h3>
        <h3>UV Index:9.49</h3>`
        console.log(data)
     

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=eb7b907aaf0cbad063ad71c08ba628dc`)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.data.length === 0) {
          console.log('open weather map could not find anything for that.');
        } else {
          console.log(response.data[0]);
          var responseContainerEl = document.querySelector('#response-container');
          responseContainerEl.innerHTML = '';
          var gifImg = document.createElement('img');
          gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
          responseContainerEl.appendChild(gifImg);
        }
      });
    })
}

displayTodaysWeather("chicago");