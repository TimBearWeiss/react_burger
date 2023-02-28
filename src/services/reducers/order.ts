import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
} from "../actions/order";
import { TorderAction } from "../actions/order";

type TOrdersState = {
  orderNumber: number | null;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;
  orderStatus: string;
};

const defaultState: TOrdersState = {
  // получение номера заказа
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
  orderStatus: "Оформить заказ",
};

export const orderReducer = (state = defaultState, action: TorderAction) => {
  switch (action.type) {
    // номер заказа
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderNumberRequest: true,
        orderStatus: "Подождите...",
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.number,
        orderNumberRequest: false,
        orderNumberFailed: false,
        orderStatus: "Оформить заказ",
      };
    case GET_ORDER_FAILED:
      return { ...state, orderNumberRequest: false, orderNumberFailed: true };

    case CLOSE_ORDER_MODAL:
      return { ...state, orderNumber: null };

    default:
      return state;
  }
};
