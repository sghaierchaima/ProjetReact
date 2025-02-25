import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import MapComponent from "./components/MapComponent";
import { fetchWeather, fetchForecast } from "./api";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Appliquer le thème au chargement
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Basculer entre les thèmes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Fonction pour récupérer la météo et les prévisions
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(`${lat},${lon}`);
      const forecastData = await fetchForecast(`${lat},${lon}`);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      alert("Impossible de récupérer la météo ❌");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer la géolocalisation au chargement
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          alert("Géolocalisation refusée ❌ Veuillez entrer une ville manuellement.");
        }
      );
    }
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      alert("Ville non trouvée ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container mt-5 text-center ${theme}`}>
      <button className="btn btn-secondary mb-3" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
      </button>
      <h1 className="text-3xl font-bold mb-4">🌍 Application Météo</h1>
      <SearchBar onSearch={handleSearch} />
      <button className="btn btn-primary my-3" onClick={() => navigator.geolocation.getCurrentPosition(
        (position) => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
        () => alert("Géolocalisation refusée ❌")
      )}>📍 Météo actuelle</button>
      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Chargement...</span></div>}
      <WeatherDisplay weather={weather} />
      {weather && <MapComponent lat={weather.coord.lat} lon={weather.coord.lon} city={weather.name} />}
      <ForecastDisplay forecast={forecast} />
    </div>
  );
};

export default App;
