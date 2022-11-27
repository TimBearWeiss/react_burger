const getIngredients = (url) => {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => alert(`Ошибка: ${err.status}`));
};

const getNumberOfOrder = (url, idIngredients) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: idIngredients,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => alert(`Ошибка: ${err.status}`));
};

export { getIngredients, getNumberOfOrder };
