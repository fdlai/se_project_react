import "./Profile.css";
import avatarImg from "../../images/avatar.svg";
import ItemCard from "../ItemCard/ItemCard";

function Profile({ className, clothingItems, onCardImageClick }) {
  return (
    <div className={`profile ${className}`}>
      <div className="profile__user">
        <img className="profile__image" src={avatarImg} alt="avatar" />
        <div className="profile__name">Terrence Tegegne</div>
      </div>

      <div className="profile__title-container">
        <h2 className="profile__title">Your items</h2>
        <button className="profile__add-button">+ Add new</button>
      </div>
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
    </div>
  );
}

export default Profile;
