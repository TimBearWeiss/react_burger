import React from "react";
import IngredientStyle from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetail/IngredientDetail.jsx";

const BurgerIngredients = ({ data }) => {
  //функция таба
  const [current, setCurrent] = React.useState("one");

  // модальное окно

  const [currentIngredient, setCurrentIngredient] = React.useState("");

  const openIngredientModal = (evt) => {
    setCurrentIngredient(evt.currentTarget.id);
  };
  const closeIngredientModal = () => {
    setCurrentIngredient("");
  };

  // находим игредиенты

  const ingredient = data.filter((item) => item._id === currentIngredient);
  // почему-то при использовании find все ломается, filter же работает
  const buns = data.filter((data) => data.type === "bun");
  const sauces = data.filter((data) => data.type === "sauce");
  const fillings = data.filter((data) => data.type === "main");

  return (
    <section className={IngredientStyle.section}>
      {currentIngredient && (
        <Modal close={closeIngredientModal} heading={"Детали ингредиента"}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
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
              open={openIngredientModal}
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
              open={openIngredientModal}
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
              open={openIngredientModal}
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
