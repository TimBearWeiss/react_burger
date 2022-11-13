import React from "react";
import IngredientStyle from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient";

const BurgerIngredients = ({ data, open }) => {
  const [current, setCurrent] = React.useState("one");

  const buns = data.filter((data) => data.type === "bun");
  const sauces = data.filter((data) => data.type === "sauce");
  const fillings = data.filter((data) => data.type === "main");

  return (
    <section className={IngredientStyle.section}>
      <h1 className="text text_type_main-large mb-3">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={IngredientStyle.scroll}>
        <h2 className="text text_type_main-medium mt-10 mb-1">Булки</h2>
        <div className={IngredientStyle.box}>
          {buns.map((item) => (
            <Ingredient
              key={item._id}
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
              open={open}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-1">Соусы</h2>
        <div className={IngredientStyle.box}>
          {sauces.map((item) => (
            <Ingredient
              id={item._id}
              key={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
              open={open}
            />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-1">Начинки</h2>
        <div className={IngredientStyle.box}>
          {fillings.map((item) => (
            <Ingredient
              id={item._id}
              key={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
              open={open}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  open: PropTypes.func,
};

export default BurgerIngredients;
