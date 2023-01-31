import React, { useRef } from "react";
import IngredientStyle from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useCallback } from "react";
import { GET_CURRENT_INGREDIENT } from "../../services/actions/ingredientDetailsModal";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = () => {
  // получаем все ингредиенты
  const dispatch = useDispatch();

  const allIngredients = useSelector(
    (store) => store.ingredients.allIngredients
  );

  // модальное окно

  const currentIngredient = useSelector(
    (store) => store.ingredientsDetailModal.currentIngredient
  );

  const closeIngredientModal = useCallback(() => {
    dispatch({ type: GET_CURRENT_INGREDIENT, item: null });
  }, [dispatch, null]);

  // находим игредиенты

  const buns = useMemo(() => {
    return allIngredients.filter((data) => data.type === "bun");
  });

  const sauces = useMemo(() => {
    return allIngredients.filter((data) => data.type === "sauce");
  });

  const fillings = useMemo(() => {
    return allIngredients.filter((data) => data.type === "main");
  });

  //функция таба по клику
  const [current, setCurrent] = React.useState("one");

  const handleTabClick = (value) => {
    setCurrent(value);
    document
      .querySelector(`#${value}`)
      .scrollIntoView({ block: "start", behavior: "smooth" });
  };

  // продолжение работы таба

  const [bunsRef, bunsInView] = useInView({ threshold: 0 });
  const [sausesRef, sausesInView] = useInView({ threshold: 0 });
  const [mainRef, mainInView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (bunsInView) {
      setCurrent("one");
    } else if (sausesInView) {
      setCurrent("two");
    } else if (mainInView) {
      setCurrent("three");
    }
  }, [bunsInView, sausesInView, mainInView]);

  // конец

  return (
    <section className={IngredientStyle.section}>
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
        <h2
          ref={bunsRef}
          id="one"
          className="text text_type_main-medium mt-10 mb-1"
        >
          Булки
        </h2>
        <div className={IngredientStyle.box}>
          {buns.map((item) => (
            <Ingredient item={item} key={item._id} />
          ))}
        </div>
        <h2
          ref={sausesRef}
          id="two"
          className="text text_type_main-medium mt-10 mb-1"
        >
          Соусы
        </h2>
        <div className={IngredientStyle.box}>
          {sauces.map((item) => (
            <Ingredient item={item} key={item._id} />
          ))}
        </div>
        <h2
          ref={mainRef}
          id="three"
          className="text text_type_main-medium mt-10 mb-1"
        >
          Начинки
        </h2>
        <div className={IngredientStyle.box}>
          {fillings.map((item) => (
            <Ingredient item={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
