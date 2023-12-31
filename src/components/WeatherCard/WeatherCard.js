import "./WeatherCard.css";
import { getWeatherCardImage } from "../../utils/weatherApi";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ className = "", temp, weatherData }) {
  const weatherCondition = weatherData
    ? weatherData.weather[0].main
    : "Loading...";
  const sunrise = weatherData ? weatherData.sys.sunrise : "Loading...";
  const sunset = weatherData ? weatherData.sys.sunset : "Loading...";
  const timeNow = Date.now() / 1000;
  const isDay = sunrise < timeNow && timeNow < sunset;
  const url = getWeatherCardImage(isDay, weatherCondition);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getTemp = () => {
    return currentTemperatureUnit === "F" ? `${temp.F}°F` : `${temp.C}°C`;
  };

  return (
    <section className={`weather ${className}`}>
      <img src={url} alt="" className="weather__image" />
      <div className="weather__info">{getTemp()}</div>
    </section>
  );
}

export default WeatherCard;
