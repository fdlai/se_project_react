import "./WeatherCard.css";

function WeatherCard({ className = "" }) {
  return (
    <section className={`weather ${className}`}>
      <img
        src={require("../../images/cloudy-day.svg").default}
        alt=""
        className="weather__image"
      />
      <div className="weather__info">75&deg;</div>
    </section>
  );
}

export default WeatherCard;
