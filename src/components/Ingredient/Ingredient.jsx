import React from "react";
import Ingredient from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Ingredients = ({ name, image, price, open, id }) => {
  return (
    <div className={Ingredient.box} onClick={open} id={id}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={image} alt={name} />
      <div className={Ingredient.price}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{name}</p>
    </div>
  );
};

Ingredients.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  open: PropTypes.func,
  id: PropTypes.string,
};

export default Ingredients;
