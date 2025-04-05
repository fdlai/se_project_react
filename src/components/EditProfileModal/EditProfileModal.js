import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

export default function EditProfileModal({
  isOpen,
  onCloseClick,
  onSubmitEditProfileModal,
  onFormSubmitFail,
}) {
  const { name, avatar } = useContext(CurrentUserContext);

  const { values, handleChange, setValues, isFormValid } = useForm({
    inputValues: {
      name: "",
      avatarURL: "",
    },
    defaultValidities: {
      nameValid: true,
      avatarURLValid: true,
    },
    isOpen,
  });

  //autofill the current name and avatar when opening the modal
  useEffect(() => {
    if (isOpen) {
      setValues({ name, avatarURL: avatar });
    }
  }, [isOpen]);

  function handleFormSubmit() {
    onSubmitEditProfileModal(values)
      .then(() => {
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
      <div className="modal__buttons-container">
        <button
          className={`modal__submit-button ${
            isFormValid && "modal__submit-button_active"
          }`}
        >
          Save changes
        </button>
      </div>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
