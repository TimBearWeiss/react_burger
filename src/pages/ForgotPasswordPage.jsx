import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./Pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passwordChangeStep } from "../services/actions/user";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const redirectToResetPassword = () => {
    navigate("/reset-password");
  };

  const recoverPassword = (e) => {
    e.preventDefault();
    dispatch(passwordChangeStep(email, redirectToResetPassword));
  };

  return (
    <div className={styles.cell}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form onSubmit={recoverPassword}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          extraClass="mb-6"
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.forgotButton + " mb-20"}
        >
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link className={styles.link} to={"/login"}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;

// восстановление пароля, поиск e-mail в базе
