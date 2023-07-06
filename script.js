var preloader = document.getElementById("loading");

function firstLoad() {
  preloader.style.display = "none";
}

const apiKey = "041a381a69eb072aedb68307a4602d19";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels_like").innerHTML =
      data.main.feels_like + " °C";
    document.querySelector(".pressure").innerHTML =
      data.main.pressure / 1000 + " KPa";
      // console.log(data.wind.speed + " km/h");

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.gif";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

function handle() {
  if (e.key === "Enter") {
    searchBtn.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });
  }
  return false;
}

let myText = document.getElementById("searchText");
let btn = document.getElementById("btn");

myText.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    btn.click();
  }
});

//comeback message for tab bar
let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come back :(";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});




