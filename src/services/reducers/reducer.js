import update from "immutability-helper";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_CURRENT_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN_IN_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_CARD,
} from "../actions/actions";

const defaultState = {
  // полчение ингредиентов
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
  // ингредиенты в конструкторе
  constructorIngredients: [],
  constructorBuns: [],

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

    // конструктор
    case ADD_INGREDIENT_IN_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.item],
      };

    case ADD_BUN_IN_CONSTRUCTOR:
      return {
        ...state,
        constructorBuns: action.item,
      };

    // удаление из конструктора

    case DELETE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item, index) => index !== action.item
          ),
        ],
      };

    case MOVE_CARD:
      return {
        ...state,
        constructorIngredients: update(state.constructorIngredients, {
          $splice: [
            [action.item.dragIndex, 1],
            [
              action.item.hoverIndex,
              0,
              state.constructorIngredients[action.item.dragIndex],
            ],
          ],
        }),
      };

    default:
      return state;
  }
};
