import { useEffect } from "react";

function ModalWithMessage({
  message = "Error!",
  onCloseClick = () => {},
  onPressEsc = () => {},
}) {
  useEffect(() => {
    document.addEventListener("keydown", onPressEsc);
    return () => {
      document.removeEventListener("keydown", onPressEsc);
    };
  }, []);

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
