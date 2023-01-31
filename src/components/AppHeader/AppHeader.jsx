import headerStyles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
      <nav className={headerStyles.menu}>
        <ul className={headerStyles.navigation}>
          <li className={headerStyles.list}>
            <NavLink
              className={({ isActive }) =>
                isActive ? headerStyles.active : headerStyles.link
              }
              to={"/"}
            >
              {({ isActive }) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  className={"text text_type_main-default m-1"}
                >
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    Конструктор
                  </p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={headerStyles.list}>
            <NavLink
              className={({ isActive }) =>
                isActive ? headerStyles.active : headerStyles.link
              }
              to={"/feed"}
            >
              {({ isActive }) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  className={"text text_type_main-default m-1"}
                >
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    Лента заказов
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
        <ul className={headerStyles.profile}>
          <li className={headerStyles.list}>
            <NavLink
              className={({ isActive }) =>
                isActive ? headerStyles.active : headerStyles.link
              }
              to={"/profile"}
            >
              {({ isActive }) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  className={"text text_type_main-default m-1"}
                >
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    Личный кабинет
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
