import { processServerResponse } from "./weatherApi";

const baseUrl = "http://localhost:3001/items";

export const getApiClothingItems = (controller) => {
  return fetch(`${baseUrl}`, { signal: controller.signal }).then((res) => {
    return processServerResponse(res);
  });
};

export const postApiClothingItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then((res) => {
    return processServerResponse(res);
  });
};

export const deleteApiClothingItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return processServerResponse(res);
  });
};
