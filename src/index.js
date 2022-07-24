let currentdate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currentdate.getDay()];

let minutes = currentdate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = currentdate.getHours();

let date = `${day} ${hours}:${minutes}`;

let elementDate = document.querySelector("#date");
elementDate.innerHTML = date;

function showCurrentCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 2.237
  );

  let sunrise = document.querySelector(".x-rise");
  let sec = response.data.sys.sunrise;
  let sunriseTime = new Date(sec * 1000);
  let time = sunriseTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunrise.innerHTML = `${time}`;

  let sunset = document.querySelector(".set");
  let sec1 = response.data.sys.sunset;
  let sunsetTime = new Date(sec1 * 1000);
  let times = sunsetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunset.innerHTML = `${times}`;
}

function searchCity(city) {
  let apiKey = "e479457657257579193e6c4c14f91ff2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentCondition);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "e479457657257579193e6c4c14f91ff2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let showCity = document.querySelector("#city-search");
showCity.addEventListener("submit", searchButton);
searchCity("Manchester");
