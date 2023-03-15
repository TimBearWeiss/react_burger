import { getIngredients } from "../../utils/api";
import { AppDispatch } from "../../types/types";
import { AppThunk } from "../../types/types";
import { TIngredient } from "../../types/types";
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

// типы
export type TGetIngredientRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TGetIngredientSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: Array<TIngredient>;
};

export type TingredientsAction =
  | TGetIngredientRequest
  | TGetIngredientFailed
  | TGetIngredientSuccess;

// экшины
export const getIngredientRequest = (): TGetIngredientRequest => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientFailed = (): TGetIngredientFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

export const getIngredientSuccess = (
  ingredients: Array<TIngredient>
): TGetIngredientSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    items: ingredients,
  };
};

export const getAllIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientRequest());
    getIngredients("ingredients").then((res) => {
      if (res && res.success) {
        dispatch(getIngredientSuccess(res.data));
      } else {
        dispatch(getIngredientFailed());
      }
    });
  };
};
