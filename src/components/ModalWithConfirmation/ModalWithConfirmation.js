import "./ModalWithConfirmation.css";
import Modal from "../Modal/Modal";

function ModalWithConfirmation({
  isOpen,
  modalContentClassName,
  modalCloseButtonClass,
  onCloseClick,
  onClickDelete,
  itemData,
}) {
  return (
    <Modal
      isOpen={isOpen}
      modalContentClassName={modalContentClassName}
      modalCloseButtonClass={modalCloseButtonClass}
      onCloseClick={onCloseClick}
    >
      <p className="modal__confirm-text">
        Are you sure you want to delete this item?
      </p>
      <p className="modal__confirm-text">This action is irreversible.</p>
      <button
        className="modal__confirm-text modal__confirm-delete-button"
        type="submit"
        onClick={() => {
          onClickDelete(itemData._id);
        }}
      >
        Yes, delete item
      </button>
      <button
        className="modal__confirm-text modal__confirm-cancel-button"
        type="submit"
        onClick={onCloseClick}
      >
        Cancel
      </button>
    </Modal>
  );
}

export default ModalWithConfirmation;
