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

console.log("auth is running");

// register({
//   email: "JHorner@gmail.com",
//   password: "12345",
//   name: "James Horner",
// });

export const login = () => {};
