export const ADD_INGREDIENT_IN_CONSTRUCTOR = "ADD_INGREDIENT_IN_CONSTRUCTOR";
export const ADD_BUN_IN_CONSTRUCTOR = "ADD_BUN_IN_CONSTRUCTOR";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_CARD = "MOVE_CARD";

export const addIngredientInConstructor = (item) => ({
  type: ADD_INGREDIENT_IN_CONSTRUCTOR,
  item,
});

export const addBunsInConstructor = (item) => ({
  type: ADD_BUN_IN_CONSTRUCTOR,
  item,
});

export const deleteIngredient = (item) => ({
  type: DELETE_INGREDIENT,
  item,
});

export const moveCard = (item) => ({
  type: MOVE_CARD,
  item,
});
