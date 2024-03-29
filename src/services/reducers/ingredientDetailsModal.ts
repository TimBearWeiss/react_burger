import { GET_CURRENT_INGREDIENT } from "../actions/ingredientDetailsModal";
import { TIngredient } from "../../types/types";
import { TGetCurrentIngredient } from "../actions/ingredientDetailsModal";

type TCurrentIngredient = {
  currentIngredient: TIngredient | null;
};

const defaultState: TCurrentIngredient = {
  // информация о конкретном ингредиенте
  currentIngredient: null,
};

export const ingredientDetailsModalReducer = (
  state = defaultState,
  action: TGetCurrentIngredient
) => {
  switch (action.type) {
    case GET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.item,
      };

    default:
      return state;
  }
};
