import { useEffect } from "react";

const useEscapeKey = (onPressEsc) => {
  useEffect(() => {
    document.addEventListener("keydown", onPressEsc);
    return () => {
      document.removeEventListener("keydown", onPressEsc);
    };
  }, []);
};

export default useEscapeKey;
