const searchCont = document.querySelector("#searchCont")
const userForm = document.querySelector("#userForm");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("button");
const historyCont = document.querySelector("#historyContainer");
const historyListItem = document.querySelector("#historyListItem");
const weatherCont = document.querySelector("#weatherCont")
const todaysForecast = document.querySelector("#todaysForecast");
const weekForeCastTitle = document.querySelector("#weekForecastTitle")
const todaysInfo = document.querySelector("#todaysInfo");
const cityNameDisplay = document.querySelector("#cityName");
const cityName = document.querySelector("#cityName");
const weatherDescription = document.querySelector("#weather-description")
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const date = document.querySelector("#date")
const rowTwo = document.querySelector("#rowTwo")
const weekForecast = document.querySelector("#weekForecast");
const fiveDay = document.querySelector(".five-day")
const sweater = document.querySelector("#sweater-icon")
const sweaterCont = document.querySelector("#sweater-cont")
const apiKey = "522836f5c966e7d724b78aa476376de7"
todaysInfo.classList = "hideMe"
// Validating user input
function userSumbitCity (event) {
    event.preventDefault();
    var cityInput = searchInput.value

    if (cityInput) {
        const cityArray = []
        const stringifyCity = JSON.stringify(cityInput)
        cityArray.push(stringifyCity)
        localStorage.setItem("CityName", cityArray)
        fetchCityCoord(cityInput);
        displayUserInput()
        searchInput.value = '';
        todaysInfo.classList.remove("hideMe")

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


function fetchCityCoord (city) {
    const cityLocationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(cityLocationUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                getTodayWeather(data)
                getFutureWeather(lat, lon);
            })
        }
    })
}

function displayUserInput() {
    var cityList = localStorage.getItem("CityName").replace(/['"]+/g, '')
    var cityListEl = document.createElement('a')
    cityListEl.setAttribute('href', "#");
    cityListEl.setAttribute('class', 'city-link')
    cityListEl.innerHTML = cityList;
    // historyListItem.textContent = "Search History:"
    historyListItem.append(cityListEl)
}

function getTodayWeather (data) {
    var temp = (Math.floor(((data.main.temp) - 273.15) * 1.8 + 32));
    var today = dayjs();
    var icon = data.weather[0].icon;
    cityName.textContent = data.name;
    console.log(temp);
    if(temp >= 55 && temp <= 65) {
        sweater.classList.remove("hideMe")
        sweaterCont.classList.remove("hideMe")
    } else {
        sweater.classList = "hideMe"
        sweaterCont.classList = "hideMe"
    }
    date.textContent = today.format('MMM D, YYYY')
    weatherDescription.textContent = `${data.weather[0].description}`;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`)
    temperature.textContent = `Temperature: ${temp}°F`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed}mph`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
} 

function getFutureWeather (lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // pass forloop into display function
                displayFutureWeather(data) 
            })
        }
    })
}   

function displayFutureWeather (data) {
    weekForeCastTitle.textContent = `5-Day Forecast for ${data.city.name}`
    while (forecast.hasChildNodes()) {
        forecast.removeChild(forecast.firstChild);
    }

    for (let index = 7; index < data.list.length; index += 8) {
        // elements Created to display in each 5-day forecast block
        const forecast = document.querySelector("#forecast")
        const weekDate = document.createElement("h4")
        const weekWeatherDescription = document.createElement("h4")
        const weekWeatherIcon = document.createElement("img")
        const weekTemperature = document.createElement("p")
        const weekWindSpeed = document.createElement("p")
        const weekHumidity = document.createElement("p")
        const weekInfo = data.list[index];
        const unixTime = weekInfo.dt;
        const futureDates = unixTime * 1000;
        const icon = weekInfo.weather[0].icon;
        const formattedDate = dayjs(weekInfo.dt_txt).format("MMM D, YYYY")
        const forecastBlock = document.createElement("div")
        forecastBlock.setAttribute('class', 'col-md-2 forecast-block dark-blue')
    
        weekDate.textContent = formattedDate;
        weekWeatherDescription.textContent = weekInfo.weather[0].description;
        weekWeatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`)
        weekTemperature.textContent = `Temperature: ${weekInfo.main.temp}°F`
        weekWindSpeed.textContent = `Wind Speed: ${weekInfo.wind.speed}mph`;
        weekHumidity.textContent = `Humidity: ${weekInfo.main.humidity}%`;
        forecastBlock.appendChild(weekDate)
        forecastBlock.appendChild(weekWeatherIcon)
        forecastBlock.appendChild(weekWeatherDescription)
        forecastBlock.appendChild(weekTemperature)
        forecastBlock.appendChild(weekWindSpeed)
        forecastBlock.appendChild(weekHumidity)

        forecast.appendChild(forecastBlock)
    }
}

function linkToSearch(e) {
    var citylink = e.target.innerHTML;
    fetchCityCoord(citylink)
}


// Event listeners for user input to begin new search
historyListItem.addEventListener('click', linkToSearch);
userForm.addEventListener('submit', userSumbitCity);

