import { GET_CURRENT_INGREDIENT } from "../actions/ingredientDetailsModal";

const defaultState = {
  // информация о конкретном ингредиенте
  currentIngredient: null,
};

export const ingredientDetailsModalReducer = (state = defaultState, action) => {
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
