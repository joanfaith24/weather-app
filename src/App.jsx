import { useState } from "react";
import axios from "axios";
import config from "./config";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

const API_KEY = config.API_KEY;

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch {
      setError("City not found. Please try again!");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center text-white w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8">🌤️ Weather App</h1>

        <div className="flex gap-2 justify-center mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
            className="px-5 py-3 rounded-full text-black outline-none w-64"
          />
          <button
            onClick={getWeather}
            className="px-5 py-3 rounded-full bg-red-400 hover:bg-red-500 transition font-semibold"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-300 text-sm">{error}</p>}

        {weather && (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mt-4">
            <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-7xl font-bold my-4">{weather.main.temp}°C</p>
            <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="weather icon"
  className="mx-auto w-24 h-24"
/>
            <p className="text-xl capitalize mb-4">{weather.weather[0].description}</p>
            <div className="flex justify-around text-sm mb-4">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
              <p>🌡️ Feels like: {weather.main.feels_like}°C</p>
            </div>
            <p className="text-sm opacity-75">
  🕒 {new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;