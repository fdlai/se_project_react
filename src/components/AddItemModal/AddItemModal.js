import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

//The specific modal which adds new clothes items
// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({
  onCloseClick = () => {},
  activeModal,
  setActiveModal,
  clothingItems,
  setClothingItems,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedTemp, setSelectedTemp] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  // create onChange handlers corresponding to each state variable

  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onAddItem with appropriate arguments
  }

  function handleAddItemSubmit(e) {
    e.preventDefault();
    const maxId = Math.max(...clothingItems.map((item) => item._id));
    const newItem = {
      _id: maxId + 1,
      name: name,
      weather: selectedTemp,
      link: link,
    };
    setClothingItems([newItem, ...clothingItems]);
    setActiveModal("");
  }

  return (
    <ModalWithForm
      title="New garment"
      onCloseClick={onCloseClick}
      buttonText="Add garment"
      activeModal={activeModal}
      handleFormSubmit={handleAddItemSubmit}
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
