import { getNumberOfOrder } from "../../utils/api.js";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

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
