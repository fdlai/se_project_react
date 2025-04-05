import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function LoginModal({
  isOpen,
  onCloseClick,
  onSecondButtonClick,
  onSubmitLoginModal,
  onFormSubmitFail,
}) {
  const { values, handleChange, setIsSubmitted, isFormValid } = useForm({
    inputValues: {
      email: "",
      password: "",
    },
    defaultValidities: {
      emailValid: false,
      passwordValid: false,
    },
    isOpen,
  });

  console.log(isFormValid);

  function handleFormSubmit() {
    return onSubmitLoginModal(values)
      .then(() => {
        onCloseClick();
        setIsSubmitted(true);
      })
      .catch((err) => {
        onFormSubmitFail(err, "Could not log in.");
      });
  }

  return (
    <ModalWithForm
      title="Log in"
      onCloseClick={onCloseClick}
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType="login"
    >
      {/* -------------------------------- Children
      -------------------------------- */}
      <label className="modal__label">
        <p className="modal__text">Email</p>
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
        <p className="modal__text">Password</p>
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
      <div className="modal__buttons-container">
        <button
          className={`modal__submit-button modal__submit-button_type_register ${
            isFormValid && "modal__submit-button_active"
          }`}
        >
          Log in
        </button>
        <button
          className="modal__second-button"
          onClick={onSecondButtonClick}
          type="button"
        >
          or Register
        </button>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
