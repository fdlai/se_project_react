import "./Avatar.css";
import { color } from "../../utils/constants";

function Avatar({ name = null, avatar = null, width = 40 }) {
  const updatedName = name || "Username";

  const setAvatarText = () => {
    if (!avatar) {
      return updatedName[0].toUpperCase();
    } else {
      return "";
    }
  };

  const avatarImageStyles = { width: `${width}px` };

  const avatarTextStyles = {
    lineHeight: `${width}px`,
    fontSize: `${0.625 * width}px`,
  };

  const avatarBackgroundStyles = {
    width: `${width}px`,
    background: `${color}`,
  };

  return (
    <div className="avatar">
      {avatar && (
        <img
          className="avatar__image"
          src={avatar}
          style={avatarImageStyles}
          alt="avatar"
        />
      )}
      {!avatar && (
        <div
          className="avatar__background"
          style={avatarBackgroundStyles}
          alt="avatar"
        />
      )}
      <div className="avatar__text" style={avatarTextStyles}>
        {setAvatarText()}
      </div>
    </div>
  );
}

export default Avatar;
