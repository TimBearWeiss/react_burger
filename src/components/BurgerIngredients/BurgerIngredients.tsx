import IngredientStyle from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import React, { useEffect, useMemo, FC } from "react";
import { useInView } from "react-intersection-observer";
import Ingredients from "../Ingredient/Ingredient";
import { useTypedSelector } from "../../services/rootReducer";
import { TIngredient } from "../../types/types";

const BurgerIngredients: FC = () => {
  // получаем все ингредиенты

  const allIngredients = useTypedSelector(
    (store) => store.ingredients.allIngredients
  );

  // находим игредиенты

  const buns = useMemo(() => {
    return allIngredients.filter((data: TIngredient) => data.type === "bun");
  }, [allIngredients]);

  const sauces = useMemo(() => {
    return allIngredients.filter((data: TIngredient) => data.type === "sauce");
  }, [allIngredients]);

  const fillings = useMemo(() => {
    return allIngredients.filter((data: TIngredient) => data.type === "main");
  }, [allIngredients]);

  //функция таба по клику
  const [current, setCurrent] = React.useState("one");

  const handleTabClick = (value: string) => {
    setCurrent(value);

    const test = document.querySelector<HTMLElement>(`#${value}`);
    test?.scrollIntoView({ block: "start", behavior: "smooth" });
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
          {buns.map((item: TIngredient) => (
            <Ingredients item={item} key={item._id} />
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
          {sauces.map((item: TIngredient) => (
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
          {fillings.map((item: TIngredient) => (
            <Ingredient item={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
