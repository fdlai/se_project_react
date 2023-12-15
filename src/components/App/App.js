import "./App.css";
import { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithMessage from "../ModalWithMessage/ModalWithMessage";
import { getWeather } from "../../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCardData, setSelectedCardData] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState("no message set");

  const temp = weatherData ? Math.round(weatherData.main.temp) : "Loading...";
  const location = weatherData ? weatherData.name : "Loading...";
  // const weatherCondition = useMemo(
  //   () => (weatherData ? weatherData.weather[0].main : "Loading..."),
  //   [weatherData]
  // );
  const tempDescription = getTempDescription(temp); //undefined until weatherData is set to the fetched weather object

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

  function getTempDescription(temperature) {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  }

  function getWeatherCondition() {}

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

  const handleModalEscKey = (e) => {
    if (e.key === "Escape") {
      setActiveModal("");
    }
  };

  const handleSelectedCardData = (cardData) => {
    setSelectedCardData(cardData);
    setActiveModal("preview");
  };

  return (
    <div className="page">
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
      />
      <Footer className="page__footer" />

      {activeModal === "create" && (
        <ModalWithForm
          onCloseButtonClick={handleModalClose}
          onPressEsc={handleModalEscKey}
        >
          <label className="modal__label">
            <p className="modal__text">Name</p>
            <input className="modal__input" type="text" placeholder="Name" />
          </label>
          <label className="modal__label">
            <p className="modal__text">Image</p>
            <input
              className="modal__input"
              type="text"
              placeholder="Image URL"
            />
          </label>
          <p className="modal__text modal__text_type_last">
            Select the weather type:
          </p>
          <div className="modal__radio-container">
            <input type="radio" id="hot" value="hot" />
            <label>Hot</label>
          </div>
          <div className="modal__radio-container">
            <input type="radio" id="warm" value="warm" />
            <label>Warm</label>
          </div>
          <div className="modal__radio-container">
            <input type="radio" id="cold" value="cold" />
            <label>Cold</label>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal
          onCloseButtonClick={handleModalClose}
          onPressEsc={handleModalEscKey}
          itemData={selectedCardData}
        />
      )}
      {activeModal === "message" && (
        <ModalWithMessage
          message={message}
          onCloseClick={handleModalClose}
          onPressEsc={handleModalEscKey}
        />
      )}
    </div>
  );
}

export default App;
