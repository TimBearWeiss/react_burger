import { TIngredient } from "../../types/types";

export const GET_CURRENT_INGREDIENT: "GET_CURRENT_INGREDIENT" =
  "GET_CURRENT_INGREDIENT";

export type TgetCurrentIngredient = {
  readonly type: typeof GET_CURRENT_INGREDIENT;
  readonly item: TIngredient;
};

export const getCurrentIngredient = (
  item: TIngredient
): TgetCurrentIngredient => ({
  type: GET_CURRENT_INGREDIENT,
  item,
});
