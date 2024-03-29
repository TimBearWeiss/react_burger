import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "../services/rootReducer";
import React, { FC } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Pages.module.css";
import { LogIn } from "../services/actions/user";

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const redirectInHome = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

  // Вход
  const loginClickHandle = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LogIn(email, password, redirectInHome));
  };

  return (
    <div className={styles.cell}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form onSubmit={loginClickHandle}>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          extraClass="mb-6"
          required
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
          extraClass="mb-6"
          autoComplete="on"
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.loginButton + " mb-20"}
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь?{" "}
        <Link to={"/register"} className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link className={styles.link} to={"/forgot-password"}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
