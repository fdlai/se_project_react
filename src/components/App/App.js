import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCardData, setSelectedCardData] = useState({});

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
      <Header className="page__header" onHeaderButtonClick={setModalToCreate} />
      <Main className="page__main" onCardImageClick={handleSelectedCardData} />
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
          <p className="modal__text">Select the weather type:</p>
          <div>
            <input type="radio" id="hot" value="hot" />
            <label>Hot</label>
          </div>
          <div>
            <input type="radio" id="warm" value="warm" />
            <label>Warm</label>
          </div>
          <div>
            <input type="radio" id="cold" value="cold" />
            <label>Cold</label>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal
          onCloseButtonClick={handleModalClose}
          onPressEsc={handleModalEscKey}
          data={selectedCardData}
        />
      )}
    </div>
  );
}

export default App;
