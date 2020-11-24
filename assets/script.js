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

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayTodaysWeather(cityName);
    });
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
        <h2>${data.name}, ${date}</h2>
        <h3>Temperature: ${data.main.temp} F </h3>
        <h3>Humidity: ${data.main.humidity}%</h3>
        <h3>Wind Speed: ${data.wind.speed} mph</h3>
       `;
      console.log(data);

      var latitude = data.coord.lat;
      var long = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${long}&exclude=minutely,alerts&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          var indexEl = document.querySelector("#uv-index");
          indexEl.innerHTML = `<h3>UV Index: ${data2.current.uvi} <h3>`;
          console.log(data2);
        });
    });
}
