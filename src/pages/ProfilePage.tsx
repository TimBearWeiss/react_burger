import { NavLink, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Pages.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie } from "../utils/cookie";
import { logOut, changeUserData } from "../services/actions/user";
import StoryList from "../components/StoryList/StoryList";
import { useTypedSelector } from "../services/rootReducer";
import { AppDispatch } from "../types/types";

const ProfilePage = () => {
  const { email, name } = useTypedSelector((store) => store.user.user);
  const allOrders = useTypedSelector((store) =>
    store.orderFeed.allOrders.reverse()
  );

  const dispatch: any = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const [nameValue, setName] = useState(name);
  const [emailValue, setEmail] = useState(email);
  const [passwordValue, setPassword] = useState("");

  // сравнение
  const defaultData = [email, name, ""];
  const compareData = [emailValue, nameValue, passwordValue];

  function checkIsChanged(arr1: Array<string>, arr2: Array<string>) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return true;
    }
    return false;
  }

  useEffect(() => {
    setIsChanged(checkIsChanged(defaultData, compareData));
  }, [emailValue, nameValue, passwordValue]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const saveChanges = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      changeUserData({
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
    dispatch(logOut());
    deleteCookie("token");
  };

  return (
    <div className={styles.profileCell}>
      <div className={styles.columnLinks}>
        <nav className={styles.nav}>
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
              <form style={{ minWidth: "596px" }} onSubmit={saveChanges}>
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  onChange={onChangeName}
                  value={nameValue}
                  name={"name"}
                  size={"default"}
                  extraClass="mb-6"
                  required
                />
                <EmailInput
                  onChange={onChangeEmail}
                  value={emailValue}
                  name={"email"}
                  extraClass="mb-6"
                  required
                />
                <PasswordInput
                  onChange={onChangePassword}
                  value={passwordValue}
                  name={"password"}
                  extraClass="mb-6"
                  icon="EditIcon"
                  autoComplete="on"
                  required
                />
                {isChanged && (
                  <div
                    style={{
                      maxWidth: "480px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
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
          <Route path="orders" element={<StoryList allOrders={allOrders} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;
