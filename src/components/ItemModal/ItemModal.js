import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({
  isOpen,
  onCloseClick = () => {},
  itemData,
  modalContentClassName,
  modalCloseButtonClass,
  onClickDelete,
}) {
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
        className="modal__image"
      />
      <div className="modal__info">
        <div className="modal__image-row">
          <p className="modal__image-name">{itemData.name}</p>
          <button
            className="modal__image-delete-button"
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
