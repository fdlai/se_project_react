import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function RegisterModal({
  isOpen,
  onCloseClick,
  onSecondButtonClick,
  onSubmitRegisterModal,
  onFormSubmitFail,
}) {
  const { values, setIsSubmitted, handleChange, isFormValid } = useForm({
    inputValues: {
      email: "",
      password: "",
      name: "",
      avatarURL: "",
    },
    defaultValidities: {
      emailValid: false,
      passwordValid: false,
      nameValid: true,
      avatarURLValid: true,
    },
    isOpen,
  });

  function handleFormSubmit() {
    onSubmitRegisterModal(values)
      .then(() => {
        setIsSubmitted(true);
        onCloseClick();
      })
      .catch((err) => onFormSubmitFail(err, "Registration unsuccessful."));
  }

  return (
    <ModalWithForm
      title="Sign up"
      onCloseClick={onCloseClick}
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType="register"
    >
      {/* -------------------------------- Children
      -------------------------------- */}
      <label className="modal__label">
        <p className="modal__text">Email*</p>
        <input
          className="modal__input"
          onChange={(e) => {
            handleChange(e);
          }}
          name="email"
          value={values.email}
          type="email"
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__label">
        <p className="modal__text">Password*</p>
        <input
          className="modal__input"
          onChange={(e) => {
            handleChange(e);
          }}
          name="password"
          value={values.password}
          type="text"
          placeholder="Password"
          required
          minLength={5}
        />
      </label>
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
        />
      </label>
      <label className="modal__label">
        <p className="modal__text">Avatar URL</p>
        <input
          className="modal__input"
          onChange={handleChange}
          name="avatarURL"
          value={values.avatarURL}
          type="url"
          placeholder="Avatar URL"
        />
      </label>
      <div className="modal__buttons-container">
        <button
          className={`modal__submit-button modal__submit-button_type_register ${
            isFormValid && "modal__submit-button_active"
          }`}
        >
          Next
        </button>
        <button
          className="modal__second-button"
          onClick={onSecondButtonClick}
          type="button"
        >
          or Log in
        </button>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
