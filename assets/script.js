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
      fiveDayDisplay(cityName)
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
        <h3>${data.name} (${date})</h3>
        <p>Temperature: ${data.main.temp} F </p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
        
       `;
      console.log(data);

      var latitude = data.coord.lat;
      var long = data.coord.lon;

      //need to fetch call a different API to get the UI index, this API uses lat and long rather than city name
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${long}&exclude=minutely,alerts&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          // var indexEl = document.querySelector("#uv-index");
          todaysWeatherEl.innerHTML += `<p>UV Index: ${data2.current.uvi}</p>`;
          console.log(data2);
        });
    });

}


    //function to display 5 day weather
    function fiveDayDisplay(cityName) {
      
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
      )
      .then(function (response) {
        return response.json()
      })
      .then(function (data){
        console.log(data);
     
      
      var latitude = data.coord.lat;
      var long = data.coord.lon;

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${long}&exclude=minutely,alerts&units=imperial&appid=${apiKey}`)

      .then(function (response){
        return response.json()
      })
      .then(function (data3){
        console.log(data3);
        console.log(data3.daily[4]);
        for (var i = 0; i < data3.daily[i]; i++) {

        }
        
      })
    })
    }