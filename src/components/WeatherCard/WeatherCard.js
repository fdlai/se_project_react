import "./WeatherCard.css";
import { getWeatherCardImage } from "../../utils/weatherApi";

function WeatherCard({
  className = "",
  weatherData,
  isWeatherDataLoaded,
  getTemp,
}) {
  const url = getWeatherCardImage(weatherData.isDay, weatherData.condition);

  return (
    <section className={`weather ${className}`}>
      {isWeatherDataLoaded && (
        <img src={url} alt="" className="weather__image" />
      )}{" "}
      <div
        style={{ color: `${isWeatherDataLoaded ? "white" : "#000000ad"}` }}
        className="weather__info"
      >
        {getTemp()}
      </div>
    </section>
  );
}

export default WeatherCard;
