import {
  postNewUserInfo,
  logIn,
  getUserData,
  userLogOut,
  sendCode,
  getNewAuthToken,
  updateUserData,
} from "../../utils/userApi";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { AppDispatch } from "../../types/types";
import { TUserData, TFormData } from "../../types/types";

export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" =
  "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" =
  "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED: "REGISTER_USER_FAILED" =
  "REGISTER_USER_FAILED";

export const LOG_IN_REQUEST: "LOG_IN_REQUEST" = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS: "LOG_IN_SUCCESS" = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED: "LOG_IN_FAILED" = "LOG_IN_FAILED";

export const DATA_USER_REQUEST: "DATA_USER_REQUEST" = "DATA_USER_REQUEST";
export const DATA_USER_SUCCESS: "DATA_USER_SUCCESS" = "DATA_USER_SUCCESS";
export const DATA_USER_FAILED: "DATA_USER_FAILED" = "DATA_USER_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const PASSWORD_CHANGE_STEP_REQUEST: "PASSWORD_CHANGE_STEP_REQUEST" =
  "PASSWORD_CHANGE_STEP_REQUEST";
export const PASSWORD_CHANGE_STEP_SUCCESS: "PASSWORD_CHANGE_STEP_SUCCESS" =
  "PASSWORD_CHANGE_STEP_SUCCESS";
export const PASSWORD_CHANGE_STEP_FAILED: "PASSWORD_CHANGE_STEP_FAILED" =
  "PASSWORD_CHANGE_STEP_FAILED";

export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" =
  "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

export const CHANGE_USER_DATA_REQUEST: "CHANGE_USER_DATA_REQUEST" =
  "CHANGE_USER_DATA_REQUEST";
export const CHANGE_USER_DATA_SUCCESS: "CHANGE_USER_DATA_SUCCESS" =
  "CHANGE_USER_DATA_SUCCESS";
export const CHANGE_USER_DATA_FAILED: "CHANGE_USER_DATA_FAILED" =
  "CHANGE_USER_DATA_FAILED";

// типы

type TRegisterUserRequest = {
  readonly type: typeof REGISTER_USER_REQUEST;
};

type TRegisterUserFailed = {
  readonly type: typeof REGISTER_USER_FAILED;
};

type TRegisterUserSuccess = {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly userData: TUserData;
};

type TLogInRequest = {
  readonly type: typeof LOG_IN_REQUEST;
};

type TLogInFailed = {
  readonly type: typeof LOG_IN_FAILED;
};

type TLogInSuccess = {
  readonly type: typeof LOG_IN_SUCCESS;
  readonly userData: TUserData;
};

type TRequestUserData = {
  readonly type: typeof DATA_USER_REQUEST;
};

type TFailedUserData = {
  readonly type: typeof DATA_USER_FAILED;
};

type TSucessUserData = {
  readonly type: typeof DATA_USER_SUCCESS;
  readonly userData: TUserData;
};

type TLogOutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};

type TLogOutSuccsess = {
  readonly type: typeof LOGOUT_SUCCESS;
};

type TLogOutFailed = {
  readonly type: typeof LOGOUT_FAILED;
};

type TChangeStepRequest = {
  readonly type: typeof PASSWORD_CHANGE_STEP_REQUEST;
};

type TChangeStepSuccess = {
  readonly type: typeof PASSWORD_CHANGE_STEP_SUCCESS;
};

type TChangeStepFailed = {
  readonly type: typeof PASSWORD_CHANGE_STEP_FAILED;
};

type TUpdateTokenRequest = {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
};

type TUpdateTokenSuccess = {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly authToken: string;
};

type TUpdateTokenFailed = {
  readonly type: typeof UPDATE_TOKEN_FAILED;
};

type TChangeUserDataRequest = {
  readonly type: typeof CHANGE_USER_DATA_REQUEST;
};

type TChangeUserDataSuccess = {
  readonly type: typeof CHANGE_USER_DATA_SUCCESS;
  readonly userData: any;
};

type TChangeUserDataFailed = {
  readonly type: typeof CHANGE_USER_DATA_FAILED;
};

export type TuserAction =
  | TRegisterUserRequest
  | TRegisterUserFailed
  | TRegisterUserSuccess
  | TLogInRequest
  | TLogInFailed
  | TLogInSuccess
  | TRequestUserData
  | TFailedUserData
  | TSucessUserData
  | TLogOutRequest
  | TLogOutSuccsess
  | TLogOutFailed
  | TChangeStepRequest
  | TChangeStepSuccess
  | TChangeStepFailed
  | TUpdateTokenRequest
  | TUpdateTokenSuccess
  | TUpdateTokenFailed
  | TChangeUserDataRequest
  | TChangeUserDataSuccess
  | TChangeUserDataFailed;

// акшин креаторы

const registerUserRequest = (): TRegisterUserRequest => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

const registerUserFailed = (): TRegisterUserFailed => {
  return {
    type: REGISTER_USER_FAILED,
  };
};

const registerUserSuccess = (res: TUserData): TRegisterUserSuccess => {
  return {
    type: REGISTER_USER_SUCCESS,
    userData: res,
  };
};

const logInRequest = (): TLogInRequest => {
  return {
    type: LOG_IN_REQUEST,
  };
};

const logInFailed = (): TLogInFailed => {
  return {
    type: LOG_IN_FAILED,
  };
};

const logInSuccess = (res: TUserData): TLogInSuccess => {
  return {
    type: LOG_IN_SUCCESS,
    userData: res,
  };
};

//////////
const requestUserData = (): TRequestUserData => {
  return {
    type: DATA_USER_REQUEST,
  };
};

const failedUserData = (): TFailedUserData => {
  return {
    type: DATA_USER_FAILED,
  };
};

const sucessUserData = (res: TUserData): TSucessUserData => {
  return {
    type: DATA_USER_SUCCESS,
    userData: res,
  };
};

//////

const LogOutRequest = (): TLogOutRequest => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const LogOutSuccsess = (): TLogOutSuccsess => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const LogOutFailed = (): TLogOutFailed => {
  return {
    type: LOGOUT_FAILED,
  };
};

const changeStepRequest = (): TChangeStepRequest => {
  return {
    type: PASSWORD_CHANGE_STEP_REQUEST,
  };
};

const changeStepSuccess = (): TChangeStepSuccess => {
  return {
    type: PASSWORD_CHANGE_STEP_SUCCESS,
  };
};

const changeStepFailed = (): TChangeStepFailed => {
  return {
    type: PASSWORD_CHANGE_STEP_FAILED,
  };
};

const updateTokenRequest = (): TUpdateTokenRequest => {
  return {
    type: UPDATE_TOKEN_REQUEST,
  };
};

const updateTokenSuccess = (res: any): TUpdateTokenSuccess => {
  return {
    type: UPDATE_TOKEN_SUCCESS,
    authToken: res.accessToken,
  };
};

const updateTokenFailed = (): TUpdateTokenFailed => {
  return {
    type: UPDATE_TOKEN_FAILED,
  };
};

const changeUserDataRequest = (): TChangeUserDataRequest => {
  return {
    type: CHANGE_USER_DATA_REQUEST,
  };
};

const changeUserDataSuccess = (res: any): TChangeUserDataSuccess => {
  return {
    type: CHANGE_USER_DATA_SUCCESS,
    userData: res.user,
  };
};

const changeUserDataFailed = (): TChangeUserDataFailed => {
  return {
    type: CHANGE_USER_DATA_FAILED,
  };
};

// thunk экшены

export const registerUser = (formData: TFormData, redirect: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerUserRequest());
    postNewUserInfo(formData)
      .then((res) => {
        if (res && res.success) {
          dispatch(registerUserSuccess(res));
          setCookie("token", res.refreshToken);
        } else {
          dispatch(registerUserFailed());
        }
      })
      .then(redirect)
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: REGISTER_USER_FAILED });
      });
  };
};

// вход в систему
export const LogIn = (
  email: string,
  password: string,
  redirect: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(logInRequest());
    logIn(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(logInSuccess(res));
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]); //новые куки
          setCookie("refreshToken", res.refreshToken); //новые куки
        } else {
          dispatch(logInFailed());
        }
      })
      .then(redirect)
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch(logInFailed());
      });
  };
};

//запрос данных пользователя по access токену
export const fillUserData = () => {
  return function (dispatch: AppDispatch) {
    dispatch(requestUserData());
    getUserData()
      .then((res) => {
        if (res && res.success) {
          dispatch(sucessUserData(res));
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch(failedUserData());
        updateToken();
        // dispatch(updateToken());
      });
  };
};

// обновление токена для запоминания входа
export const updateToken = () => {
  return function (dispatch: AppDispatch) {
    dispatch(updateTokenRequest());
    getNewAuthToken()
      .then((res) => {
        if (res && res.success) {
          dispatch(updateTokenSuccess(res));
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          fillUserData();
          // dispatch(fillUserData());
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch(updateTokenFailed());
      });
  };
};

// выход из системы
export const logOut = () => {
  return function (dispatch: AppDispatch) {
    dispatch(LogOutRequest());
    userLogOut()
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(LogOutSuccsess());
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch(LogOutFailed());
      });
  };
};

export const passwordChangeStep = (email: string, redirect: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch(changeStepRequest());
    sendCode(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(changeStepSuccess());
          redirect();
        } else {
          dispatch(changeStepFailed());
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch(changeStepFailed());
      });
  };
};

//обновление данных пользователя через профиль (с токеном)
export const changeUserData = (form: TFormData) => {
  return function (dispatch: AppDispatch) {
    dispatch(changeUserDataRequest());
    updateUserData(form)
      .then((res) => {
        if (res && res.success) {
          dispatch(changeUserDataSuccess(res));
        } else {
          dispatch(changeUserDataFailed());
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch(changeUserDataFailed());
      });
  };
};
