import React from "react";
import Ingredient from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Ingredients = (props) => {
  return (
    <div className={Ingredient.box}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={props.image} />
      <div className={Ingredient.price}>
        <p className="text text_type_digits-default mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{props.name}</p>
    </div>
  );
};

Ingredients.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
};

export default Ingredients;
