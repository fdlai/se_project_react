import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
import { useContext, useState } from "react";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <input
        type="checkbox"
        className="switch__input"
        id="switch__input"
        onChange={handleToggleSwitchChange}
      />
      <label className="switch__label" htmlFor="switch__input">
        <span
          className={`switch__slider ${
            currentTemperatureUnit === "F"
              ? "switch__slider_type_F"
              : "switch__slider_type_C"
          }`}
        ></span>
        <p
          className={`switch__text-F ${
            currentTemperatureUnit === "F"
              ? "switch__text_active"
              : "switch__text_inactive"
          }`}
        >
          F
        </p>
        <p
          className={`switch__text-C ${
            currentTemperatureUnit === "C"
              ? "switch__text_active"
              : "switch__text_inactive"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
