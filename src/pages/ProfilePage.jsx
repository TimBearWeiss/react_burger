import { NavLink, Routes, Route } from "react-router-dom";
import styles from "./Pages.module.css";
import { useState, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, deleteCookie } from "../utils/data";
import { logOut } from "../services/actions/user";
import { changeUserData } from "../services/actions/user";

function ProfilePage() {
  const { email, name } = useSelector((store) => store.user.user);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const [nameValue, setName] = useState(name);
  const [emailValue, setEmail] = useState(email);
  const [passwordValue, setPassword] = useState("");

  // сравнение

  const defaultData = [email, name, ""];
  const compareData = [emailValue, nameValue, passwordValue];

  function checkIsChanged(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return true;
    }
    return false;
  }

  useEffect(() => {
    setIsChanged(checkIsChanged(defaultData, compareData));
  }, [emailValue, nameValue, passwordValue]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    dispatch(
      changeUserData("user", accessToken, {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
    setIsChanged(false);
  };

  const resetClick = () => {
    setEmail(email);
    setName(name);
    setPassword("");
  };

  const logOutClick = () => {
    dispatch(logOut("logout", getCookie("token")));
    deleteCookie("token");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "120px",
      }}
    >
      <div
        style={{
          marginRight: "60px",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <NavLink
            end
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-medium  " + styles.linkProfile_active
                : "text text_type_main-medium text_color_inactive " +
                  styles.linkProfile
            }
            to="/profile"
          >
            Профиль
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-medium  " + styles.linkProfile_active
                : "text text_type_main-medium text_color_inactive " +
                  styles.linkProfile
            }
          >
            История заказов
          </NavLink>
          <NavLink
            className={
              "text text_type_main-medium text_color_inactive " +
              styles.linkProfile
            }
            to="/login"
            onClick={logOutClick}
          >
            Выход
          </NavLink>
        </nav>
        <p
          className={
            "text text_type_main-default text_color_inactive mt-20 " +
            styles.signature
          }
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <Routes>
          <Route
            path=""
            element={
              <form onSubmit={saveChanges}>
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  onChange={onChangeName}
                  value={nameValue}
                  name={"name"}
                  size={"default"}
                  extraClass="mb-6"
                  icon="EditIcon"
                  required
                />
                <EmailInput
                  onChange={onChangeEmail}
                  value={emailValue}
                  name={"email"}
                  extraClass="mb-6"
                  icon="EditIcon"
                  required
                />
                <PasswordInput
                  onChange={onChangePassword}
                  value={passwordValue}
                  name={"password"}
                  extraClass="mb-6"
                  icon="EditIcon"
                  required
                />
                {isChanged && (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      type="primary"
                      size="medium"
                      htmlType="submit"
                      style={{ minWidth: "170px" }}
                    >
                      Сохранить
                    </Button>
                    <Button
                      htmlType="reset"
                      onClick={resetClick}
                      type="primary"
                      size="medium"
                      style={{ minWidth: "170px" }}
                    >
                      Отмена
                    </Button>
                  </div>
                )}
              </form>
            }
          />
          <Route
            path="orders"
            element={
              <div style={{ minWidth: "480px", fontSize: "40px" }}>
                В разработке
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default ProfilePage;
