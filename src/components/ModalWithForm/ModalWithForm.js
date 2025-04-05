import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name = "",
  title = "",
  onCloseClick = () => {},
  children,
  handleFormSubmit,
  isOpen,
  modalType,
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
      </form>
    </Modal>
  );
}

export default ModalWithForm;
