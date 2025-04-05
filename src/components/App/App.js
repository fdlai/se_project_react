import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithMessage from "../ModalWithMessage/ModalWithMessage";
import ModalWithConfirmation from "../ModalWithConfirmation/ModalWithConfirmation";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getWeather, getTempDescription } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  getApiClothingItems,
  postApiClothingItem,
  deleteApiClothingItem,
  updateUserInfo,
  likeItem,
  unLikeItem,
} from "../../utils/api";
import { register, login, getCurrentUsersInfo } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ContextProvider from "../ContextProvider/ContextProvider";

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
  //control the inventory of clothing items that are displayed
  const [clothingItems, setClothingItems] = useState(null);
  //control whether temperature is displayed in fahrenheit or celsius
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  //message modal works on a different state, so that it can be open simultaneously with other modals
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  //tracks the currently logged in user's info
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  //tracks whether user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //used to conditionally render some JSX, only after token has been checked (if a token exists), for a cleaner UX
  const [tokenChecked, setTokenChecked] = useState(
    !localStorage.getItem("jwt")
  );

  /* ------------------------------- Other Hooks ------------------------------ */

  const history = useHistory();

  /* -------------------------------------------------------------------------- */
  /*                         Derived and other variables                        */
  /* -------------------------------------------------------------------------- */
  const temp = useMemo(() => {
    return weatherData
      ? {
          F: Math.round(weatherData.main.temp),
          C: Math.round(((weatherData.main.temp - 32) * 5) / 9),
        }
      : {
          F: "Loading...",
          C: "Loading...",
        };
  }, [weatherData]);

  const location = weatherData ? weatherData.name : "Loading...";

  const tempDescription = getTempDescription(temp.F); //undefined until weatherData is set to the fetched weather object

  //props for the ContextProvider component
  const contextProps = useMemo(() => {
    return {
      currentUserProps: { ...currentUser },
      currentTemperatureUnitProps: {
        currentTemperatureUnit,
        handleToggleSwitchChange,
      },
    };
  }, [currentUser, currentTemperatureUnit]);

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

  //logs user in on page load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUsersInfo(token)
        .then((userInfo) => {
          handleLogin(userInfo);
        })
        .catch((err) => {
          console.log(`${err}. Could not verify JWT token.`);
        })
        .finally(() => {
          setTokenChecked(true);
        });
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  const openAddItemModal = useCallback(() => {
    setActiveModal("create");
  }, []);

  const openDeleteModal = () => {
    setActiveModal("delete-item-confirm");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const openRegisterModal = useCallback(() => {
    setActiveModal("register");
  }, []);

  const openLoginModal = useCallback(() => {
    setActiveModal("login");
  }, []);

  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  // const openModal = (modalName) => {
  //   setActiveModal(modalName);
  // };

  const handleLogin = ({ name = "", email, avatar = "", _id }) => {
    setIsLoggedIn(true);
    setCurrentUser({ name, email, avatar, _id });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      avatar: "",
      _id: "",
    });
    localStorage.removeItem("jwt");
    history.push("/");
  };

  const handleMessageModalClose = () => {
    setMessageModalOpen(false);
  };

  function handleModalEscKey(e) {
    if (e.key === "Escape") {
      closeModal();
      handleMessageModalClose();
    }
  }
  //handles the opening of the ItemModal. Runs when clicking a card image.
  const handleSelectedCardData = (cardData) => {
    setSelectedCardData(cardData);
    setActiveModal("preview");
  };
  //Runs when clicking/changing the ToggleSwitch component
  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }
  //Runs when submitting the addItem Modal
  function handleAddItemSubmit(name, imageUrl, selectedTemp) {
    return postApiClothingItem({
      name: name,
      imageUrl: imageUrl,
      weather: selectedTemp,
      token: `${localStorage.getItem("jwt")}`,
    })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  //Runs when submitting the Register Modal
  function handleRegisterModalSubmit({ email, password, name, avatarURL }) {
    return register({ email, password, name, avatar: avatarURL }).then(
      (userInfo) => {
        console.log(userInfo);
        //Log in user
        return handleLoginModalSubmit({ email, password });
      }
    );
  }
  //Runs when submitting the Login Modal
  function handleLoginModalSubmit({ email, password }) {
    return login(email, password).then((userInfo) => {
      handleLogin(userInfo);
      localStorage.setItem("jwt", userInfo.token);
    });
  }
  //Runs when submitting the Edit profile modal
  function handleEditProfileModalSubmit({ name, avatarURL }) {
    return updateUserInfo({
      name,
      avatar: avatarURL,
      token: localStorage.getItem("jwt"),
    }).then((userInfo) => {
      const name = userInfo.name || "";
      const avatar = userInfo.avatar || "";
      setCurrentUser((prev) => {
        return { ...prev, name, avatar };
      });
    });
  }
  //Runs when clicking a card's like button
  function handleLikeButtonClick({ cardId, isLiked }) {
    const replaceItem = (updatedItem) => {
      const updatedClothingItems = clothingItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      );
      setClothingItems(updatedClothingItems);
    };
    if (isLiked) {
      return unLikeItem(cardId, localStorage.getItem("jwt")).then(replaceItem);
    } else {
      return likeItem(cardId, localStorage.getItem("jwt")).then(replaceItem);
    }
  }
  //Runs when clicking 'delete' in the confirmation modal
  function deleteClothingItem(id) {
    deleteApiClothingItem(id, localStorage.getItem("jwt"))
      .then((data) => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id != id;
        });
        setClothingItems(newClothingItems);
        closeModal();
      })
      .catch((err) => {
        setMessage(`Error ${err}. Could not delete clothing item.`);
        setMessageModalOpen(true);
      });
  }
  function handleErrorMessage(err, message) {
    setMessage(`${err}. ${message}`);
    setMessageModalOpen(true);
  }

  /* -------------------------------------------------------------------------- */
  /*                                     JSX                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <ContextProvider {...contextProps}>
      <div className="page">
        <Header
          className="page__header"
          location={location}
          onHeaderButtonClick={openAddItemModal}
          onRegisterButtonClick={openRegisterModal}
          onLoginButtonClick={openLoginModal}
          isLoggedIn={isLoggedIn}
          tokenChecked={tokenChecked}
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
              onLikeButtonClick={handleLikeButtonClick}
              onFetchError={handleErrorMessage}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/profile"
            tokenChecked={tokenChecked}
          >
            <Profile
              className="page__profile"
              clothingItems={clothingItems}
              onCardImageClick={handleSelectedCardData}
              onAddButtonClick={openAddItemModal}
              onLogoutButtonClick={handleLogout}
              onEditProfileButtonClick={openEditProfileModal}
              onLikeButtonClick={handleLikeButtonClick}
              onFetchError={handleErrorMessage}
              isLoggedIn={isLoggedIn}
            />
          </ProtectedRoute>
        </Switch>
        <Footer className="page__footer" />

        <AddItemModal
          isOpen={activeModal === "create"}
          setActiveModal={setActiveModal}
          onCloseClick={closeModal}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
          onAddItem={handleAddItemSubmit}
          onFormSubmitFail={handleErrorMessage}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          onCloseClick={closeModal}
          itemData={selectedCardData}
          modalCloseButtonClass={"modal__close-button_type_white"}
          modalContentClassName={"modal__content_type_image"}
          onClickDelete={openDeleteModal}
        />

        <ModalWithMessage
          isOpen={messageModalOpen}
          message={message}
          onCloseClick={handleMessageModalClose}
          activeModal={activeModal}
          modalContentClassName={"modal__content_type_message"}
          modalClassName={"modal_type_message-active"}
        />

        <ModalWithConfirmation
          isOpen={activeModal === "delete-item-confirm"}
          onCloseClick={closeModal}
          modalContentClassName={"modal__content_type_confirm"}
          modalCloseButtonClass={"modal__close-button_type_confirm"}
          onClickDelete={deleteClothingItem}
          itemData={selectedCardData}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onCloseClick={closeModal}
          onSecondButtonClick={openLoginModal}
          onSubmitRegisterModal={handleRegisterModalSubmit}
          onFormSubmitFail={handleErrorMessage}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onCloseClick={closeModal}
          onSecondButtonClick={openRegisterModal}
          onSubmitLoginModal={handleLoginModalSubmit}
          onFormSubmitFail={handleErrorMessage}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onCloseClick={closeModal}
          onSubmitEditProfileModal={handleEditProfileModalSubmit}
          onFormSubmitFail={handleErrorMessage}
        />
      </div>
    </ContextProvider>
  );
}

export default App;
