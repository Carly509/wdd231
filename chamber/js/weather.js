const apiKey = '482fb02695ecbaa4910e4922dc0b29c3'; // Replace with your OpenWeatherMap API key

async function getFortLauderdaleWeather(apiKey) {
  const cityName = 'Fort Lauderdale';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City not found: ${cityName}`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(`API error! code: ${data.cod}, message: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching weather data for ${cityName}:`, error);
    throw error;
  }
}

function updateWeatherUI(data) {
  // Update temperature
  const tempElement = document.getElementById('current-temp');
  tempElement.textContent = Math.round(data.main.temp);

  // Update weather description
  const descElement = document.getElementById('weather-desc');
  descElement.textContent = data.weather[0].description;

  // Update weather icon
  const iconElement = document.getElementById('weather-icon');
  const iconCode = data.weather[0].icon;
  iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  iconElement.alt = data.weather[0].description;
}

// Function to handle any errors in weather fetching
function handleWeatherError() {
  const tempElement = document.getElementById('current-temp');
  const descElement = document.getElementById('weather-desc');

  tempElement.textContent = 'N/A';
  descElement.textContent = 'Weather data unavailable';
}

// Load weather when the page loads
document.addEventListener('DOMContentLoaded', () => {
  getFortLauderdaleWeather(apiKey)
    .then(updateWeatherUI)
    .catch(handleWeatherError);
});
