const searchCont = document.querySelector("#searchCont")
const userForm = document.querySelector("#userForm");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("button");
const historyCont = document.querySelector("#historyContainer");
let historyListItem = document.querySelector("#historyListItem");
const weatherCont = document.querySelector("#weatherCont")
const todaysForecast = document.querySelector("#todaysForecast");
const todaysInfo = document.querySelector("#todaysInfo");
const cityNameDisplay = document.querySelector("#cityName");
const cityName = document.querySelector("#cityName");
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const time = document.querySelector("#time")



const weekForecast = document.querySelector("#weekForecast");
const fiveDay = document.querySelector(".five-day")


const apiKey = "522836f5c966e7d724b78aa476376de7"

function getCityInfo (city) {
    let geoCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(geoCityName).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
                displayWeather(data)
            })
        }
    })
}

function displayWeather (data) {
    console.log(data);
    var temp = (Math.floor(((data.main.temp) - 273.15) * 1.8 + 32));
    var today = dayjs();

    time.textContent = today.format('MMM D, YY')
    
    cityName.textContent = data.name;
    // weatherIcon.value = data.weather;
    temperature.textContent = `Temperature: ${temp}°F`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed}mph`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`


    

} 

function formSumbitCity (event) {
    event.preventDefault();

    var cityInput = searchInput.value

    if (cityInput) {
        getCityInfo(cityInput);

        searchInput.value = '';
    } else {
        var alertMessage = document.createElement("p");
        alertMessage.classList = "m-3 mb-0 fs-5 text-danger"
        alertMessage.textContent = "*Please Enter a City*"
        searchCont.append(alertMessage);

        setTimeout(function () {
            alertMessage.classList = "d-none"
        }, 2000);
        };
}

userForm.addEventListener('submit', formSumbitCity);

