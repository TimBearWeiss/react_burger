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

export { getIngredients };
