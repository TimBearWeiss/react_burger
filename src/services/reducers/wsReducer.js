import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsAction";

const initialState = {
  wsConnected: false,
  allOrders: [],
  readyOrders: [],
  preparingOrders: [],
  total: null,
  totalToday: null,
  error: undefined,
};

export const wsReducer = (state = initialState, action) => {
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
        error: action.payload,
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
          ...action.payload.orders.filter((el) => el.status === "done"),
        ],
        preparingOrders: [
          ...action.payload.orders.filter((el) => el.status === "pending"),
        ],
      };

    default:
      return state;
  }
};
