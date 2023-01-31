import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Pages.module.css";
import { useDispatch } from "react-redux";
import { resetPassword } from "../utils/userApi";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [codeReset, setCodeReset] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChangeName = (e) => {
    setCodeReset(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const ChangePassword = (e) => {
    e.preventDefault();
    resetPassword("password-reset/reset", password, codeReset)
      .then(() => {
        redirectToLogin();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "180px",
      }}
    >
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form onSubmit={ChangePassword}>
        <PasswordInput
          onChange={onChangePassword}
          placeholder={"Введите новый пароль"}
          value={password}
          name={"password"}
          extraClass="mb-6"
          required
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChangeName}
          value={codeReset}
          name={"name"}
          size={"default"}
          extraClass="mb-6"
          required
        />
        <Button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "auto",
            marginLeft: "auto",
          }}
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
