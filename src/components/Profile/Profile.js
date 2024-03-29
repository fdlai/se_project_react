import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  className,
  clothingItems,
  onCardImageClick,
  onAddButtonClick,
  onLogoutButtonClick,
  onEditProfileButtonClick,
  onLikeButtonClick,
  onFetchError,
  isLoggedIn,
}) {
  return (
    <div className={`profile ${className}`}>
      <SideBar
        onLogoutButtonClick={onLogoutButtonClick}
        onEditProfileButtonClick={onEditProfileButtonClick}
      />
      <div className="profile__title-container">
        <h2 className="profile__title">Your items</h2>
        <button className="profile__add-button" onClick={onAddButtonClick}>
          + Add new
        </button>
      </div>
      <ClothesSection
        clothingItems={clothingItems}
        onCardImageClick={onCardImageClick}
        onLikeButtonClick={onLikeButtonClick}
        onFetchError={onFetchError}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
