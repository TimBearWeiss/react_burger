import React from "react";
import Ingredient from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { GET_CURRENT_INGREDIENT } from "../../services/actions/actions";
import { useCallback, useMemo } from "react";

const Ingredients = ({ name, image, price, id, item }) => {
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    dispatch({ type: GET_CURRENT_INGREDIENT, item: item });
  }, [dispatch, item]);

  return (
    <div onClick={openModal} className={Ingredient.box} id={id}>
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
