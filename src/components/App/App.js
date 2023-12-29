import "./App.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithMessage from "../ModalWithMessage/ModalWithMessage";
import { getWeather, getTempDescription } from "../../utils/weatherApi";

function App() {
  //control the opening of modals
  const [activeModal, setActiveModal] = useState("");
  //control the card that is opened in the ItemModal
  const [selectedCardData, setSelectedCardData] = useState({});
  //the object returned by the weather api
  const [weatherData, setWeatherData] = useState(null);
  //control the message being used in MessageModal
  const [message, setMessage] = useState("no message set");

  const temp = weatherData ? Math.round(weatherData.main.temp) : "Loading...";
  const location = weatherData ? weatherData.name : "Loading...";
  const tempDescription = getTempDescription(temp); //undefined until weatherData is set to the fetched weather object

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
          title="New garment"
          onCloseClick={handleModalClose}
          buttonText="Add garment"
          activeModal={activeModal}
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
            <input type="radio" id="hot" value="hot" name="temperature" />
            <label>Hot</label>
          </div>
          <div className="modal__radio-container">
            <input type="radio" id="warm" value="warm" name="temperature" />
            <label>Warm</label>
          </div>
          <div className="modal__radio-container">
            <input type="radio" id="cold" value="cold" name="temperature" />
            <label>Cold</label>
          </div>
        </ModalWithForm>
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
    </div>
  );
}

export default App;
