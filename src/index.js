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

//Forecast
function displayForecast(){
let forecastElement=document.querySelector("#forecast");

let forecastHTML="<div class="row">";
forecastHTML= forecastHTML + `
<div class="weather-forecast" id="forecast">

  <div class="col-2">
    <div class="forecast-day">Monday</div>
    <!-- <img src="" alt=""> -->
    <div class="forecast-icon">🌤️</div>
    <div class="forecast-temperatures">
      <span class="forecast-min-temp">32°F | </span><span class="forecast-max-temp">57°F</span>
    </div>

  </div>
</div>

</div>

`;
forecastHTML=`</div`>;
forecastHTML= forecastHTML + `
<div class="weather-forecast" id="forecast">

  <div class="col-2">
    <div class="forecast-day">Monday</div>
    <!-- <img src="" alt=""> -->
    <div class="forecast-icon">🌤️</div>
    <div class="forecast-temperatures">
      <span class="forecast-min-temp">32°F | </span><span class="forecast-max-temp">57°F</span>
    </div>

  </div>
</div>

</div>

`;
forecastHTML=`</div`>;

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

  let iconElement = document.querySelector("#icon");

  displayForecast();

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