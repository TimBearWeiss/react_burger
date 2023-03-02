import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/burgerConstructor";
import { ingredientDetailsModalReducer } from "./reducers/ingredientDetailsModal";
import { orderReducer } from "./reducers/order";
import { userReducer } from "./reducers/user";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { wsReducer } from "./reducers/wsReducer";
import { socketMiddleware } from "./middleware/wsMiddleware";
import { useSelector } from "react-redux";
import { composeEnhancers } from "../utils/data";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./actions/wsAction";
import { TypedUseSelectorHook } from "react-redux";
import { TRootState } from "../types/types";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientsDetailModal: ingredientDetailsModalReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: wsReducer,
});

export type TWsActionsMiddleware = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
};

const wsActions: TWsActionsMiddleware = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const store = createStore(rootReducer, enhancer);
