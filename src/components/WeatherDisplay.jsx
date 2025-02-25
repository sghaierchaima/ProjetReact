import { motion } from 'framer-motion';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return <p className="text-center">Recherchez une ville pour voir la météo</p>;

  return (
    <motion.div 
      className="text-center mt-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{weather.name}, {weather.sys.country}</h2>
      <h3>{Math.round(weather.main.temp)}°C</h3>
      <p>{weather.weather[0].description}</p>
      <p>💧 Humidité : {weather.main.humidity}% | 💨 Vent : {weather.wind.speed} km/h</p>
    </motion.div>
  );
};

  export default WeatherDisplay;
  