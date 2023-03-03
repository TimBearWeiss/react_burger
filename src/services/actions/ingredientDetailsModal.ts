import { TIngredient } from "../../types/types";

export const GET_CURRENT_INGREDIENT: "GET_CURRENT_INGREDIENT" =
  "GET_CURRENT_INGREDIENT";

export type TGetCurrentIngredient = {
  readonly type: typeof GET_CURRENT_INGREDIENT;
  readonly item: TIngredient;
};

export const getCurrentIngredient = (
  item: TIngredient
): TGetCurrentIngredient => ({
  type: GET_CURRENT_INGREDIENT,
  item,
});
