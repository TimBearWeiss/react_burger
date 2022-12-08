import { getIngredients, getNumberOfOrder } from "../../utils/api";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_CURRENT_INGREDIENT = "GET_CURRENT_INGREDIENT";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export function getAllIngredients(url) {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getIngredients(url).then((res) => {
      if (res && res.success) {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, items: res.data });
      } else {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      }
    });
  };
}

export function getOrder(url, IdIngredients) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getNumberOfOrder(url, IdIngredients).then((res) => {
      if (res && res.success) {
        dispatch({ type: GET_ORDER_SUCCESS, number: res.order.number });
      } else {
        dispatch({ type: GET_ORDER_FAILED });
      }
    });
  };
}
