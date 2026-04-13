import "./ClothesSection.css";
import ItemCardGrid from "../ItemCardGrid/ItemCardGrid";

function ClothesSection({
  clothingItems,
  onCardImageClick,
  onLikeButtonClick,
  onFetchError,
  isLoggedIn,
}) {
  return (
    <ul className="profile__items">
      <ItemCardGrid
        items={clothingItems}
        onCardImageClick={onCardImageClick}
        onLikeButtonClick={onLikeButtonClick}
        onFetchError={onFetchError}
        isLoggedIn={isLoggedIn}
      />
    </ul>
  );
}

export default ClothesSection;
