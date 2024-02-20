import { baseUrl } from "./api";
import { processServerResponse } from "./weatherApi";

export const register = ({ email, password, name = "", avatar = "" }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    return processServerResponse(res);
  });
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return processServerResponse(res);
  });
};

// register({
//   email: "JHorner@gmail.com",
//   password: "12345",
//   name: "James Horner",
// });
