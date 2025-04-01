const apiKey = 'f89637f61a8512712bb4bb05e30400a1';
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherCondition = document.getElementById('weather-condition');
const errorMessage = document.getElementById('error-message');


getWeatherBtn.addEventListener('click', getWeather);

// Function to fetch weather data
async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    resetWeatherInfo();
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorMessage.textContent = error.message;
    resetWeatherInfo();
  }
}

function displayWeather(data) {
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
  errorMessage.textContent = ''; 
}

function resetWeatherInfo() {
  temperature.textContent = '';
  humidity.textContent = '';
  weatherCondition.textContent = '';
}
