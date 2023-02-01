import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Pages.module.css";
import { registerUser } from "../services/actions/user";

function RefisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameValue, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const redirectInProfile = () => {
    navigate("/profile");
  };

  const registrationUser = (e) => {
    e.preventDefault();
    const formData = {
      name: nameValue,
      email: email,
      password: password,
    };
    dispatch(registerUser("register", formData, redirectInProfile));
  };

  return (
    <div className={styles.cell}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form onSubmit={registrationUser}>
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
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.loginButton + " mb-20"}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RefisterPage;
