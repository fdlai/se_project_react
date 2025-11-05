import "./LocationModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { resetUserEnteredLocation } from "../../utils/helpers";

export default function LocationModal({
  isOpen,
  onCloseClick,
  handleLocationModalSubmit,
  isLockedUntilSubmit = false,
  onFormSubmitFail,
}) {
  const { values, handleChange, setIsSubmitted, isFormValid } = useForm({
    inputValues: {
      location: "",
    },
    defaultValidities: {
      locationValid: false,
    },
    isOpen,
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    handleLocationModalSubmit(values.location)
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((err) => {
        onFormSubmitFail(err, "Could not find location");
        resetUserEnteredLocation();
      });
  }

  return (
    <ModalWithForm
      title="Enter a location"
      onCloseClick={isLockedUntilSubmit ? () => {} : onCloseClick}
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType={"create"}
    >
      {/* -------------------------------- Children
      -------------------------------- */}
      <label className="modal__label">
        <p className="modal__text">Location</p>
        <input
          className="modal__input"
          onChange={(e) => {
            handleChange(e);
          }}
          name="location"
          value={values.location}
          type="text"
          placeholder="city, street address, or zipcode"
          required
        />
      </label>
      <div className="modal__buttons-container">
        <button
          className={`modal__submit-button ${
            isFormValid && "modal__submit-button_active"
          }`}
        >
          Submit
        </button>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
