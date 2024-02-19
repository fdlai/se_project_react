import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  isOpen,
  onCloseClick,
  handleFormSubmit,
  onSecondButtonClick,
}) {
  const { values, setValues, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatarURL: "",
  });
  return (
    <ModalWithForm
      title="Sign up"
      onCloseClick={onCloseClick}
      buttonText="Next"
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      modalType="register"
      secondButtonText="or Log in"
      onSecondButtonClick={onSecondButtonClick}
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
          type="text"
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
          required
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
          required
        />
      </label>
      {/* -------------------------------- Children
      -------------------------------- */}
    </ModalWithForm>
  );
}
