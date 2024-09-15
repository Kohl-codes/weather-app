const apiKey = 'apiKey'; // Replace with your actual API key

// Function to get latitude and longitude using Geocoding API
function getCoordinates() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Geocoding API: Fetch latitude and longitude based on city, state, and country
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log("Geocoding API Response:", data); // Log the entire response for debugging

            if (data.length === 0) {
                document.getElementById('weather-result').innerHTML = "City not found!";
                return;
            }

            const { lat, lon } = data[0]; // Extract latitude and longitude from the first result
            console.log(`Coordinates for ${city}: Latitude ${lat}, Longitude ${lon}`);
            getWeather(lat, lon); // Call the weather API with the coordinates
        })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching coordinates!";
        });
}

// Function to get weather using One Call API v2.5
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("One Call API Response:", data); // Log the entire weather data response

            if (!data || !data.current) {
                document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
                console.error("Invalid weather data received:", data);
                return;
            }

            // Display weather data
            const weatherData = `
                <p><strong>Current Temperature:</strong> ${data.current.temp} °C</p>
                <p><strong>Weather:</strong> ${data.current.weather[0].description}</p>
                <p><strong>Feels Like:</strong> ${data.current.feels_like} °C</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherData;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
        });
}
// Function to get latitude and longitude using Geocoding API
function getCoordinates() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log("Geocoding API Response:", data); // Log the entire response for debugging

            if (data.length === 0) {
                document.getElementById('weather-result').innerHTML = "City not found!";
                return;
            }

            const { lat, lon } = data[0]; // Extract latitude and longitude from the first result
            console.log(`Coordinates for ${city}: Latitude ${lat}, Longitude ${lon}`);
            getWeather(lat, lon); // Call the weather API with the coordinates
        })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching coordinates! Error: " + error.message;
        });
}

// Function to get weather using One Call API v2.5
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("One Call API Response:", data); // Log the entire weather data response

            if (!data || !data.current) {
                document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
                console.error("Invalid weather data received:", data);
                return;
            }

            // Display weather data
            const weatherData = `
                <p><strong>Current Temperature:</strong> ${data.current.temp} °C</p>
                <p><strong>Weather:</strong> ${data.current.weather[0].description}</p>
                <p><strong>Feels Like:</strong> ${data.current.feels_like} °C</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherData;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching weather data! Error: " + error.message;
        });
}
