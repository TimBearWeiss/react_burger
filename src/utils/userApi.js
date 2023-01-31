import { checkResponse } from "./data";
import { BASE_URL } from "./api";
const BASE_USER_URL = "https://norma.nomoreparties.space/api/auth";

const getNewUser = async (url, formData) => {
  return await fetch(`${BASE_USER_URL}/${url}`, {
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

const logIn = async (url, email, password) => {
  return await fetch(`${BASE_USER_URL}/${url}`, {
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

const getUserData = async (url, token) => {
  return await fetch(`${BASE_USER_URL}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(checkResponse);
};

const userLogOut = async (url, token) => {
  return await fetch(`${BASE_USER_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse);
};

const sendCode = async (url, email) => {
  return await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

const resetPassword = async (url, password, token) => {
  return await fetch(`${BASE_URL}/${url}`, {
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

const getNewAuthToken = async (url, token) => {
  return await fetch(`${BASE_USER_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse);
};

const updateUserData = async (url, token, form) => {
  return await fetch(`${BASE_USER_URL}/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export {
  getNewUser,
  logIn,
  getUserData,
  userLogOut,
  sendCode,
  resetPassword,
  getNewAuthToken,
  updateUserData,
};
