//Date Time JS
let now = new Date();
//let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// let months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];

let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
//let year = now.getFullYear();
//let day=now.getDay();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// //Note stating "searching for..."
// function search(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#location-input");

//   let h5 = document.querySelector("h5");
//   // alert(`${searchInput.value}`);
//   h5.innerHTML = `Searching for ${searchInput.value}...`;
// }
// let form = document.querySelector("#search-form");
// form.addEventListener("submit", search);

//Forecast Display
function displayForecast(response) {
  
  let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay,index) {
if (index<6) {

  forecastHTML =
  forecastHTML +
  `
  <div class="col-2">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    
    <div class="forecast-icon">🌤️</div>


    <div class="forecast-temperatures">
   <span class="forecast-min-temp">${Math.round(forecastDay.temp.min)}°F | </span><span class="forecast-max-temp">${Math.round(forecastDay.temp.max)}°F</span>
 </div>

  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


//Get the forecast data API call
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl=`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

//Search Engine 
function displayWeather(response) {
  let temperatureCElement=document.querySelector("#temperatureC");
  let celsiusTemperature = response.data.main.temp;
  temperatureCElement.innerHTML = Math.round(celsiusTemperature);
  
  let temperatureFElement=document.querySelector("#temperatureF");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureFElement.innerHTML = Math.round(fahrenheiTemperature);
  
  
 
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
 
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let dateElement = document.querySelector("#date-time");
  // dateElement.innerHTML = formatDate(response.data.dt * 1000);
  dateElement.innerHTML = ` ${day} ${hour}:${minute}`;

getForecast(response.data.coord)


  let iconElement = document.querySelector("#icon");

  // displayForecast();

}

function searchCurrentLocation(position) {
  let key = "ac209dae1f283fb332a5bb7f50b0f468";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;
  axios.get(url).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
function getNewLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchNewLocation(city);
}

function searchNewLocation(city) {
  //let city = document.querySelector("#city-input");
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}



//BUTTON EVENT LISTENERS
let searchLocationButton = document.querySelector("#search-form");
searchLocationButton.addEventListener("submit", getNewLocation);

// let currentLocationButton = document.querySelector(
//   ".current-location-search-button"
// );
// currentLocationButton.addEventListener("click", getCurrentLocation);

// displayForecast();