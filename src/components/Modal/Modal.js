import "./Modal.css";

function Modal({ children, name, activeModal, onCloseClick = () => {} }) {
  const getModalContentClassModifier = () => {
    switch (activeModal) {
      case "preview":
        return "modal__content_type_image";
      case "message":
        return "modal__content_type_message";
      default:
        return "";
    }
  };
  return (
    <div className="modal" onMouseDown={onCloseClick}>
      <div
        className={`modal__content modal_type_${name} ${getModalContentClassModifier()}`}
      >
        <button
          className={`modal__close-button ${
            activeModal === "preview" ? "modal__close-button_type_white" : ""
          }`}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
