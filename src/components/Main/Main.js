import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  className = "",
  onCardImageClick = () => {},
  temp,
  weatherData,
  clothingItems,
  onLikeButtonClick,
  onFetchError,
  isLoggedIn,
  isWeatherDataLoaded,
}) {
  const filteredClothingItems = isWeatherDataLoaded
    ? clothingItems?.filter((item) => {
        return item.weather.toLowerCase() === weatherData.tempDescription;
      })
    : clothingItems;

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getTemp = () => {
    if (isWeatherDataLoaded) {
      return `${weatherData.temp[currentTemperatureUnit]}° ${currentTemperatureUnit}`;
    } else {
      return "Loading...";
    }
  };

  return (
    <main className={`main ${className}`}>
      <WeatherCard
        className="page__weather-card"
        temp={temp}
        weatherData={weatherData}
        isWeatherDataLoaded={isWeatherDataLoaded}
        getTemp={getTemp}
      />
      <section className="cards">
        <h2 className="cards__title">
          Today is {getTemp()} / You may want to wear:
        </h2>
        {clothingItems ? (
          <ul className="cards__list">
            {filteredClothingItems.map((cardData) => {
              return (
                <ItemCard
                  key={cardData._id}
                  cardData={cardData}
                  onCardImageClick={onCardImageClick}
                  onLikeButtonClick={onLikeButtonClick}
                  onFetchError={onFetchError}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </main>
  );
}

export default Main;
