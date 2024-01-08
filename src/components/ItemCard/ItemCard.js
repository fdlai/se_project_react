import "./ItemCard.css";

function ItemCard({ cardData, onCardImageClick = () => {} }) {
  const onClick = () => {
    onCardImageClick(cardData);
  };
  return (
    <li className="card">
      <img
        src={cardData.imageUrl}
        alt={cardData.name}
        className="card__image"
        onClick={onClick}
      />
      <div className="card__name-container">
        <div className="card__name">{cardData.name}</div>
      </div>
    </li>
  );
}

export default ItemCard;
