// Your OpenWeatherMap API Key
const API_KEY = '06ce8afc2e6b3464782e9d86bcc57238';  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
function getWeather(city) {
    // Validate input
    if (!city || city.trim() === '') {
        document.getElementById('weather-display').innerHTML = 
            '<p class="error">Please enter a city name.</p>';
        return;
    }

    // Show loading state
    document.getElementById('weather-display').innerHTML = 
        '<p class="loading">Fetching weather data...</p>';

    // Build the complete URL
    const url = `${API_URL}?q=${city.trim()}&appid=${API_KEY}&units=metric`;
    
    // Make API call using Axios
    axios.get(url)
        .then(function(response) {
            // Success! We got the data
            console.log('Weather Data:', response.data);
            displayWeather(response.data);
        })
        .catch(function(error) {
            // Something went wrong
            console.error('Error fetching weather:', error);
            let errorMessage = 'Could not fetch weather data.';
            
            if (error.response && error.response.status === 404) {
                errorMessage = 'City not found. Please check the spelling and try again.';
            } else if (!navigator.onLine) {
                errorMessage = 'No internet connection. Please check your network.';
            }
            
            document.getElementById('weather-display').innerHTML = 
                `<p class="error">${errorMessage}</p>`;
        });
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// Handle search button click
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    
    // Search when button is clicked
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value;
        getWeather(city);
    });
    
    // Search when Enter key is pressed
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getWeather(cityInput.value);
        }
    });
});
