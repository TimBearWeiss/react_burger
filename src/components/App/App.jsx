import { useEffect, useState } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import { IngredientsContest } from "../../services/ingredientsContext.js";
import { getIngredients } from "../../utils/api.js";

function App() {
  // получаем ингредиенты из api
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients("ingredients")
      .then((data) => setIngredients(data.data))
      .catch((err) => alert(`Ошибка: ${err.status}`));
  }, [setIngredients]);

  return (
    <>
      <AppHeader />
      <main className={appStyle.main}>
        <IngredientsContest.Provider value={{ ingredients, setIngredients }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsContest.Provider>
      </main>
    </>
  );
}

export default App;
