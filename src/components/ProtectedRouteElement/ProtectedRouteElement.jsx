import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { updateToken } from "../../services/actions/user";
import { getCookie } from "../../utils/data";
import PropTypes from "prop-types";

function ProtectedRouteElement({ children, forAuthUser }) {
  const isUserAuth = useSelector((store) => store.user.userIsAuth);
  const isRequest = useSelector((store) => store.user.userDataRequest);
  const dispatch = useDispatch();
  const location = useLocation();

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
    if (isUserAuth) {
      // нельзя открыть логины
      return <Navigate to="/profile" replace state={{ from: location }} />;
    } else {
      return children;
    }
  }

  // для неавторизированного пользователя
  // закрыть доступ к профилю
  if (!forAuthUser) {
    if (!isUserAuth) {
      return <Navigate to="/login" state={{ from: location }} />;
    } else {
      return children;
    }
  }
}

ProtectedRouteElement.propTypes = {
  forAuthUser: PropTypes.bool,
  children: PropTypes.element,
};

export default ProtectedRouteElement;
