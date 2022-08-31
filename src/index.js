// Display current date and time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = `${now.getHours()}:${now.getMinutes()}`;

let currentDateTime = document.querySelector(".date-time");

currentDateTime.innerHTML = `${day} ${hours}`;

// Change city based on search

citySearch("Porto");

function weather(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#precipitation").innerHTML =
    response.data.precipitation;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function citySearch(city) {
  let apiKey = "a099aaabac5a8e6cda6b74718ac36455";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(weather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

// Current city via geolocation

function searchCityViaLocation(position) {
  let apiKey = "a099aaabac5a8e6cda6b74718ac36455";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(weather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCityViaLocation);
}

let currentLocBtn = document.querySelector("#current-location-button");
currentLocBtn.addEventListener("click", currentLocation);

// Celsius/Fahrenheit conversion

// function changeTemperatureToC(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector(".temperature-value");
//   let temperature = displayTemperature;
//   let celsiusTemperature = Math.round(temperature);

//   currentTemp.innerHTML = celsiusTemperature;
// }

// function changeTemperatureToF(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector(".temperature-value");
//   let temperature = 24;
//   let farenheitTemperature = Math.round((temperature * 9) / 5 + 32);

//   currentTemp.innerHTML = farenheitTemperature;
// }

// let celsius = document.querySelector(".celsius");
// celsius.addEventListener("click", changeTemperatureToC);
// let farenheit = document.querySelector(".farenheit");
// farenheit.addEventListener("click", changeTemperatureToF);
