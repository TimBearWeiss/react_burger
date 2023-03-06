import Ingredient from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useTypedSelector } from "../../services/rootReducer";
import { useCallback, useMemo, FC } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../types/types";
import { getCurrentIngredient } from "../../services/actions/ingredientDetailsModal";

type TIngredients = {
  item: TIngredient;
};

const Ingredients: FC<TIngredients> = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const chosenElements = useTypedSelector(
    (store) => store.burgerConstructor.constructorIngredients
  ).filter((el: TIngredient) => item._id === el._id);

  const buns = useTypedSelector(
    (store) => store.burgerConstructor.constructorBuns
  );

  const openModal = useCallback(() => {
    dispatch(getCurrentIngredient(item));
  }, [dispatch, item]);

  // перетаскивание
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  // функционал счетчика
  const count = useMemo(() => {
    if (item.type === "bun") {
      return buns && buns[0]?._id === item._id ? 2 : 0;
    }
    return chosenElements.length;
  }, [item, buns, chosenElements]);

  // конец

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      ref={dragRef}
      onClick={openModal}
      className={`${Ingredient.box}`}
      id={item.id}
    >
      {count === 0 ? null : (
        <Counter count={count} size="default" extraClass="m-1" />
      )}

      <img src={item.image} alt={item.name} />
      <div className={Ingredient.price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{item.name}</p>
    </Link>
  );
};

Ingredients.propTypes = {};

export default Ingredients;
