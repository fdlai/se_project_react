import "./SideBar.css";
import { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onLogoutButtonClick, onEditProfileButtonClick }) {
  let { name, avatar } = useContext(CurrentUserContext);
  name = name || "Username";

  return (
    <>
      <div className="profile__user">
        <Avatar name={name} avatar={avatar} width={56} />
        <div className="profile__name">{name || "User"}</div>
      </div>
      <div className="profile__side-content">
        <button
          className="profile__change-button"
          onClick={onEditProfileButtonClick}
        >
          Change profile data
        </button>
        <button
          className="profile__logout-button"
          onClick={onLogoutButtonClick}
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default SideBar;
