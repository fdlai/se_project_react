import "./ItemCard.css";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({
  cardData,
  onCardImageClick = () => {},
  onLikeButtonClick,
  onFetchError,
  isLoggedIn,
}) {
  //Track whether the current user likes the item
  const [isLiked, setIsLiked] = useState(false);
  const { _id } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("useEffect has run");
    if (cardData.likes.includes(_id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isLoggedIn]);

  const getLikeButtonClass = () => {
    if (isLiked) {
      return "card__like-button_liked";
    } else {
      return "";
    }
  };

  const handleButtonClick = () => {
    onLikeButtonClick({ cardId: cardData._id, isLiked })
      .then(() => {
        setIsLiked((prev) => !prev);
      })
      .catch((err) => {
        const errorMessage = `Could not ${isLiked ? "unlike" : "like"} item.`;
        onFetchError(err, errorMessage);
      });
  };

  return (
    <li className="card">
      <img
        src={cardData.imageUrl}
        alt={cardData.name}
        className="card__image"
        onClick={() => onCardImageClick(cardData)}
      />
      <div className="card__content-container">
        <div className="card__content">
          <div className="card__name">{cardData.name}</div>
          {isLoggedIn && (
            <button
              className={`card__like-button ${getLikeButtonClass()}`}
              onClick={handleButtonClick}
            ></button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
