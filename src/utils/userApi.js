import { checkResponse } from "./data";
import { BASE_URL } from "./api";
import { getCookie } from "./data";
const BASE_USER_URL = "https://norma.nomoreparties.space/api";

//регистрация пользователя
const postNewUserInfo = async (formData) => {
  return await fetch(`${BASE_USER_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }),
  }).then(checkResponse);
};

//логин
const logIn = async (email, password) => {
  return await fetch(`${BASE_USER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

//получить данные пользователя по токену
const getUserData = async () => {
  return await fetch(`${BASE_USER_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then(checkResponse);
};

//логаут
const userLogOut = async () => {
  return await fetch(`${BASE_USER_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
};

//отправить код подтверждения на почту
const sendCode = async (email) => {
  return await fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

//сборс пароля по токену подтверждения из почты
const resetPassword = async (password, token) => {
  return await fetch(`${BASE_URL}/password-reset/reset}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse);
};

//обновить токен
const getNewAuthToken = async () => {
  return await fetch(`${BASE_USER_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
};

//обновление данных пользователя (с токеном)
const updateUserData = async (form) => {
  return await fetch(`${BASE_USER_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export {
  postNewUserInfo,
  logIn,
  getUserData,
  userLogOut,
  sendCode,
  resetPassword,
  getNewAuthToken,
  updateUserData,
};
