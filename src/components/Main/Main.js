import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useState } from "react";

function Main({
  className = "",
  onCardImageClick = () => {},
  temp,
  tempDescription,
  weatherCondition,
  weatherData,
}) {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const filteredClothingItems = clothingItems.filter((item) => {
    if (item.weather.toLowerCase() === tempDescription) {
      return true;
    }
    return false;
  });

  return (
    <main className={`main ${className}`}>
      <WeatherCard
        className="page__weather-card"
        temp={temp}
        weatherData={weatherData}
      />
      <section className="cards">
        <h2 className="cards__title">
          Today is {temp}° F / You may want to wear:
        </h2>
        <ul className="cards__list">
          {filteredClothingItems.map((cardData) => {
            return (
              <ItemCard
                key={cardData._id}
                cardData={cardData}
                onCardImageClick={onCardImageClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
