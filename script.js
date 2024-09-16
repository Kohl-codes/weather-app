// Replace with your actual API key
const apiKey = '029899bb298c49faba1133625241509'; 

// Function to get weather based on user input
function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert("Please enter a location");
        return;
    }

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
            console.log("WeatherAPI Response:", data); // Log the API response for debugging
            
            if (!data || !data.current) {
                document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
                console.error("Invalid weather data received:", data);
                return;
            }

            // Display weather data in a styled layout
            const weatherIconUrl = data.current.condition.icon.replace(/\.png$/, '.svg'); // Use SVG if available
            const weatherData = `
                <div class="weather-header">
                    <div class="weather-info">
                        <img id="weather-icon" src="${weatherIconUrl}" alt="${data.current.condition.text}" class="weather-icon">
                        <div class="temp">
                            <h2>${data.current.temp_c}°C</h2>
                            <p>${data.current.condition.text}</p>
                        </div>
                    </div>
                    <div class="location-info">
                        <p>${data.location.name}, ${data.location.region}, ${data.location.country}</p>
                        <p>Feels like: ${data.current.feelslike_c}°C</p>
                    </div>
                </div>
                <div class="weather-details">
                    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                    <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
                    <p><strong>Sunrise:</strong> 5:50 AM</p>
                    <p><strong>Sunset:</strong> 7:52 PM</p>
                </div>
            `;
            document.getElementById('weather-result').innerHTML = weatherData;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
        });
}
