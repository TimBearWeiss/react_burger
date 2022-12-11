import headerStyles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
      <nav className={headerStyles.menu}>
        <ul className={headerStyles.navigation}>
          <li className={headerStyles.list}>
            <a className={headerStyles.link} href={"#"}>
              <BurgerIcon type="main" />
              <p
                className={`${headerStyles.active} text text_type_main-default  m-1`}
              >
                Конструктор
              </p>
            </a>
          </li>
          <li className={headerStyles.list}>
            <a className={headerStyles.link} href={"#"}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive m-1">
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
        <ul className={headerStyles.profile}>
          <li className={headerStyles.list}>
            <a className={headerStyles.link} href={"#"}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive m-1">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
