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

type TorderWsAction = {
  readonly orders: Array<TOrder>;
  readonly total: number;
  readonly totalToday: number;
};

type TwsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
};

type TwsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

type TwsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

type TwsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

type TwsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TorderWsAction;
};

type TwsSendMessage = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: TorderWsAction;
};

export type TwsAction =
  | TwsConnectionStart
  | TwsConnectionClosed
  | TwsConnectionSuccess
  | TwsConnectionError
  | TwsGetMessage
  | TwsSendMessage;

// action

export const wsConnectionStart = (url: string): TwsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionClosed = (): TwsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsConnectionSuccess = (): TwsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): TwsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsGetMessage = (message: TorderWsAction): TwsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message: TorderWsAction): TwsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
