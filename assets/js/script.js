const searchCont = document.querySelector("#searchCont")
const userForm = document.querySelector("#userForm");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#button");
const historyCont = document.querySelector("#historyContainer");
let historyListItem = document.querySelector("#historyListItem");
const weatherCont = document.querySelector("#weatherForecastCont")
const todaysForecast = document.querySelector("#todaysForecast");
const todaysInfo = document.querySelector("#todaysInfo");
const cityNameDisplay = document.querySelector("#cityName");
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const weekForecast = document.querySelector("#weekForecast");
const fiveDay = document.querySelector(".five-day")

const apiKey = "522836f5c966e7d724b78aa476376de7"


// function getCityInfo (city) {
    // return;
    // $searchInput.value()
    // let geoName = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=${apiKey}"

    // console.log(geoCodeUrl);

    // fetch(geoCodeUrl)
    //     .then(function (response) {
    //         if (response.status)
    //         response.json()
    //     })



// }

function formSumbitCity (event) {
    event.preventDefault();
    var cityName = searchInput.value;

    if (cityName) {
        getCityInfo(cityName);

        weatherCont.textContent = '';
        searchInput.value = '';
    } else {
        var message = document.createElement("p");
        message.classList = "text-start ms-2 fs-5 text-danger"
        alert("*Please Enter a City*");
        };
    }

userForm.addEventListener('submit', formSumbitCity);

