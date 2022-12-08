const BASE_URL = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getIngredients = (url) => {
  return fetch(`${BASE_URL}/${url}`).then(checkResponse);
};

// получение номера заказа
const getNumberOfOrder = (url, idIngredients) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: idIngredients,
    }),
  }).then(checkResponse);
};

export { getIngredients, getNumberOfOrder };
