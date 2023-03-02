import { store } from "../services/rootReducer";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TburgerConstructor } from "../services/actions/burgerConstructor";
import { TwsAction } from "../services/actions/wsAction";
import { TgetCurrentIngredient } from "../services/actions/ingredientDetailsModal";
import { TOrderAction } from "../services/actions/order";
import { TingredientsAction } from "../services/actions/ingredients";
import { TuserAction } from "../services/actions/user";

// типы

export type TIngredient = {
  _id: string;
  id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  _id: string;
  updatedAt: string;
};

export type TUserData = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TFormData = {
  name: string;
  email: string;
  password: string;
};

export type TItemCard = {
  dragIndex: number;
  hoverIndex: number;
};

// редакс типы
type TApplicationActions =
  | TburgerConstructor
  | TwsAction
  | TgetCurrentIngredient
  | TingredientsAction
  | TOrderAction
  | TuserAction;

export type TRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;
