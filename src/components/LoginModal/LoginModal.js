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
  const { values, handleChange, setIsSubmitted } = useForm({
    inputValues: {
      email: "",
      password: "",
    },
    isOpen,
  });

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
      buttonText="Log in"
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType="login"
      secondButtonText="or Register"
      onSecondButtonClick={onSecondButtonClick}
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
          type="text"
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
        />
      </label>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
