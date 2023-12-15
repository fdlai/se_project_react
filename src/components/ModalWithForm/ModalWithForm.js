import "./ModalWithForm.css";
import useEscapeKey from "../../utils/useEscapeKey";

function ModalWithForm({
  name = "",
  title = "New garment",
  buttonText = "Add garment",
  onCloseButtonClick = () => {},
  onPressEsc = () => {},
  children,
}) {
  //custom hook
  useEscapeKey(onPressEsc);

  return (
    <div
      className={`modal modal_type_${name}`}
      onMouseDown={onCloseButtonClick}
    >
      <div className="modal__content">
        <button className="modal__close-button"></button>
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
