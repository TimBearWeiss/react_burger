import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
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
