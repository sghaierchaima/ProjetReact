import React from "react";

const ForecastDisplay = ({ forecast }) => {
  if (!forecast) return null;

  // Filtrer les prévisions pour obtenir une valeur par jour (midi par ex.)
  const dailyForecasts = forecast.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <div className="mt-4">
      <h2 className="text-center">📅 Prévisions sur 5 jours</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="card m-2 p-3 text-center" style={{ width: "120px" }}>
            <h5>{new Date(day.dt_txt).toLocaleDateString("fr-FR", { weekday: "long" })}</h5>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Météo" />
            <p>{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
