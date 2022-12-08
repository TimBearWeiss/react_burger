import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_CURRENT_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
} from "../actions/actions";

const defaultState = {
  // полчение ингредиентов
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
  // ингредиенты в конструкторе
  constructorIngredients: [],

  // получение номера заказа
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,

  // информация о конкретном ингредиенте
  currentIngredient: null,
};

export const defaultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, allIngredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        allIngredients: action.items,
        allIngredientsRequest: false,
        allIngredientsFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        allIngredientsRequest: false,
        allIngredientsFailed: true,
      };
    case GET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.item,
      };

    // номер заказа
    case GET_ORDER_REQUEST:
      return { ...state, orderNumberRequest: true };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.number,
        orderNumberRequest: false,
        orderNumberFailed: false,
      };
    case GET_ORDER_FAILED:
      return { ...state, orderNumberRequest: false, orderNumberFailed: true };

    case CLOSE_ORDER_MODAL:
      return { ...state, orderNumber: null };

    default:
      return state;
  }
};
