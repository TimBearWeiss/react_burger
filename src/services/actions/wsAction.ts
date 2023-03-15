import { TOrder } from "../../types/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

// type action

type TOrderWsAction = {
  readonly orders: Array<TOrder>;
  readonly total: number;
  readonly totalToday: number;
};

type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
};

type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrderWsAction;
};

type TWsSendMessage = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: TOrderWsAction;
};

export type TwsAction =
  | TWsConnectionStart
  | TWsConnectionClosed
  | TWsConnectionSuccess
  | TWsConnectionError
  | TWsGetMessage
  | TWsSendMessage;

// action

export const wsConnectionStart = (url: string): TWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionClosed = (): TWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsConnectionSuccess = (): TWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): TWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsGetMessage = (message: TOrderWsAction): TWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message: TOrderWsAction): TWsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
