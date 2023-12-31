import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useState, useContext } from "react";

function Main({
  className = "",
  onCardImageClick = () => {},
  temp,
  tempDescription,
  weatherData,
  clothingItems,
}) {
  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === tempDescription;
  });

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getTemp = () => {
    return currentTemperatureUnit === "F" ? `${temp.F}° F` : `${temp.C}° C`;
  };

  return (
    <main className={`main ${className}`}>
      <WeatherCard
        className="page__weather-card"
        temp={temp}
        weatherData={weatherData}
      />
      <section className="cards">
        <h2 className="cards__title">
          Today is {getTemp()} / You may want to wear:
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
