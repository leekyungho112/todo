const weather = document.querySelector('.js-weather');
const titleWeather = document.querySelector('.weather__title');

const API_KEY = '8fd9cac23b610f4edb9c914bbfb03e9b';
const COORDS = 'coords';

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      const name = json.name;
      const description = json.weather[0].description;
      const img = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`;
      weather.innerHTML = `${temperature} @ ${name} @ ${description}: <img src="${img}" class="weather__img" /> `;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleError() {
  alert('새로고침 해주세요');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
