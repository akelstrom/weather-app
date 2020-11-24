//get cityname from search input value
var cityName = document.querySelector("#city-input").value

//api key
var apiKey = "eb7b907aaf0cbad063ad71c08ba628dc"

//date
var date = moment().format('MM/DD/YYYY')




function displayTodaysWeather(cityName) {
   var todaysWeatherEl = document.querySelector("#todays-weather")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
    .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        todaysWeatherEl.innerHTML = `
        <h3>${data.name}, ${date}</h2>
        <h3>Temperature: ${data.main.temp} F </h2>
        <h3>Humidity: ${data.main.humidity}%</h2>
        <h3>Wind Speed: ${data.wind.speed} mph</h2>
       `
      
        console.log(data)
     
        var latitude = data.coord.lat
        var long = data.coord.lon

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${long}&exclude=minutely,alerts&appid=${apiKey}`)
      .then(function(response) {
        return response.json();
        
        })
        .then(function(data){
         
            
           //enter some code here that will append UVI to todaysWeatherEl
          
            console.log(data);
        })      
    })
}

displayTodaysWeather("chicago");