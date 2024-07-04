function weatherFn() {
    const cityName = document.getElementById('city-input').value.trim();
    const weatherInfo = document.getElementById('weather-info');


    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }
    

    const apiKey = 'eddd6abb55048fdc3100af690be64884'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => {
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            weatherInfo.style.display = 'none';
            throw new Error('City not found');
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.querySelector(".error").style.display = "none";
        updateWeather(data);
    })
    .catch(error => {
        if (error.message !== 'City not found') {
            alert("An error occurred fetching weather data. Please try again.");
        }
        console.error('Error:', error);
    });
}

function updateWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const cityNameElement = document.getElementById('city-name');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const weatherIconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const windSpeedElement = document.getElementById('wind-speed');
    let a= new Date();
    console.log(a)
    console.log(`${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`)

    cityNameElement.textContent = data.name;
    dateElement.textContent ="📆 Date : " +new Date().toLocaleDateString()
    timeElement.textContent = " 🕓 Time : "+`${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`;
    temperatureElement.textContent = ` ${data.main.temp}°C`;
    descriptionElement.textContent =` ${data.weather[0].description}`;
    windSpeedElement.textContent = `Wind Speed : 🍃 ${data.wind.speed} m/s`;

    if(data.weather[0].main=="Clouds"){
        weatherIconElement.src = "clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weatherIconElement.src = "clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIconElement.src = "rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIconElement.src = "drizzle.png";
    }
    else if(data.weather[0].main=="Humidity"){
        weatherIconElement.src = "humidity.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIconElement.src = "mist.png";
    }
    else if(data.weather[0].main=="Snow"){
        weatherIconElement.src = "snow.png";
    }
    else if(data.weather[0].main=="Wind"){
        weatherIconElement.src = "wind.png";
    }
    weatherInfo.style.display = 'block';
    document.querySelector(".error").style.display = "none"

    weatherInfo.classList.add('fade-in');
}
