//const apiKey = 'apiKey'; // Replace with your actual API key


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

            // Display weather data
            const weatherIconUrl = data.current.condition.icon.replace(/\.png$/, '.svg'); // Replace .png with .svg if available
            const weatherData = `
                <img id="weather-icon" src="${weatherIconUrl}" alt="${data.current.condition.text}">
                <p><strong>Location:</strong> ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
                <p><strong>Current Temperature:</strong> ${data.current.temp_c} °C</p>
                <p><strong>Weather:</strong> ${data.current.condition.text}</p>
                <p><strong>Feels Like:</strong> ${data.current.feelslike_c} °C</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherData;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-result').innerHTML = "Error fetching weather data!";
        });
}
