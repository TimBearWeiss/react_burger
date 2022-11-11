import { useEffect, useState } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../IngredientDetail/IngredientDetail.jsx";

function App() {
  const ApiIngredients = "https://norma.nomoreparties.space/api/ingredients";

  const [currentIngredient, setCurrentIngredient] = useState("");

  const openIngredientModal = (evt) => {
    setCurrentIngredient(evt.currentTarget.id);
  };
  const closeIngredientModal = () => {
    setCurrentIngredient("");
  };

  const [CurrentOrder, setCurrentOrder] = useState(false);

  const openOrderModal = () => {
    setCurrentOrder(true);
  };
  const closeOrderModal = () => {
    setCurrentOrder(false);
  };

  const [ingredients, setState] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      return fetch(ApiIngredients)
        .then((res) => res.json())
        .then((data) => setState(data.data))
        .catch((err) => alert(err));
    };
    getIngredients();
  }, [setState]);

  return (
    <>
      <div>
        <AppHeader />
        <main className={appStyle.main}>
          <BurgerIngredients open={openIngredientModal} data={ingredients} />
          <BurgerConstructor open={openOrderModal} data={ingredients} />
        </main>
      </div>
      {currentIngredient && (
        <Modal close={closeIngredientModal} heading={"Детали ингредиента"}>
          <IngredientDetails
            data={ingredients}
            currentIngredient={currentIngredient}
          />
        </Modal>
      )}
      {CurrentOrder && (
        <Modal close={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
