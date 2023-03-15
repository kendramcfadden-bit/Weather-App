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

let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = `Date/Time: ${day} ${hour}:${minute}`;

//Search Engine JS
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-input");

  let h5 = document.querySelector("h5");
  // alert(`${searchInput.value}`);
  h5.innerHTML = `Searching for ${searchInput.value}...`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
