import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  DATA_USER_REQUEST,
  DATA_USER_FAILED,
  DATA_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  PASSWORD_CHANGE_STEP_REQUEST,
  PASSWORD_CHANGE_STEP_SUCCESS,
  PASSWORD_CHANGE_STEP_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILED,
} from "../actions/user";

import { TuserAction } from "../actions/user";

type TUser = {
  registerUserRequest: boolean;
  registerUserFailed: boolean;

  loginUserRequest: boolean;
  loginUserFailed: boolean;

  userDataRequest: boolean;
  userDataFailed: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;

  passwordChangeRequest: boolean;
  passwordChangeFailed: boolean;

  updateTokenRequest: boolean;
  updateTokenFailed: boolean;

  // обновление инфы в профиле
  updateUserDataRequest: boolean;
  updateUserDataFailed: boolean;

  userIsAuth: boolean;

  user: {
    name: string | null;
    email: string | null;
  };
  accessToken: string | null;
  refreshToken: string | null;
};

const defaultState: TUser = {
  registerUserRequest: false,
  registerUserFailed: false,

  loginUserRequest: false,
  loginUserFailed: false,

  userDataRequest: false,
  userDataFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  passwordChangeRequest: false,
  passwordChangeFailed: false,

  updateTokenRequest: false,
  updateTokenFailed: false,

  // обновление инфы в профиле
  updateUserDataRequest: false,
  updateUserDataFailed: false,

  userIsAuth: false,
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  refreshToken: null,
};

export const userReducer = (state = defaultState, action: TuserAction) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, registerUserRequest: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserRequest: false,
        registerUserFailed: false,
        userIsAuth: true,
        user: {
          ...state.user,
          name: action.userData.user.email,
          email: action.userData.user.name,
        },
        accessToken: action.userData.accessToken,
        refreshToken: action.userData.refreshToken,
      };
    case REGISTER_USER_FAILED:
      return { ...state, registerUserRequest: false, registerUserFailed: true };

    case LOG_IN_REQUEST:
      return { ...state, loginUserRequest: true };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: false,
        userIsAuth: true,
        user: {
          ...state.user,
          email: action.userData.user.email,
          name: action.userData.user.name,
        },
        accessToken: action.userData.accessToken,
        refreshToken: action.userData.refreshToken,
      };
    case LOG_IN_FAILED:
      return { ...state, loginUserRequest: false, loginUserFailed: true };

    case DATA_USER_REQUEST:
      return { ...state, userDataRequest: true };
    case DATA_USER_SUCCESS:
      return {
        ...state,
        userDataRequest: false,
        userDataFailed: false,
        userIsAuth: true,
        user: {
          ...state.user,
          email: action.userData.user.email,
          name: action.userData.user.name,
        },
      };
    case DATA_USER_FAILED:
      return { ...state, userDataRequest: false, userDataFailed: true };

    case LOGOUT_REQUEST:
      return { ...state, logoutRequest: true };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        userIsAuth: false,
        user: {
          ...state.user,
          email: null,
          name: null,
        },
        accessToken: null,
        refreshToken: null,
      };
    case LOGOUT_FAILED:
      return { ...state, logoutRequest: false, logoutFailed: true };

    case PASSWORD_CHANGE_STEP_REQUEST:
      return { ...state, passwordChangeRequest: true };
    case PASSWORD_CHANGE_STEP_SUCCESS:
      return {
        ...state,
        passwordChangeRequest: false,
        passwordChangeFailed: false,
      };
    case PASSWORD_CHANGE_STEP_FAILED:
      return {
        ...state,
        passwordChangeRequest: false,
        passwordChangeFailed: true,
      };

    case UPDATE_TOKEN_REQUEST:
      return { ...state, updateTokenRequest: true, userDataRequest: true };
    case UPDATE_TOKEN_SUCCESS:
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: false,
        accessToken: action.authToken,
      };
    case UPDATE_TOKEN_FAILED:
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: true,
        userDataRequest: false,
      };

    case CHANGE_USER_DATA_REQUEST:
      return { ...state, updateUserDataRequest: true };
    case CHANGE_USER_DATA_SUCCESS:
      return {
        ...state,
        updateUserDataRequest: false,
        updateUserDataFailed: false,
        user: {
          ...state.user,
          name: action.userData.name,
          email: action.userData.email,
        },
      };
    case CHANGE_USER_DATA_FAILED:
      return {
        ...state,
        updateUserDataRequest: false,
        updateUserDataFailed: true,
      };

    default:
      return state;
  }
};
