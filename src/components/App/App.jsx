import { useEffect, useState } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";

import { getIngredients } from "../../utils/api.js";

function App() {
  // получаем ингредиенты из api
  const [ingredients, setIngredients] = useState([]);

  const ApiIngredients = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    getIngredients(ApiIngredients).then((data) => setIngredients(data.data));
  }, [setIngredients]);

  return (
    <>
      <div>
        <AppHeader />
        <main className={appStyle.main}>
          <BurgerIngredients data={ingredients} />
          <BurgerConstructor data={ingredients} />
        </main>
      </div>
    </>
  );
}

export default App;
