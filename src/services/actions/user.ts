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

type TregisterUserRequest = {
  readonly type: typeof REGISTER_USER_REQUEST;
};

type TregisterUserFailed = {
  readonly type: typeof REGISTER_USER_FAILED;
};

type TregisterUserSuccess = {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly userData: TUserData;
};

type TlogInRequest = {
  readonly type: typeof LOG_IN_REQUEST;
};

type TlogInFailed = {
  readonly type: typeof LOG_IN_FAILED;
};

type TlogInSuccess = {
  readonly type: typeof LOG_IN_SUCCESS;
  readonly userData: TUserData;
};

//////

type TrequestUserData = {
  readonly type: typeof DATA_USER_REQUEST;
};

type TfailedUserData = {
  readonly type: typeof DATA_USER_FAILED;
};

type TsucessUserData = {
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

type TchangeStepRequest = {
  readonly type: typeof PASSWORD_CHANGE_STEP_REQUEST;
};

type TchangeStepSuccess = {
  readonly type: typeof PASSWORD_CHANGE_STEP_SUCCESS;
};

type TchangeStepFailed = {
  readonly type: typeof PASSWORD_CHANGE_STEP_FAILED;
};

type TupdateTokenRequest = {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
};

type TupdateTokenSuccess = {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly authToken: string;
};

type TupdateTokenFailed = {
  readonly type: typeof UPDATE_TOKEN_FAILED;
};

type TchangeUserDataRequest = {
  readonly type: typeof CHANGE_USER_DATA_REQUEST;
};

type TchangeUserDataSuccess = {
  readonly type: typeof CHANGE_USER_DATA_SUCCESS;
  readonly userData: any;
};

type TchangeUserDataFailed = {
  readonly type: typeof CHANGE_USER_DATA_FAILED;
};

export type TuserAction =
  | TregisterUserRequest
  | TregisterUserFailed
  | TregisterUserSuccess
  | TlogInRequest
  | TlogInFailed
  | TlogInSuccess
  | TrequestUserData
  | TfailedUserData
  | TsucessUserData
  | TLogOutRequest
  | TLogOutSuccsess
  | TLogOutFailed
  | TchangeStepRequest
  | TchangeStepSuccess
  | TchangeStepFailed
  | TupdateTokenRequest
  | TupdateTokenSuccess
  | TupdateTokenFailed
  | TchangeUserDataRequest
  | TchangeUserDataSuccess
  | TchangeUserDataFailed;

// акшин креаторы

const registerUserRequest = (): TregisterUserRequest => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

const registerUserFailed = (): TregisterUserFailed => {
  return {
    type: REGISTER_USER_FAILED,
  };
};

const registerUserSuccess = (res: TUserData): TregisterUserSuccess => {
  return {
    type: REGISTER_USER_SUCCESS,
    userData: res,
  };
};

const logInRequest = (): TlogInRequest => {
  return {
    type: LOG_IN_REQUEST,
  };
};

const logInFailed = (): TlogInFailed => {
  return {
    type: LOG_IN_FAILED,
  };
};

const logInSuccess = (res: TUserData): TlogInSuccess => {
  return {
    type: LOG_IN_SUCCESS,
    userData: res,
  };
};

//////////
const requestUserData = (): TrequestUserData => {
  return {
    type: DATA_USER_REQUEST,
  };
};

const failedUserData = (): TfailedUserData => {
  return {
    type: DATA_USER_FAILED,
  };
};

const sucessUserData = (res: TUserData): TsucessUserData => {
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

const changeStepRequest = (): TchangeStepRequest => {
  return {
    type: PASSWORD_CHANGE_STEP_REQUEST,
  };
};

const changeStepSuccess = (): TchangeStepSuccess => {
  return {
    type: PASSWORD_CHANGE_STEP_SUCCESS,
  };
};

const changeStepFailed = (): TchangeStepFailed => {
  return {
    type: PASSWORD_CHANGE_STEP_FAILED,
  };
};

const updateTokenRequest = (): TupdateTokenRequest => {
  return {
    type: UPDATE_TOKEN_REQUEST,
  };
};

const updateTokenSuccess = (res: any): TupdateTokenSuccess => {
  return {
    type: UPDATE_TOKEN_SUCCESS,
    authToken: res.accessToken,
  };
};

const updateTokenFailed = (): TupdateTokenFailed => {
  return {
    type: UPDATE_TOKEN_FAILED,
  };
};

const changeUserDataRequest = (): TchangeUserDataRequest => {
  return {
    type: CHANGE_USER_DATA_REQUEST,
  };
};

const changeUserDataSuccess = (res: any): TchangeUserDataSuccess => {
  return {
    type: CHANGE_USER_DATA_SUCCESS,
    userData: res.user,
  };
};

const changeUserDataFailed = (): TchangeUserDataFailed => {
  return {
    type: CHANGE_USER_DATA_FAILED,
  };
};

// котлеты
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
export function LogIn(email: string, password: string, redirect: () => void) {
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
}

//запрос данных пользователя по access токену
export function fillUserData() {
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
}

// обновление токена для запоминания входа
export function updateToken() {
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
}

// выход из системы
export function logOut() {
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
}

export function passwordChangeStep(email: string, redirect: () => void) {
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
}

//обновление данных пользователя через профиль (с токеном)
export function changeUserData(form: TFormData) {
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
}
