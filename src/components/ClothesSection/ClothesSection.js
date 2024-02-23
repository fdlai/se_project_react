import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  onCardImageClick,
  onLikeButtonClick,
  onFetchError,
  isLoggedIn,
}) {
  return (
    <ul className="profile__items">
      {clothingItems?.map((cardData) => {
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
  );
}

export default ClothesSection;
