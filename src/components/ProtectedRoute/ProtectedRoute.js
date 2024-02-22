import "./ProtectedRoute.css";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, tokenChecked, children, ...props }) {
  return (
    <>
      {tokenChecked && (
        <Route {...props}>
          {isLoggedIn ? children : <Redirect to={"/"} />}
        </Route>
      )}
    </>
  );
}

export default ProtectedRoute;
