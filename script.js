const apiKey = 'ed5192e00891464fa82112eb66b2f24d'; // Ensure this API key is correct and active

// Function to get latitude and longitude of the city
function getCoordinates() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Fetch coordinates from OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log("Geocoding API Response:", data); // Log the entire response for debugging

            if (data.cod !== 200) {
                document.getElementById('weather-result').innerHTML = `Error: ${data.message}`;
                return;
            }

            const { lat, lon } = data.coord;
            console.log(`Coordinates for ${city}: Latitude ${lat}, Longitude ${lon}`);
            getWeather(lat, lon); // Call the weather API with the coordinates
        })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching coordinates!";
        });
}

// Function to get weather using One Call API
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("One Call API Response:", data); // Log the entire weather data response

            if (!data || !data.current) {
                document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
                console.error("Invalid weather data received:", data);
                return;
            }

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
