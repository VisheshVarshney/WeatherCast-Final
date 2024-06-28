let cityInput = document.querySelector("#city");
let checkButton = document.querySelector("#check");
let tempIcon = document.querySelector("#tempIcon");
let weatherCountry = document.querySelector("#weatherCountry");
let temperature = document.querySelector("#temperature");
let weatherDescription = document.querySelector("#weatherDescription");
let feelsLike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");
let precipitation = document.querySelector("#precipitation");

// Function to get the user's current city based on browser location
function getCurrentCity() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            getCityFromCoordinates(latitude, longitude);
        }, (error) => {
            console.error("Error getting current position:", error);
            // Default to a fallback city if location access is denied or not available
            let fallbackCity = "New York";
            getWeatherData(fallbackCity);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        // Default to a fallback city if geolocation is not supported
        let fallbackCity = "New York";
        getWeatherData(fallbackCity);
    }
}

// Retrieve username from URL parameter and update login button text
window.onload = function() {
    var params = new URLSearchParams(window.location.search);
    var username = params.get('username');
    if (username) {
        var loginButton = document.getElementById('loginButton');
        loginButton.textContent = username;
    }
};

// Function to get the city name from latitude and longitude coordinates
function getCityFromCoordinates(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bd4ea33ecf905116d12af172e008dbae`)
    .then(response => response.json())
    .then(data => {
        let cityName = data.name;
        getWeatherData(cityName);
    })
    .catch(error => {
        console.error("Error fetching city from coordinates:", error);
        // Default to a fallback city if fetching city fails
        let fallbackCity = "New York";
        getWeatherData(fallbackCity);
    });
}

function updateSpotifyButtonText(data) {
    let spotifyButton = document.getElementById("spotifyLink");
    let buttonText = `Listen to a ${data} Playlist`;
    spotifyButton.textContent = buttonText;
    console.log("Text")
}

function updateAccuweatherLink(city) {
    let accuweatherLink = document.getElementById("accuweather");
    accuweatherLink.href = `https://www.accuweather.com/en/search-locations?query=${city}`;
}


// Function to get weather data for a specific city
function getWeatherData(city) {
    let key = "bd4ea33ecf905116d12af172e008dbae";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${key}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        weatherCountry.innerText = `${data.name}, ${data.sys.country}`;
        temperature.innerHTML = `${data.main.temp}°<b>C</b>`;
        data.weather.forEach(item => {
            weatherDescription.innerText = item.description;
            if (item.id < 250) {
                tempIcon.src = "tempicons/storm.svg";
                spotifyLink.href = "https://open.spotify.com/playlist/72swiviJbjAJaEdYH1IYlG";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?storm')`;
            } else if (item.id < 350) {
                tempIcon.src = "tempicons/drizzle.svg";
                spotifyLink.href = "https://open.spotify.com/playlist/2bK9s55eVu07elM2joTaIX";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?drizzle')`;
            } else if (item.id < 550) {
                tempIcon.src = "tempicons/snow.svg";
                spotifyLink.href = "https://open.spotify.com/playlist/4raqLXnmb8WYkjfed9olAR";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?snow')`;
            } else if (item.id < 650) {
                spotifyLink.href = "https://open.spotify.com/playlist/2E3TIwiddapEzKl2aN6zV8";
                tempIcon.src = "tempicons/rain.svg";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?rain')`;
            } else if (item.id < 800) {
                tempIcon.src = "tempicons/atmosphere.svg";
                spotifyLink.href = "https://open.spotify.com/playlist/12y8lWbze3EbYlS1xtAg6N";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?haze')`;
            } else if (item.id === 800) {
                tempIcon.src = "tempicons/sun.svg";
                spotifyLink.href = "https://open.spotify.com/playlist/37i9dQZF1DX1BzILRveYHb";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?sunny')`;
            } else if (item.id > 800) {
                tempIcon.src = "tempicons/clouds.svg";
                spotifyLink.href = "https://open.spotify.com/playlist/12y8lWbze3EbYlS1xtAg6N";
                document.getElementById('container').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?cloud')`;
            }
        });
        updateAccuweatherLink(city);
        updateSpotifyButtonText(weatherDescription.innerText);
        feelsLike.innerText = `Feels Like ${data.main.feels_like}°C`;
        humidity.innerText = `Humidity ${data.main.humidity}`;
        latitude.innerText = `Latitude ${data.coord.lat}`;
        longitude.innerText = `Longitude ${data.coord.lon}`;
        if (data.hasOwnProperty("rain")) {
            precipitation.innerText = `Precipitation ${data.rain["1h"]} mm`;
        } else {
            precipitation.innerText = "No precipitation data available";
        }
        
    })
    .catch(error => console.error("Error fetching weather data:", error));
}

// Get weather for the user's current location by default
getCurrentCity();

// Event listener for the "Go" button
checkButton.addEventListener("click", () => {
    let city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    
    getWeatherData(city);
    cityInput.value = "";
});


