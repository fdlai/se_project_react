import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function EditProfileModal({
  isOpen,
  onCloseClick,
  onSubmitEditProfileModal,
  onFormSubmitFail,
}) {
  const { values, setIsSubmitted, handleChange } = useForm({
    inputValues: {
      name: "",
      avatarURL: "",
    },
    isOpen,
  });

  function handleFormSubmit() {
    onSubmitEditProfileModal(values)
      .then(() => {
        setIsSubmitted(true);
        onCloseClick();
      })
      .catch((err) =>
        onFormSubmitFail(err, "Could not update name or avatar.")
      );
  }

  return (
    <ModalWithForm
      title="Change profile data"
      onCloseClick={onCloseClick}
      buttonText="Save changes"
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType="edit-profile"
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
        />
      </label>
      <label className="modal__label">
        <p className="modal__text">Avatar</p>
        <input
          className="modal__input"
          onChange={handleChange}
          name="avatarURL"
          value={values.avatarURL}
          type="url"
          placeholder="URL"
        />
      </label>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
