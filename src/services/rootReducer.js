import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "../services/reducers/burgerConstructor";
import { ingredientDetailsModalReducer } from "../services/reducers/ingredientDetailsModal";
import { orderReducer } from "../services/reducers/order";
import { userReducer } from "../services/reducers/user";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { wsReducer } from "../services/reducers/wsReducer";
import { socketMiddleware } from "../services/middleware/wsMiddleware";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./actions/wsAction";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientsDetailModal: ingredientDetailsModalReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: wsReducer,
});

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));

// export const store = createStore(rootReducer, enhancer);

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);
