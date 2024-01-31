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
const weatherDescription = document.querySelector("#weather-description")
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const date = document.querySelector("#date")



const weekForecast = document.querySelector("#weekForecast");
const fiveDay = document.querySelector(".five-day")


const apiKey = "522836f5c966e7d724b78aa476376de7"

function fetchCityCoord (city) {
    const cityLocation = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(cityLocation).then(function (response) {
        if (response.ok) {

            response.json().then(function (data) {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                getTodayWeather(data)
                getFutureWeather(lat, lon);
            })
        }
    }) .catch(function (err) {
        
    })
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


    for (let index = 7; index < data.list.length; index += 8) {
        var forecast = document.querySelector("#forecast")
        var forecastBlock = document.createElement("div")
        forecastBlock.setAttribute('class', 'col-md-2 dark-blue')
        // var forecastDate = document.querySelector("#forecastDate")
        // var descriptionIcon = document.querySelector("#description-icon")
        // var tempWindHumd = document.querySelector("#temp-wind-humd");
        var weekDate = document.createElement("h4")
        var weekWeatherDescription = document.createElement("h4")
        var weekWeatherIcon = document.createElement("img")
        var weekTemperature = document.createElement("p")
        var weekWindSpeed = document.createElement("p")
        var weekHumidity = document.createElement("p")


        const weekInfo = data.list[index];
        var unixTime = weekInfo.dt;
        var futureDates = unixTime * 1000;
        var icon = weekInfo.weather[0].icon;

    
        weekDate.textContent = weekInfo.dt_txt;
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


        // forecast.append()
        console.log(index, weekInfo);
    }
}


function getTodayWeather (data) {
    var temp = (Math.floor(((data.main.temp) - 273.15) * 1.8 + 32));
    var today = dayjs();
    var icon = data.weather[0].icon;
    cityName.textContent = data.name;
    date.textContent = today.format('MMM D, YYYY')
    weatherDescription.textContent = `${data.weather[0].description}`;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`)
    temperature.textContent = `Temperature: ${temp}°F`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed}mph`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`


} 

// Validating user input and displaying error if 
function userSumbitCity (event) {
    event.preventDefault();

    var cityInput = searchInput.value

    if (cityInput) {
        fetchCityCoord(cityInput);

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


// Event listener for City search
userForm.addEventListener('submit', userSumbitCity);

