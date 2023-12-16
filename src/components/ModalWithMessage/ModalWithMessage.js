import Modal from "../Modal/Modal";

function ModalWithMessage({
  message = "Error!",
  onCloseClick = () => {},
  activeModal,
}) {
  return (
    <Modal onCloseClick={onCloseClick} activeModal={activeModal}>
      <h2 className="modal__message">{message}</h2>
    </Modal>
  );
}

export default ModalWithMessage;
