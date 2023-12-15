import useEscapeKey from "../../utils/useEscapeKey";

function ModalWithMessage({
  message = "Error!",
  onCloseClick = () => {},
  onPressEsc = () => {},
}) {
  //custom hook
  useEscapeKey(onPressEsc);

  return (
    <div className="modal" onMouseDown={onCloseClick}>
      <div className="modal__content modal__content_type_message">
        <button className="modal__close-button"></button>
        <h2 className="modal__message">{message}</h2>
      </div>
    </div>
  );
}

export default ModalWithMessage;
