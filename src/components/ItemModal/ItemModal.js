import "./ItemModal.css";

function ItemModal({ onCloseButtonClick = () => {}, data }) {
  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-button modal__close-button_type_white"
          onClick={onCloseButtonClick}
        ></button>
        <img src={data.link} alt={data.name} className="modal__image" />
        <div className="modal__info">
          <p className="modal__image-name">{data.name}</p>
          <p className="modal__image-description">Weather: {data.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
