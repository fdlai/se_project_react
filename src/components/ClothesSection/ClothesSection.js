import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardImageClick }) {
  return (
    <ul className="profile__items">
      {clothingItems?.map((cardData) => {
        return (
          <ItemCard
            key={cardData._id}
            cardData={cardData}
            onCardImageClick={onCardImageClick}
          />
        );
      })}
    </ul>
  );
}

export default ClothesSection;
