import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name = "",
  title = "",
  buttonText = "Submit",
  secondButtonText = "",
  onCloseClick = () => {},
  children,
  handleFormSubmit,
  isOpen,
  modalType,
  onSecondButtonClick,
}) {
  const getTitleClassModifier = () => {
    if (modalType !== "create") {
      return "modal_title_type_small";
    }
    return "";
  };

  const getSubmitButtonClassModifier = () => {
    if (modalType === "register" || modalType === "login") {
      return "modal__submit-button_type_register";
    }
    return "";
  };

  return (
    <Modal isOpen={isOpen} name={name} onCloseClick={onCloseClick}>
      <h2 className={`modal__title ${getTitleClassModifier()}`}>{title}</h2>
      <form
        className="modal__form"
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(e);
        }}
      >
        {children}
        <div className="modal__buttons-container">
          <button
            className={`modal__submit-button ${getSubmitButtonClassModifier()}`}
          >
            {buttonText}
          </button>
          <button
            className="modal__second-button"
            onClick={onSecondButtonClick}
            type="button"
          >
            {secondButtonText}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
