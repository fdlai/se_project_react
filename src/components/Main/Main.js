import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ className = "", onCardImageClick = () => {} }) {
  return (
    <main className={`main ${className}`}>
      <WeatherCard className="page__weather-card" />
      <section className="cards">
        <h2 className="cards__title">Today is 75° F / You may want to wear:</h2>
        <ul className="cards__list">
          {defaultClothingItems.map((cardData) => {
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
