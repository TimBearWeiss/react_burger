import { getNumberOfOrder } from "../../utils/api";
import { AppThunk } from "../../types/types.js";
import { AppDispatch } from "../../types/types.js";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const CLOSE_ORDER_MODAL: "CLOSE_ORDER_MODAL" = "CLOSE_ORDER_MODAL";

//типы

type TGetOrderRequest = {
  readonly type: typeof GET_ORDER_REQUEST;
};

type TGetOrderFailed = {
  readonly type: typeof GET_ORDER_FAILED;
};

type TGetOrderSuccess = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number;
};

type TCloseOrderModalAction = {
  readonly type: typeof CLOSE_ORDER_MODAL;
};

// объединенные типы акшинов

export type TOrderAction =
  | TGetOrderRequest
  | TGetOrderFailed
  | TGetOrderSuccess
  | TCloseOrderModalAction;

// акшин креаторы
const getOrderRequest = (): TGetOrderRequest => {
  return {
    type: GET_ORDER_REQUEST,
  };
};

const getOrderFailed = (): TGetOrderFailed => {
  return {
    type: GET_ORDER_FAILED,
  };
};

const getOrderSuccess = (number: number): TGetOrderSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    number: number,
  };
};

export const closeOrderModalAction = (): TCloseOrderModalAction => {
  return {
    type: CLOSE_ORDER_MODAL,
  };
};

// thunk экшен

export const getOrder: AppThunk = (idIngredients: Array<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
    getNumberOfOrder("orders", idIngredients).then((res) => {
      if (res && res.success) {
        dispatch(getOrderSuccess(res.order.number));
      } else {
        dispatch(getOrderFailed());
      }
    });
  };
};
