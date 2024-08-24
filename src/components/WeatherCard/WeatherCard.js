import "./WeatherCard.css";
import { getWeatherCardImage } from "../../utils/weatherApi";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ className = "", temp, weatherData }) {
  // variables calculated from weatherData
  let weatherCondition = "Loading...";
  let sunrise = null;
  let sunset = null;
  let isDay = false;

  const timeNow = Date.now() / 1000;

  if (weatherData) {
    // weatherCondition will be Clear, Clouds, Rain, Drizzle, etc...
    weatherCondition = weatherData.weather[0].main;
    sunrise = weatherData.sys.sunrise;
    sunset = weatherData.sys.sunset;
    isDay = sunrise < timeNow && timeNow < sunset;
  }

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
