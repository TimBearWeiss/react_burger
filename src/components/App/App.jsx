import { useEffect, useState } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetail/IngredientDetail.jsx";
import { getIngredients } from "../../utils/api.js";

function App() {
  const ApiIngredients = "https://norma.nomoreparties.space/api/ingredients";

  const [currentIngredient, setCurrentIngredient] = useState("");

  const openIngredientModal = (evt) => {
    setCurrentIngredient(evt.currentTarget.id);
  };
  const closeIngredientModal = () => {
    setCurrentIngredient("");
  };

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients(ApiIngredients).then((data) => setIngredients(data.data));
  }, [setIngredients]);

  return (
    <>
      <div>
        <AppHeader />
        <main className={appStyle.main}>
          <BurgerIngredients open={openIngredientModal} data={ingredients} />
          <BurgerConstructor data={ingredients} />
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
    </>
  );
}

export default App;
