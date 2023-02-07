import { checkResponse } from "./data";

const BASE_URL = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space/orders";

const getIngredients = (url) => {
  return fetch(`${BASE_URL}/${url}`).then(checkResponse);
};

// получение номера заказа
const getNumberOfOrder = (url, idIngredients, accessToken) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      ingredients: idIngredients,
    }),
  }).then(checkResponse);
};

export { getIngredients, getNumberOfOrder, BASE_URL, WS_URL };
