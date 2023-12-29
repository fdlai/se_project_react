import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name = "",
  title = "",
  buttonText = "Submit",
  onCloseClick = () => {},
  activeModal,
  children,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal name={name} onCloseClick={onCloseClick} activeModal={activeModal}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" action="submit" onSubmit={handleFormSubmit}>
        {children}
        <button className="modal__submit-button">{buttonText}</button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
