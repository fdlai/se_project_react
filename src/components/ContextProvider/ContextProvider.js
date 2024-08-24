import "./ContextProvider.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ContextProvider({
  children,
  currentUserProps,
  currentTemperatureUnitProps,
}) {
  return (
    <CurrentUserContext.Provider value={currentUserProps}>
      <CurrentTemperatureUnitContext.Provider
        value={currentTemperatureUnitProps}
      >
        {children}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default ContextProvider;
