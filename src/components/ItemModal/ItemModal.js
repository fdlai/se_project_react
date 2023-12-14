import "./ItemModal.css";
import { useEffect } from "react";

function ItemModal({ onCloseButtonClick = () => {}, onPressEsc, data }) {
  useEffect(() => {
    document.addEventListener("keydown", onPressEsc);
    return () => {
      document.removeEventListener("keydown", onPressEsc);
    };
  }, [onPressEsc]);
  return (
    <div className="modal" onMouseDown={onCloseButtonClick}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-button modal__close-button_type_white"></button>
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
