import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Pages.module.css";
import { resetPassword } from "../utils/userApi";

const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();

  const [codeReset, setCodeReset] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeReset(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const ChangePassword = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(password, codeReset)
      .then(() => {
        redirectToLogin();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.cell}>
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
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.loginButton + " mb-20"}
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
};

export default ResetPasswordPage;
