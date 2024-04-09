import { processServerResponse } from "./weatherApi";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.fdlai.nodnor.com"
    : "http://localhost:3001";

export const getApiClothingItems = (controller) => {
  return fetch(`${baseUrl}/items`, { signal: controller.signal }).then(
    (res) => {
      return processServerResponse(res);
    }
  );
};

export const postApiClothingItem = ({ name, imageUrl, weather, token }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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

export const deleteApiClothingItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return processServerResponse(res);
  });
};

export const updateUserInfo = ({ name, avatar, token }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => {
    return processServerResponse(res);
  });
};

export const likeItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return processServerResponse(res);
  });
};

export const unLikeItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return processServerResponse(res);
  });
};
