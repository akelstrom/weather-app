//api key
var apiKey = "eb7b907aaf0cbad063ad71c08ba628dc";

//today's date
var date = moment().format("MM/DD/YYYY");

//submit button
var submitButtonEl = document.querySelector("#submit-btn");

//event listener for submit button
submitButtonEl.addEventListener("click", function (event) {
  event.preventDefault();

  //get cityname from search input value
  var cityName = document.querySelector("#city-input").value.trim();
  console.log(cityName);

  displayTodaysWeather(cityName);
  fiveDayDisplay(cityName);
});

//function to display todays weather
function displayTodaysWeather(cityName) {
  var todaysWeatherEl = document.querySelector("#todays-weather");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      todaysWeatherEl.innerHTML = `
        <h3>${data.name} (${date})</h3>
        <p>Temperature: ${data.main.temp} F </p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
        
       `;
      console.log(data);

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      fiveDayDisplay(lat,lon);
      //need to fetch call a different API to get the UI index, this API uses lat and long rather than city name
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          // var indexEl = document.querySelector("#uv-index");
          todaysWeatherEl.innerHTML += `<p>UV Index: ${data2.current.uvi}</p>`;
        });
    });
}

//function to display 5 day weather
function fiveDayDisplay(lat,lon) {
  
     fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=imperial&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("5 day",data);
          for (var i = 1; i < 6; i++) {
            console.log(data.daily[i])
            //use inner html to display 5 day forecast
            document.querySelector("#week-weather").innerHTML +=   `
            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
              <div class="card-header">${moment.unix(data.daily[i].dt).format("MM/DD/YYYY")} </div>
              <div class="card-body">
              <h5 class="card-title"><img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" /> </h5>
              <p class= "card-text"> Temp: ${data.daily[i].temp.day}</p>
              <p class= "card-text"> Humidity: ${data.daily[i].humidity}</p>
                </div>
              `
          }
        });
  
}
