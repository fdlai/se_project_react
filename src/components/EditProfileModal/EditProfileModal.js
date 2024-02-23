import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  isOpen,
  onCloseClick,
  onSubmitEditProfileModal,
  onFormSubmitFail,
}) {
  const { name, avatar } = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: "", avatarURL: "" });

  //autofill the current name and avatar when opening the modal
  useEffect(() => {
    if (isOpen) {
      setValues({ name, avatarURL: avatar });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
