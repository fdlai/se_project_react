import Modal from "../Modal/Modal";

function ModalWithMessage({
  message = "Error!",
  onCloseClick = () => {},
  activeModal,
  isOpen,
  modalContentClassName,
  modalClassName,
}) {
  return (
    <Modal
      onCloseClick={onCloseClick}
      activeModal={activeModal}
      isOpen={isOpen}
      modalContentClassName={modalContentClassName}
      modalClassName={modalClassName}
    >
      <h2 className="modal__message">{message}</h2>
    </Modal>
  );
}

export default ModalWithMessage;
