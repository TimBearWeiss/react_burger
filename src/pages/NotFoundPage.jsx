import { Link } from "react-router-dom";
import styles from "./Pages.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFoundCell}>
      <h2 className="text text_type_digits-large">404</h2>
      <p className="text text_type_main-large">Страница не найдена</p>
      <Link
        to={"/"}
        className="text text_type_main-medium text_color_inactive mt-15"
      >
        Перейти в меню
      </Link>
    </div>
  );
}

export default NotFoundPage;
