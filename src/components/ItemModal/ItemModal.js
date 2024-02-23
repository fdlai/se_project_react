import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  onCloseClick = () => {},
  itemData,
  modalContentClassName,
  modalCloseButtonClass,
  onClickDelete,
}) {
  //track whether to show the image or not
  const [displayImage, setDisplayImage] = useState(false);
  const { _id } = useContext(CurrentUserContext);

  //set displayImage to false everytime the image url changes
  useEffect(() => {
    setDisplayImage(false);
  }, [itemData.imageUrl]);

  const getDeleteButtonClass = () => {
    if (itemData.owner === _id || itemData.owner?._id === _id) {
      return "";
    } else {
      return "modal__image-delete-button_hidden";
    }
  };

  const getImageClass = () => {
    if (displayImage) {
      return "";
    } else {
      return "modal__image_hidden";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      modalContentClassName={modalContentClassName}
      modalCloseButtonClass={modalCloseButtonClass}
    >
      <img
        src={itemData.imageUrl}
        alt={itemData.name}
        className={`modal__image ${getImageClass()}`}
        onLoad={() => {
          setDisplayImage(true);
        }}
      />
      <div className="modal__info">
        <div className="modal__image-row">
          <p className="modal__image-name">{itemData.name}</p>
          <button
            className={`modal__image-delete-button ${getDeleteButtonClass()}`}
            onClick={(e) => {
              onClickDelete(e);
            }}
          >
            Delete item
          </button>
        </div>
        <p className="modal__image-description">Weather: {itemData.weather}</p>
      </div>
    </Modal>
  );
}

export default ItemModal;
