import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({ onCloseClick = () => {}, itemData, activeModal }) {
  return (
    <Modal onCloseClick={onCloseClick} activeModal={activeModal}>
      <img src={itemData.link} alt={itemData.name} className="modal__image" />
      <div className="modal__info">
        <p className="modal__image-name">{itemData.name}</p>
        <p className="modal__image-description">Weather: {itemData.weather}</p>
      </div>
    </Modal>
  );
}

export default ItemModal;
