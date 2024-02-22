import React, { useContext, useState } from "react";
import "./Header.css";
import logoImg from "../../images/logo.svg";
import avatarImg from "../../images/black-matte-background.jpg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

function Header({
  className = "",
  location,
  onHeaderButtonClick = () => {},
  isLoggedIn,
  onRegisterButtonClick,
  onLoginButtonClick,
  tokenChecked,
}) {
  let { name, avatar } = useContext(CurrentUserContext);
  name = name || "Username";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className={`header ${className}`}>
      <div className="header__logo-container">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logoImg} alt="logo" />
        </Link>
        <div className="header__date">{`${currentDate}, ${location}`}</div>
      </div>
      {tokenChecked && (
        <div className="header__avatar-container">
          <ToggleSwitch />
          {isLoggedIn && (
            <div>
              <button
                className="header__button"
                onClick={onHeaderButtonClick}
                type="text"
              >
                + Add clothes
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <>
              <button
                className="header__signup-button"
                onClick={onRegisterButtonClick}
              >
                Sign Up
              </button>
              <button
                className="header__login-button"
                onClick={onLoginButtonClick}
              >
                Log In
              </button>
            </>
          )}
          {isLoggedIn && (
            <div className="header__user-info-container">
              <Link to="/profile" className="header__link">
                <div className="header__name">{name}</div>
              </Link>
              <Link to="/profile" className="header__link">
                <Avatar name={name} avatar={avatar} width={40} />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
