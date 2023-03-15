import { Navigate, useLocation, RouteProps } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { FC, ReactComponentElement, ReactElement } from "react";
import { useEffect, ReactNode } from "react";
import { useTypedSelector } from "../../services/rootReducer";

type TProtectedRoute = {
  children?: ReactNode;
  forAuthUser: boolean;
};

const ProtectedRouteElement: FC<TProtectedRoute> = ({
  children,
  forAuthUser,
}) => {
  const isUserAuth = getCookie("accessToken");
  let isRequest = useTypedSelector((store) => store.user.userDataRequest);
  const location = useLocation();

  const from = location.state?.from.pathname || "/";

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
      return <Navigate to={from} />;
    }
  }

  // для неавторизированного пользователя
  // закрыть доступ к профилю
  if (!forAuthUser) {
    if (!isUserAuth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
