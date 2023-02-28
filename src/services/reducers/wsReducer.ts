import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsAction";
import { TOrder } from "../../types/types";
import { TwsAction } from "../actions/wsAction";

type TWsState = {
  wsConnected: Boolean;
  allOrders: Array<TOrder>;
  readyOrders: Array<TOrder>;
  preparingOrders: Array<TOrder>;
  total: number;
  totalToday: number;
  error: any;
};

const initialState: TWsState = {
  wsConnected: false,
  allOrders: [],
  readyOrders: [],
  preparingOrders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
};

export const wsReducer = (state = initialState, action: TwsAction) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        allOrders: action.payload.orders,
        readyOrders: [
          ...action.payload.orders.filter((el: TOrder) => el.status === "done"),
        ],
        preparingOrders: [
          ...action.payload.orders.filter(
            (el: TOrder) => el.status === "pending"
          ),
        ],
      };

    default:
      return state;
  }
};
