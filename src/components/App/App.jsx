import { React, useEffect, useState } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";

function App() {
  const ApiIngredients = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);

  useEffect(() => {
    const getInfo = () => {
      return fetch(ApiIngredients)
        .then((res) => res.json())
        .then((data) => setData(data.data));
    };
    getInfo();
  }, [setData]);

  // console.log(data)

  return (
    <div>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
