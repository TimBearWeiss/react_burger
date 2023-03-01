import { getCookie } from "./cookie";

const BASE_URL = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space/orders";

function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getIngredients = (url: string) => {
  return fetch(`${BASE_URL}/${url}`).then(checkResponse);
};

// получение номера заказа
const getNumberOfOrder = (url: string, idIngredients: Array<string>) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: idIngredients,
    }),
  }).then(checkResponse);
};

export { getIngredients, getNumberOfOrder, BASE_URL, WS_URL, checkResponse };
