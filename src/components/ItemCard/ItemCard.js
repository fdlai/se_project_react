import "./ItemCard.css";

function ItemCard({ cardData }) {
  return (
    <li className="card">
      <img src={cardData.link} alt="" className="card__image" />
      <div className="card__name-container">
        <div className="card__name">{cardData.name}</div>
      </div>
    </li>
  );
}

export default ItemCard;
