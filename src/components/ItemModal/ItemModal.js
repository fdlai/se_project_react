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
  const { _id } = useContext(CurrentUserContext);

  const getDeleteButtonClass = () => {
    if (itemData.owner === _id || itemData.owner?._id === _id) {
      return "";
    } else {
      return "modal__image-delete-button_hidden";
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
        key={itemData.imageUrl}
        src={itemData.imageUrl}
        alt={itemData.name}
        className={`modal__image`}
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
