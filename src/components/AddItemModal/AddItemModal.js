import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

//The specific modal which adds new clothes items
const AddItemModal = ({
  onCloseClick = () => {},
  isOpen,
  onAddItem,
  onFormSubmitFail,
}) => {
  // This state essentially controls/keeps-track-of the form's input values
  const { values, handleChange, setIsSubmitted } = useForm({
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
      .catch((err) => onFormSubmitFail(err, "Could not add clothing item."));
  }

  return (
    <ModalWithForm
      title="New garment"
      onCloseClick={onCloseClick}
      buttonText="Add garment"
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType={"create"}
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
          <span className="modal__radio-span">Hot</span>
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
          <span className="modal__radio-span">Warm</span>
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
          <span className="modal__radio-span">Cold</span>
        </label>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
};

export default AddItemModal;
