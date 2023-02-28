import { getNumberOfOrder } from "../../utils/api.js";
import { AppThunk } from "../../types/types.js";
import { AppDispatch } from "../../types/types.js";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const CLOSE_ORDER_MODAL: "CLOSE_ORDER_MODAL" = "CLOSE_ORDER_MODAL";

//типы

type TgetOrderRequest = {
  readonly type: typeof GET_ORDER_REQUEST;
};

type TgetOrderFailed = {
  readonly type: typeof GET_ORDER_FAILED;
};

type TgetOrderSuccess = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number;
};

type TcloseOrderModalAction = {
  readonly type: typeof CLOSE_ORDER_MODAL;
};

// объединенные типы акшинов

export type TorderAction =
  | TgetOrderRequest
  | TgetOrderFailed
  | TgetOrderSuccess
  | TcloseOrderModalAction;

// акшин креаторы
const getOrderRequest = (): TgetOrderRequest => {
  return {
    type: GET_ORDER_REQUEST,
  };
};

const getOrderFailed = (): TgetOrderFailed => {
  return {
    type: GET_ORDER_FAILED,
  };
};

const getOrderSuccess = (number: number): TgetOrderSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    number: number,
  };
};

export const closeOrderModalAction = (): TcloseOrderModalAction => {
  return {
    type: CLOSE_ORDER_MODAL,
  };
};
// котлета

export const getOrder: AppThunk = (IdIngredients: Array<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
    getNumberOfOrder("orders", IdIngredients).then((res) => {
      if (res && res.success) {
        dispatch(getOrderSuccess(res.order.number));
      } else {
        dispatch(getOrderFailed());
      }
    });
  };
};