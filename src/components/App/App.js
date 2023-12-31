import "./App.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithMessage from "../ModalWithMessage/ModalWithMessage";
import { defaultClothingItems } from "../../utils/constants";
import { getWeather, getTempDescription } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  //control the opening of modals
  const [activeModal, setActiveModal] = useState("");
  //control the card that is opened in the ItemModal
  const [selectedCardData, setSelectedCardData] = useState({});
  //the object returned by the weather api
  const [weatherData, setWeatherData] = useState(null);
  //control the message being used in MessageModal
  const [message, setMessage] = useState("no message set");
  //control the inventory of clothing items that can be displayed
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  console.log(clothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const temp = weatherData
    ? {
        F: Math.round(weatherData.main.temp),
        C: Math.round(((weatherData.main.temp - 32) * 5) / 9),
      }
    : "Loading...";
  const location = weatherData ? weatherData.name : "Loading...";
  const tempDescription = getTempDescription(temp.F); //undefined until weatherData is set to the fetched weather object

  useEffect(() => {
    if (!activeModal) {
      return;
    }
    document.addEventListener("keydown", handleModalEscKey);
    return () => {
      document.removeEventListener("keydown", handleModalEscKey);
    };
  }, [activeModal]);

  useEffect(() => {
    const controller = new AbortController();
    getWeather(controller)
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((err) => {
        setMessage(`Error ${err}. Could not retrieve weather data.`);
        setActiveModal("message");
      });
    return () => controller.abort();
  }, []);

  const setModalToCreate = () => {
    setActiveModal("create");
  };

  const handleModalClose = (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close-button")
    ) {
      setActiveModal("");
    }
  };

  function handleModalEscKey(e) {
    if (e.key === "Escape") {
      setActiveModal("");
    }
  }

  const handleSelectedCardData = (cardData) => {
    setSelectedCardData(cardData);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          className="page__header"
          location={location}
          onHeaderButtonClick={setModalToCreate}
        />
        <Main
          className="page__main"
          onCardImageClick={handleSelectedCardData}
          temp={temp}
          tempDescription={tempDescription}
          weatherData={weatherData}
          clothingItems={clothingItems}
        />
        <Footer className="page__footer" />

        {activeModal === "create" && (
          <AddItemModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            onCloseClick={handleModalClose}
            clothingItems={clothingItems}
            setClothingItems={setClothingItems}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            onCloseClick={handleModalClose}
            onPressEsc={handleModalEscKey}
            itemData={selectedCardData}
            activeModal={activeModal}
          />
        )}
        {activeModal === "message" && (
          <ModalWithMessage
            message={message}
            onCloseClick={handleModalClose}
            onPressEsc={handleModalEscKey}
            activeModal={activeModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
