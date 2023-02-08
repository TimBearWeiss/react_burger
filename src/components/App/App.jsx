import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import OrderListPage from "../../pages/OrderListPage";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import IngredientInfoPage from "../../pages/IngredientInfoPage";
import NotFoundPage from "../../pages/NotFoundPage";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetail/IngredientDetail";
import { getAllIngredients } from "../../services/actions/ingredients";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CurrentOrderPage from "../../pages/CurrentOrderPage";
import CurrentOrderInModal from "../CurrentOrderInModal/CurrentOrderInModal";
import CurrentOrderInModalProfile from "../CurrentOrderInModalProfile/CurrentOrderInModalProfile";
import CurrentOrderPageInProfile from "../../pages/CurrentOrderPageProfile";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsAction";
import { WS_URL } from "../../utils/api";
import { fillUserData } from "../../services/actions/user";

function App() {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllIngredients("ingredients"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fillUserData());
  }, []);

  // gtql; bp ghjabkz
  const allOrders = useSelector((store) => store.orderFeed.allOrders);

  // fsfghlafgdfg

  const allIngredients = useSelector(
    (store) => store.ingredients.allIngredients
  );

  const currentIngredient = useSelector(
    (store) => store.ingredientsDetailModal.currentIngredient
  );
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  function goBack() {
    navigate(-1);
  }
  return (
    <>
      <AppHeader />
      <main className={appStyle.main}>
        {allIngredients && (
          <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <ProtectedRouteElement forAuthUser={true}>
                  <LoginPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteElement forAuthUser={true}>
                  <RegisterPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement forAuthUser={true}>
                  <ForgotPasswordPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement forAuthUser={true}>
                  <ResetPasswordPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/profile/*"
              element={
                <ProtectedRouteElement forAuthUser={false}>
                  <ProfilePage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <ProtectedRouteElement forAuthUser={false}>
                  <CurrentOrderPageInProfile accessToken={accessToken} />
                </ProtectedRouteElement>
              }
            />

            <Route path="/feed" element={<OrderListPage link={"feed"} />} />
            <Route path="/feed/:id" element={<CurrentOrderPage />} />
            <Route path="/ingredients/:id" element={<IngredientInfoPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        )}

        {background && allIngredients && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal close={goBack} heading={"Детали ингредиента"}>
                  <IngredientDetails allIngredients={allIngredients} />
                </Modal>
              }
            />
          </Routes>
        )}

        {background && (
          <Routes>
            <Route
              path="/feed/:id"
              element={
                <Modal close={goBack}>
                  <CurrentOrderInModal allIngredients={allIngredients} />
                </Modal>
              }
            />
          </Routes>
        )}
        {background && (
          <Routes>
            <Route
              path="/profile/orders/:id"
              element={
                <Modal close={goBack}>
                  <CurrentOrderInModalProfile
                    allOrders={allOrders}
                    allIngredients={allIngredients}
                  />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
