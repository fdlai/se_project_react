import { useEffect, useState } from "react";
import "./Modal.css";

function Modal({
  isOpen,
  children,
  onCloseClick = () => {},
  modalContentClassName,
  modalCloseButtonClass,
}) {
  const handleCloseClick = (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close-button")
    ) {
      onCloseClick();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_active" : ""}`}
      onMouseDown={handleCloseClick}
    >
      <div className={`modal__content ${modalContentClassName}`}>
        <button
          className={`modal__close-button ${modalCloseButtonClass}`}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
