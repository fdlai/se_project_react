import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  return (
    <div className="page">
      <Header className="page__header" />
      <Main className="page__main" />
      <Footer className="page__footer" />
      <ModalWithForm></ModalWithForm>
    </div>
  );
}

export default App;
