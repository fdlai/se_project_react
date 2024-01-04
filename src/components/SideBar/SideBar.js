import "./SideBar.css";
import avatarImg from "../../images/avatar.svg";

function SideBar() {
  return (
    <div className="profile__user">
      <img className="profile__image" src={avatarImg} alt="avatar" />
      <div className="profile__name">Terrence Tegegne</div>
    </div>
  );
}

export default SideBar;
