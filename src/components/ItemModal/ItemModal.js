import "./ItemModal.css";
import useEscapeKey from "../../utils/useEscapeKey";

function ItemModal({
  onCloseButtonClick = () => {},
  onPressEsc = () => {},
  itemData,
}) {
  //custom hook
  useEscapeKey(onPressEsc);

  return (
    <div className="modal" onMouseDown={onCloseButtonClick}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-button modal__close-button_type_white"></button>
        <img src={itemData.link} alt={itemData.name} className="modal__image" />
        <div className="modal__info">
          <p className="modal__image-name">{itemData.name}</p>
          <p className="modal__image-description">
            Weather: {itemData.weather}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
