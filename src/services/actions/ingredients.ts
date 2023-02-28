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
export type TgetIngredientRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TgetIngredientFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TgetIngredientSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: Array<TIngredient>;
};

export type TingredientsAction =
  | TgetIngredientRequest
  | TgetIngredientFailed
  | TgetIngredientSuccess;

// экшины
export const getIngredientRequest = (): TgetIngredientRequest => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientFailed = (): TgetIngredientFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

export const getIngredientSuccess = (
  ingredients: Array<TIngredient>
): TgetIngredientSuccess => {
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

// export const getAllIngredients: AppThunk = () => {
//   return function (dispatch: AppDispatch) {
//     dispatch(getIngredientRequest());
//     getIngredients("ingredients").then((res) => {
//       if (res && res.success) {
//         dispatch({ type: GET_INGREDIENTS_SUCCESS, items: res.data });
//       } else {
//         dispatch(getIngredientFailed());
//       }
//     });
//   };
// };
