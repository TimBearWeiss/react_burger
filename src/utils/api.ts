import { TIngredient, TOrder } from "../types/types";
import { getCookie } from "./cookie";

const BASE_URL = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space/orders";

type TIngredientResponse = {
  data: TIngredient[];
};

type TNumberOfOrder = {
  order: TOrder;
};

type TResponse<T> = {
  success: boolean;
} & T;

const checkResponse = <T>(res: Response) => {
  return res.ok
    ? res.json().then((data) => data as TResponse<T>)
    : Promise.reject(res.status);
};

const getIngredients = (url: string) => {
  return fetch(`${BASE_URL}/${url}`).then((res) =>
    checkResponse<TIngredientResponse>(res)
  );
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
  }).then((res) => checkResponse<TNumberOfOrder>(res));
};

export { getIngredients, getNumberOfOrder, BASE_URL, WS_URL, checkResponse };
