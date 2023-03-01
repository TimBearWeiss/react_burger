import { TIngredient } from "../../types/types";
export const ADD_INGREDIENT_IN_CONSTRUCTOR: "ADD_INGREDIENT_IN_CONSTRUCTOR" =
  "ADD_INGREDIENT_IN_CONSTRUCTOR";
export const ADD_BUN_IN_CONSTRUCTOR: "ADD_BUN_IN_CONSTRUCTOR" =
  "ADD_BUN_IN_CONSTRUCTOR";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const MOVE_CARD: "MOVE_CARD" = "MOVE_CARD";

export const DELETE_ALL_INGREDIENT: "DELETE_ALL_INGREDIENT" =
  "DELETE_ALL_INGREDIENT";

// типы actions

export type TaddIngredientInConstructor = {
  readonly type: typeof ADD_INGREDIENT_IN_CONSTRUCTOR;
  readonly item: TIngredient;
};

export type TaddBunsInConstructor = {
  readonly type: typeof ADD_BUN_IN_CONSTRUCTOR;
  item: TIngredient;
};

export type TdeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly item: number;
};

type TItemCard = {
  dragIndex: number;
  hoverIndex: number;
};

export type TMoveCard = {
  readonly type: typeof MOVE_CARD;
  readonly item: TItemCard;
};

export type TdeleteAllIngredient = {
  readonly type: typeof DELETE_ALL_INGREDIENT;
};

// объединенные типы акшинов

export type TburgerConstructor =
  | TaddIngredientInConstructor
  | TaddBunsInConstructor
  | TdeleteIngredient
  | TMoveCard
  | TdeleteAllIngredient;

// actions

export const addIngredientInConstructor = (
  item: TIngredient
): TaddIngredientInConstructor => ({
  type: ADD_INGREDIENT_IN_CONSTRUCTOR,
  item,
});

export const addBunsInConstructor = (
  item: TIngredient
): TaddBunsInConstructor => ({
  type: ADD_BUN_IN_CONSTRUCTOR,
  item,
});

export const deleteIngredient = (item: number): TdeleteIngredient => ({
  type: DELETE_INGREDIENT,
  item,
});

export const moveCard = (item: TItemCard): TMoveCard => ({
  type: MOVE_CARD,
  item,
});

export const deleteAllIngredient = (): TdeleteAllIngredient => {
  return {
    type: DELETE_ALL_INGREDIENT,
  };
};
