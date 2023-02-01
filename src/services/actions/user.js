import {
  getNewUser,
  logIn,
  getUserData,
  userLogOut,
  sendCode,
  getNewAuthToken,
  updateUserData,
} from "../../utils/userApi";

import { setCookie } from "../../utils/data";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";

export const DATA_USER_REQUEST = "DATA_USER_REQUEST";
export const DATA_USER_SUCCESS = "DATA_USER_SUCCESS";
export const DATA_USER_FAILED = "DATA_USER_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const PASSWORD_CHANGE_STEP_REQUEST = "PASSWORD_CHANGE_STEP_REQUEST";
export const PASSWORD_CHANGE_STEP_SUCCESS = "PASSWORD_CHANGE_STEP_SUCCESS";
export const PASSWORD_CHANGE_STEP_FAILED = "PASSWORD_CHANGE_STEP_FAILED";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export const CHANGE_USER_DATA_REQUEST = "CHANGE_USER_DATA_REQUEST";
export const CHANGE_USER_DATA_SUCCESS = "CHANGE_USER_DATA_SUCCESS";
export const CHANGE_USER_DATA_FAILED = "CHANGE_USER_DATA_FAILED";

export function registerUser(url, formData, redirect) {
  return function (dispatch) {
    dispatch({ type: REGISTER_USER_REQUEST });
    getNewUser(url, formData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_USER_SUCCESS,
            userData: res,
          });
          setCookie("token", res.refreshToken);
        } else {
          dispatch({ type: REGISTER_USER_FAILED });
        }
      })
      .then(redirect)
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: REGISTER_USER_FAILED });
      });
  };
}

// вход в систему
export function LogIn(url, email, password, redirect) {
  return function (dispatch) {
    dispatch({ type: LOG_IN_REQUEST });
    logIn(url, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOG_IN_SUCCESS,
            userData: res,
          });
          setCookie("token", res.refreshToken);
        } else {
          dispatch({ type: LOG_IN_FAILED });
        }
      })
      .then(redirect)
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: LOG_IN_FAILED });
      });
  };
}

export function fillUserData(url, token) {
  return function (dispatch) {
    dispatch({ type: DATA_USER_REQUEST });
    getUserData(url, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: DATA_USER_SUCCESS,
            userData: res,
          });
        } else {
          dispatch({ type: DATA_USER_FAILED });
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: DATA_USER_FAILED });
      });
  };
}

// выход из системы

export function logOut(url, token) {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    userLogOut(url, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: LOGOUT_SUCCESS });
          console.log(res);
        } else {
          dispatch({ type: LOGOUT_FAILED });
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: LOGOUT_FAILED });
      });
  };
}

export function passwordChangeStep(email, redirect) {
  return function (dispatch) {
    dispatch({ type: PASSWORD_CHANGE_STEP_REQUEST });
    sendCode("password-reset", email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: PASSWORD_CHANGE_STEP_SUCCESS });
          redirect();
        } else {
          dispatch({ type: PASSWORD_CHANGE_STEP_FAILED });
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: PASSWORD_CHANGE_STEP_FAILED });
      });
  };
}
// обновление токена для запоминания входа
export function updateToken(url, token) {
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    getNewAuthToken(url, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
            authToken: res.accessToken,
          });
          dispatch(fillUserData("user", res.accessToken));
          setCookie("token", res.refreshToken);
        } else {
          dispatch({ type: UPDATE_TOKEN_FAILED });
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: UPDATE_TOKEN_FAILED });
      });
  };
}

export function changeUserData(url, token, form) {
  return function (dispatch) {
    dispatch({ type: CHANGE_USER_DATA_REQUEST });
    updateUserData(url, token, form)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: CHANGE_USER_DATA_SUCCESS, userData: res.user });
          dispatch(fillUserData("user", token));
        } else {
          dispatch({ type: CHANGE_USER_DATA_FAILED });
        }
      })
      .catch((err) => {
        console.log("Произошла ошибка :", err);
        dispatch({ type: CHANGE_USER_DATA_FAILED });
      });
  };
}
