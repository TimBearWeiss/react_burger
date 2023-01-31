import { combineReducers } from "redux";
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "../services/reducers/burgerConstructor";
import { ingredientDetailsModalReducer } from "../services/reducers/ingredientDetailsModal";
import { orderReducer } from "../services/reducers/order";
import { userReducer } from "../services/reducers/user";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientsDetailModal: ingredientDetailsModalReducer,
  order: orderReducer,
  user: userReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
