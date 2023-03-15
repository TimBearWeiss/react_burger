import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/ingredients";
import { TIngredient } from "../../types/types";
import { TingredientsAction } from "../actions/ingredients";

type TIngredients = {
  allIngredients: Array<TIngredient>;
  allIngredientsRequest: boolean;
  allIngredientsFailed: boolean;
};

const defaultState: TIngredients = {
  // полчение ингредиентов
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
};

export const ingredientsReducer = (
  state = defaultState,
  action: TingredientsAction
) => {
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

    default:
      return state;
  }
};
