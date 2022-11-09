import { React, useEffect, useState } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";

function App() {
  const ApiIngredients = "https://norma.nomoreparties.space/api/ingredients";

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
    <div>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
    </div>
  );
}

export default App;
