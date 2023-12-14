import "./ModalWithForm.css";

function ModalWithForm({
  name = "",
  title = "New garment",
  buttonText = "Add garment",
  onCloseButtonClick,
  children,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          onClick={onCloseButtonClick}
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" action="submit">
          {children}
          <button className="modal__submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
