import update from "immutability-helper";
import {
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN_IN_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_CARD,
  DELETE_ALL_INGREDIENT,
} from "../actions/burgerConstructor";
import { TIngredient } from "../../types/types";
import { TburgerConstructor } from "../actions/burgerConstructor";

type TConstructorIng = {
  constructorIngredients: Array<TIngredient> | [];
  // constructorBuns: Array<TIngredient> | [];
  constructorBuns: any;
};

const defaultState: TConstructorIng = {
  // ингредиенты в конструкторе
  constructorIngredients: [],
  constructorBuns: [],
};

export const constructorReducer = (
  state = defaultState,
  action: TburgerConstructor
) => {
  switch (action.type) {
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

    case DELETE_ALL_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [],
        constructorBuns: [],
      };

    default:
      return state;
  }
};
