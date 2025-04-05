import { useEffect, useRef } from "react";
import "./Modal.css";

function Modal({
  isOpen,
  children,
  onCloseClick = () => {},
  modalContentClassName,
  modalCloseButtonClass,
  modalClassName,
}) {
  const modalRef = useRef();

  const handleCloseClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onCloseClick();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const modalElement = modalRef.current;
      const handleFocus = () => {
        const firstFocusableElement = modalElement.querySelector(
          "input, button, textarea, select, [tabindex]:not([tabindex='-1'])"
        );
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      };

      if (getComputedStyle(modalElement).transitionDuration !== "0s") {
        modalElement.addEventListener("transitionend", handleFocus, {
          once: true,
        });
      } else {
        handleFocus();
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      aria-modal="true"
      className={`modal ${isOpen ? "modal_active" : ""} ${modalClassName}`}
      onMouseDown={handleCloseClick}
    >
      <div className={`modal__content ${modalContentClassName}`}>
        {children}
        <button
          type="button"
          className={`modal__close-button ${modalCloseButtonClass}`}
          aria-label="Close"
          onClick={onCloseClick}
        ></button>
      </div>
    </div>
  );
}

export default Modal;
