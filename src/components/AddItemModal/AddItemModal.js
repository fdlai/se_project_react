import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";

//The specific modal which adds new clothes items
const AddItemModal = ({
  onCloseClick = () => {},
  isOpen,
  onAddItem,
  onAddItemFail,
}) => {
  const { values, setValues, handleChange } = useForm({
    name: "",
    imageUrl: "",
    selectedTemp: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && isSubmitted) {
      setValues({
        name: "",
        imageUrl: "",
        selectedTemp: "",
      });
      setIsSubmitted(false);
    }
  }, [isOpen]);

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
          onChange={handleChange}
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
