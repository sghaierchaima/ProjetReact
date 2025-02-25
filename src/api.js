import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const fetchWeather = async (query) => {
    try {
        const isCoords = query.includes(",");
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: isCoords
                ? { lat: query.split(",")[0], lon: query.split(",")[1], appid: API_KEY, units: "metric", lang: "fr" }
                : { q: query, appid: API_KEY, units: "metric", lang: "fr" }
        });

        console.log("Réponse API :", response.data); // Vérifier la réponse de l'API
        return response.data;

    } catch (error) {
        console.error("Erreur API :", error.response ? error.response.data : error.message);
        throw new Error("Problème de récupération des données météo.");
    }

};
export const fetchForecast = async (query) => {
    try {
        const isCoords = query.includes(",");
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: isCoords
                ? { lat: query.split(",")[0], lon: query.split(",")[1], appid: API_KEY, units: "metric", lang: "fr" }
                : { q: query, appid: API_KEY, units: "metric", lang: "fr" }
        });

        console.log("Prévisions API :", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error("Erreur API Prévisions :", error.response ? error.response.data : error.message);
        throw new Error("Problème de récupération des prévisions météo.");
    }
};
