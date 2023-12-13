import React from "react";
import "./Header.css";

function Header({ className = "" }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className={`header ${className}`}>
        <div className="header__logo-container">
          <div>
            <img
              className="header__logo"
              src={require("../../images/logo.svg").default}
              alt="logo"
            />
          </div>
          <div className="header__date">{currentDate}</div>
        </div>
        <div className="header__avatar-container">
          <div>
            <button className="header__button" type="text">
              + Add clothes
            </button>
          </div>
          <div className="header__name">Terrence Tegegne</div>
          <div>
            <img
              src={require("../../images/avatar.svg").default}
              alt="avatar"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
