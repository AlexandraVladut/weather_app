//display hour and day

let now = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
dayWeek = week[now.getDay()];
let dayChange = document.querySelector("#day");
dayChange.innerHTML = dayWeek;

Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
day = now.getDate();
month = Months[now.getMonth()];
year = now.getFullYear();
completeDate = `${day} ${month} ${year}`;

let dateChange = document.querySelector("#date");
dateChange.innerHTML = completeDate;

hourChange = document.querySelector("#hour");
hour = now.getHours();
minutes = ("0" + now.getMinutes()).slice(-2);
// minutes = now.getMinutes();
completeHour = `${hour} : ${minutes}`;
hourChange.innerHTML = completeHour;
//

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} °`;
  document.querySelector(
    "#description"
  ).innerHTML = ` ${response.data.weather[0].description}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "c54ef4831aa33703bc0280271dfa5d24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c54ef4831aa33703bc0280271dfa5d24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let radioOption = document.querySelectorAll("input[type='radio']");
function changeValue() {
  radioOption.forEach((element) => {
    if (element.checked) {
      unitMeasure = element;
    }
  });
  let temp = document.querySelector("#temperature");
  let tempValue = document
    .querySelector("#temperature")
    .textContent.replace(" °", "");
  if (unitMeasure.value === "farenheit") {
    farTemp = Math.round((tempValue * 9) / 5 + 32);
    temp.innerHTML = `${farTemp} °`;
  } else {
    celTemp = Math.round(((tempValue - 32) * 5) / 9);
    temp.innerHTML = `${celTemp} °`;
  }
}
radioOption.forEach((element) =>
  element.addEventListener("click", changeValue)
);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Zurich");
