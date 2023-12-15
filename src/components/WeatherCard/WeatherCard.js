import "./WeatherCard.css";
import { getWeatherCardImage } from "../../utils/weatherApi";

function WeatherCard({ className = "", temp, weatherData }) {
  const weatherCondition = weatherData
    ? weatherData.weather[0].main
    : "Loading...";
  const sunrise = weatherData ? weatherData.sys.sunrise : "Loading...";
  const sunset = weatherData ? weatherData.sys.sunset : "Loading...";
  const timeNow = Date.now() / 1000;
  const isDay = sunrise < timeNow && timeNow < sunset;
  const URL = getWeatherCardImage(isDay, weatherCondition);

  return (
    <section className={`weather ${className}`}>
      <img src={URL} alt="" className="weather__image" />
      <div className="weather__info">{temp}&deg;F</div>
    </section>
  );
}

export default WeatherCard;
