import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { useState, useEffect, useMemo } from "react";

//The specific modal which adds new clothes items
const AddItemModal = ({
  onCloseClick = () => {},
  isOpen,
  onAddItem,
  onAddItemFail,
}) => {
  // This state essentially controls/keeps-track-of the form's input values
  const { values, setValues, handleChange, isSubmitted, setIsSubmitted } =
    useForm({
      inputValues: {
        name: "",
        imageUrl: "",
        selectedTemp: "",
      },
      isOpen,
    });

  function handleFormSubmit(e) {
    onAddItem(values.name, values.imageUrl, values.selectedTemp)
      .then(() => {
        setIsSubmitted(true);
        onCloseClick();
      })
      .catch((err) => onAddItemFail(err));
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
            handleChange(e);
          }}
          name="name"
          value={values.name}
          type="text"
          placeholder="Name"
          required
        />
      </label>
      <label className="modal__label">
        <p className="modal__text">Image</p>
        <input
          className="modal__input"
          onChange={handleChange}
          name="imageUrl"
          value={values.imageUrl}
          type="url"
          placeholder="Image URL"
          required
        />
      </label>
      <p className="modal__text modal__text_type_last">
        Select the weather type:
      </p>
      <div className="modal__radio-container">
        <label className="modal__radio-label">
          <input
            className="modal__radio-checkbox"
            type="radio"
            id="hot"
            value="hot"
            name="selectedTemp"
            onChange={handleChange}
            required
            checked={values.selectedTemp === "hot"}
          />
          Hot
        </label>
      </div>
      <div className="modal__radio-container">
        <label className="modal__radio-label">
          <input
            className="modal__radio-checkbox"
            type="radio"
            id="warm"
            value="warm"
            name="selectedTemp"
            onChange={handleChange}
            required
            checked={values.selectedTemp === "warm"}
          />
          Warm
        </label>
      </div>
      <div className="modal__radio-container">
        <label className="modal__radio-label">
          <input
            className="modal__radio-checkbox"
            type="radio"
            id="cold"
            value="cold"
            name="selectedTemp"
            onChange={handleChange}
            required
            checked={values.selectedTemp === "cold"}
          />
          Cold
        </label>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
};

export default AddItemModal;
