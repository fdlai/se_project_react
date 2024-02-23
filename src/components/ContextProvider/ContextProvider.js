import "./ContextProvider.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ContextProvider({
  children,
  currentUser,
  currentTemperatureUnit,
  handleToggleSwitchChange,
}) {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        {children}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default ContextProvider;
