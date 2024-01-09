import "./App.css";
import { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithMessage from "../ModalWithMessage/ModalWithMessage";
import ModalWithConfirmation from "../ModalWithConfirmation/ModalWithConfirmation";
import { defaultClothingItems } from "../../utils/constants";
import { getWeather, getTempDescription } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import {
  getApiClothingItems,
  postApiClothingItem,
  deleteApiClothingItem,
} from "../../utils/api";

function App() {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */
  //control the opening of modals
  const [activeModal, setActiveModal] = useState("");
  //control the card that is currently selected/opened in the ItemModal
  const [selectedCardData, setSelectedCardData] = useState({});
  //the object returned by the weather api
  const [weatherData, setWeatherData] = useState(null);
  //control the message being used in MessageModal
  const [message, setMessage] = useState("no message set");
  //control the inventory of clothing items that can be displayed
  const [clothingItems, setClothingItems] = useState(null);
  //control whether temperature is displayed in fahrenheit or celsius
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  //message modal works on a different state, so that it can be open simultaneously with other modals
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                              Derived Variables                             */
  /* -------------------------------------------------------------------------- */
  const temp = weatherData
    ? {
        F: Math.round(weatherData.main.temp),
        C: Math.round(((weatherData.main.temp - 32) * 5) / 9),
      }
    : {
        F: "Loading...",
        C: "Loading...",
      };
  const location = weatherData ? weatherData.name : "Loading...";
  const tempDescription = getTempDescription(temp.F); //undefined until weatherData is set to the fetched weather object

  /* -------------------------------------------------------------------------- */
  /*                                 UseEffects                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!activeModal) {
      return;
    }
    document.addEventListener("keydown", handleModalEscKey);
    return () => {
      document.removeEventListener("keydown", handleModalEscKey);
    };
  }, [activeModal]);

  //fetches weather data from the API and assigns it to the weatherData state
  useEffect(() => {
    const controller = new AbortController();
    getWeather(controller)
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((err) => {
        setMessage(`Error ${err}. Could not retrieve weather data.`);
        setMessageModalOpen(true);
      });
    return () => controller.abort();
  }, []);

  //fetch clothing items from server and assign to clothingItems state
  useEffect(() => {
    const controller = new AbortController();
    getApiClothingItems(controller)
      .then((data) => {
        console.log(data);
        setClothingItems(data.reverse());
      })
      .catch((err) => {
        setMessage(`Error ${err}. Could not retrieve clothing items.`);
        setMessageModalOpen(true);
      });
    return () => controller.abort();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  const setModalToCreate = () => {
    setActiveModal("create");
  };

  const setModalToDelete = () => {
    setActiveModal("delete-item-confirm");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleMessageModalClose = () => {
    setMessageModalOpen(false);
  };

  function handleModalEscKey(e) {
    if (e.key === "Escape") {
      handleModalClose();
      handleMessageModalClose();
    }
  }
  //handles the opening of the ItemModal. Runs when clicking a card image.
  const handleSelectedCardData = (cardData) => {
    setSelectedCardData(cardData);
    setActiveModal("preview");
  };
  //Runs when clicking/changing the ToggleSwitch component
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  //Runs when submitting the addItem Modal
  function handleAddItemSubmit(name, imageUrl, selectedTemp) {
    return postApiClothingItem({
      name: name,
      imageUrl: imageUrl,
      weather: selectedTemp,
    })
      .then((data) => {
        const maxId = Math.max(...clothingItems?.map((item) => item._id));
        const newItem = {
          _id: maxId + 1,
          name: name,
          weather: selectedTemp,
          imageUrl: imageUrl,
        };
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  //Runs if an error occurs while trying to add a new clothing item
  function onAddItemFail(err) {
    setMessage(`${err}. Could not add clothing item.`);
    setMessageModalOpen(true);
  }

  //modify clothingItems array to remove the object with the passed in id. Runs when clicking 'delete' in the confirmation modal
  function deleteClothingItem(id) {
    deleteApiClothingItem(id)
      .then((data) => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id != id;
        });
        setClothingItems(newClothingItems);
        handleModalClose();
      })
      .catch((err) => {
        setMessage(`Error ${err}. Could not delete clothing item.`);
        setMessageModalOpen(true);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                     JSX                                    */
  /* -------------------------------------------------------------------------- */
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
        <Switch>
          <Route exact path="/">
            <Main
              className="page__main"
              onCardImageClick={handleSelectedCardData}
              temp={temp}
              tempDescription={tempDescription}
              weatherData={weatherData}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              className="page__profile"
              clothingItems={clothingItems}
              onCardImageClick={handleSelectedCardData}
              onAddButtonClick={setModalToCreate}
            />
          </Route>
        </Switch>
        <Footer className="page__footer" />

        <AddItemModal
          isOpen={activeModal === "create"}
          setActiveModal={setActiveModal}
          onCloseClick={handleModalClose}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
          onAddItem={handleAddItemSubmit}
          onAddItemFail={onAddItemFail}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          onCloseClick={handleModalClose}
          onPressEsc={handleModalEscKey}
          itemData={selectedCardData}
          modalCloseButtonClass={"modal__close-button_type_white"}
          modalContentClassName={"modal__content_type_image"}
          onClickDelete={setModalToDelete}
        />

        <ModalWithMessage
          isOpen={messageModalOpen}
          message={message}
          onCloseClick={handleMessageModalClose}
          onPressEsc={handleModalEscKey}
          activeModal={activeModal}
          modalContentClassName={"modal__content_type_message"}
          modalClassName={"modal_type_message-active"}
        />

        <ModalWithConfirmation
          isOpen={activeModal === "delete-item-confirm"}
          onCloseClick={handleModalClose}
          modalContentClassName={"modal__content_type_confirm"}
          modalCloseButtonClass={"modal__close-button_type_confirm"}
          onClickDelete={deleteClothingItem}
          itemData={selectedCardData}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
