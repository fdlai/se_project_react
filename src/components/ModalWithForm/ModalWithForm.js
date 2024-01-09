import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name = "",
  title = "",
  buttonText = "Submit",
  onCloseClick = () => {},
  children,
  handleFormSubmit,
  isOpen,
}) {
  return (
    <Modal isOpen={isOpen} name={name} onCloseClick={onCloseClick}>
      <h2 className="modal__title">{title}</h2>
      <form
        className="modal__form"
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(e);
        }}
      >
        {children}
        <button className="modal__submit-button">{buttonText}</button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
