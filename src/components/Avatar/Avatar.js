import "./Avatar.css";
import { color } from "../../utils/constants";
import { useRef, useState } from "react";

function Avatar({ name = null, avatar = null, width = 40 }) {
  const [isImageValid, setIsImageValid] = useState(true);
  const avatarRef = useRef();
  const updatedName = name || "Username";

  const getAvatarText = () => {
    return updatedName[0].toUpperCase();
  };

  const avatarImageStyles = {
    width: `${width}px`,
    display: `${avatar && isImageValid ? "block" : "none"}`,
  };

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
      <img
        className="avatar__image"
        src={avatar}
        style={avatarImageStyles}
        alt="avatar"
        onError={() => setIsImageValid(false)}
        ref={avatarRef}
        onLoad={() => setIsImageValid(true)}
      />

      {!avatar ||
        (!isImageValid && (
          <div
            className="avatar__background"
            style={avatarBackgroundStyles}
            alt="avatar"
          >
            <div className="avatar__text" style={avatarTextStyles}>
              {getAvatarText()}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Avatar;
