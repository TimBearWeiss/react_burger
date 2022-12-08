import React from "react";
import IngredientStyle from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetail/IngredientDetail.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getAllIngredients } from "../../services/actions/actions";
import { useCallback } from "react";
import { GET_CURRENT_INGREDIENT } from "../../services/actions/actions";

const BurgerIngredients = () => {
  // получаем все ингредиенты
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllIngredients("ingredients"));
  }, [dispatch]);

  const allIngredients = useSelector(
    (store) => store.ingredients.allIngredients
  );

  // модальное окно

  const currentIngredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );

  const closeIngredientModal = useCallback(() => {
    dispatch({ type: GET_CURRENT_INGREDIENT, item: null });
  }, [dispatch, null]);

  // находим игредиенты

  const buns = allIngredients.filter((data) => data.type === "bun");
  const sauces = allIngredients.filter((data) => data.type === "sauce");
  const fillings = allIngredients.filter((data) => data.type === "main");

  //функция таба по клику
  const [current, setCurrent] = React.useState("one");

  const handleTabClick = (value) => {
    setCurrent(value);
    document
      .querySelector(`#${value}`)
      .scrollIntoView({ block: "start", behavior: "smooth" });
  };

  // продолжение работы таба

  const options = {
    root: document.querySelector("#burgerscroll"),
    rootMargin: "0px 0px -700px 0px",
    threshold: 0.1,
  };

  function callbackThree(entries) {
    if (entries[0].isIntersecting && entries[0].time > 1000) {
      setCurrent("three");
    }
  }

  function callbackTwo(entries) {
    if (entries[0].isIntersecting && entries[0].time > 1000) {
      setCurrent("two");
    }
  }

  function callbackOne(entries) {
    if (entries[0].isIntersecting && entries[0].time > 1000) {
      setCurrent("one");
    }
  }

  const observer3 = new IntersectionObserver(callbackThree, options);

  const observer2 = new IntersectionObserver(callbackTwo, options);

  const observer1 = new IntersectionObserver(callbackOne, options);

  useEffect(() => {
    const target = document.querySelector("#three");

    observer3.observe(target);
  }, []);

  useEffect(() => {
    const target = document.querySelector("#two");

    observer2.observe(target);
  }, []);

  useEffect(() => {
    const target = document.querySelector("#one");

    observer1.observe(target);
  }, []);
  // конец

  return (
    <section className={IngredientStyle.section}>
      {currentIngredient && (
        <Modal close={closeIngredientModal} heading={"Детали ингредиента"}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      <h1 className="text text_type_main-large mb-3">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div id={"burgerscroll"} className={IngredientStyle.scroll}>
        <h2 id="one" className="text text_type_main-medium mt-10 mb-1">
          Булки
        </h2>
        <div className={IngredientStyle.box}>
          {buns.map((item) => (
            <Ingredient
              item={item}
              key={item._id}
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          ))}
        </div>
        <h2 id="two" className="text text_type_main-medium mt-10 mb-1">
          Соусы
        </h2>
        <div className={IngredientStyle.box}>
          {sauces.map((item) => (
            <Ingredient
              item={item}
              id={item._id}
              key={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          ))}
        </div>
        <h2 id="three" className="text text_type_main-medium mt-10 mb-1">
          Начинки
        </h2>
        <div className={IngredientStyle.box}>
          {fillings.map((item) => (
            <Ingredient
              item={item}
              id={item._id}
              key={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
