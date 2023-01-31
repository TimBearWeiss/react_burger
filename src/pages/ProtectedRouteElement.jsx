import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { updateToken } from "../services/actions/user";
import { getCookie } from "../utils/data";

function ProtectedRouteElement({ children, forAuthUser }) {
  const isUserAuth = useSelector((store) => store.user.userIsAuth);
  const isRequest = useSelector((store) => store.user.userDataRequest);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(`Произведен ли вход ${isUserAuth}`);

  useEffect(() => {
    const token = getCookie("token");
    if (token && !isUserAuth) {
      dispatch(updateToken("token", getCookie("token")));
    } else {
      console.log("Токен не найден");
    }
  }, []);

  if (isRequest)
    return (
      <p className="text text_type_main-medium text_color_inactive mt-30">
        Загрузка...
      </p>
    );

  // для авторизированного пользователя
  // закрыть доступ к логинам
  if (forAuthUser) {
    console.log("работает первое условие ");
    if (isUserAuth) {
      // нельзя открыть логины
      console.log("it works1");
      return <Navigate to="/profile" replace state={{ from: location }} />;
    }
    if (!isUserAuth) {
      console.log("it works2");
      return children;
    } else {
      console.log("ничего не случилось");
    }
  }

  // для неавторизированного пользователя
  // закрыть доступ к профилю
  if (!forAuthUser) {
    console.log("работает второе условие ");
    if (!isUserAuth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    if (isUserAuth) {
      return children;
    } else {
      console.log("ничего не случилось");
    }
  } else {
    return children;
  }
}

export default ProtectedRouteElement;
