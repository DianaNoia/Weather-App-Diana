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

// 5 day forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img 
          src="https://openweathermap.org/img/wn/50d@2x.png" 
          alt="" 
          width="80"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temp-max">
            18º |</span>
          <span class="weather-forecast-temp-min">
            12º</span>
        </div>
      </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Change city based on search

function weather(response) {
  document.querySelector("#location").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

function changeTemperatureToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeTemperatureToC(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTemperatureToF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTemperatureToC);

// Default city search
citySearch("Lisbon");
displayForecast();
