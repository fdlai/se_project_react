import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

//The specific modal which adds new clothes items
const AddItemModal = ({ onCloseClick = () => {}, isOpen, onAddItem }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedTemp, setSelectedTemp] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  //   useEffect(() => {
  //     return () => {
  //       setName("");
  //       setLink("");
  //     };
  //   }, []);

  function handleFormSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onAddItem with appropriate arguments
    onAddItem(name, link, selectedTemp);
    setName("");
    setLink("");
    setSelectedTemp("");
  }

  return (
    <ModalWithForm
      title="New garment"
      onCloseClick={onCloseClick}
      buttonText="Add garment"
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
    >
      {/* -------------------------------- Children
      -------------------------------- */}
      <label className="modal__label">
        <p className="modal__text">Name</p>
        <input
          className="modal__input"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Name"
        />
      </label>
      <label className="modal__label">
        <p className="modal__text">Image</p>
        <input
          className="modal__input"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          value={link}
          type="text"
          placeholder="Image URL"
        />
      </label>
      <p className="modal__text modal__text_type_last">
        Select the weather type:
      </p>
      <div className="modal__radio-container">
        <input
          type="radio"
          id="hot"
          value="hot"
          name="temperature"
          onChange={(e) => {
            setSelectedTemp(e.target.value);
          }}
        />
        <label>Hot</label>
      </div>
      <div className="modal__radio-container">
        <input
          type="radio"
          id="warm"
          value="warm"
          name="temperature"
          onChange={(e) => {
            setSelectedTemp(e.target.value);
          }}
        />
        <label>Warm</label>
      </div>
      <div className="modal__radio-container">
        <input
          type="radio"
          id="cold"
          value="cold"
          name="temperature"
          onChange={(e) => {
            setSelectedTemp(e.target.value);
          }}
        />
        <label>Cold</label>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
};

export default AddItemModal;
