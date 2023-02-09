import { WS_URL } from "../../utils/api";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "../CurrentOrderInModal/CurrentOrderInModal.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
function InfoOrder({ currentOrder }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}/all`));

    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  const allIngredients = useSelector(
    (store) => store.ingredients.allIngredients
  );

  const [totalPrice, setPrice] = useState(0);
  const [ingredientOrder, setIngredientOrder] = useState(null);

  useEffect(() => {
    const newArray = [];

    currentOrder.ingredients.forEach((e) => {
      newArray.push(allIngredients.find((element) => element._id === e));
    });

    const totalPrice = newArray.reduce((acc, cur) => acc + cur.price, 0);
    setPrice(totalPrice);
    setIngredientOrder(newArray);
  }, []);

  function defineStatus(st) {
    if (st === "done") {
      return "Выполнен";
    }
    if (st === "created") {
      return "Создан";
    } else {
      return "Готовится";
    }
  }

  // считаем сколько одинаковых

  const uniqueIngredients = currentOrder?.ingredients.filter(
    (element, index) => {
      return currentOrder.ingredients.indexOf(element) === index;
    }
  );

  console.log(uniqueIngredients);

  function counter(arr, index) {
    return arr.filter((item) => item == index).length;
  }
  return (
    <>
      {" "}
      <p className={`text text_type_digits-default mb-10`}>
        #{currentOrder.number}
      </p>
      <h2 className={`${styles.orderName} text text_type_main-medium mb-6`}>
        {currentOrder.name}
      </h2>
      <p
        className={
          currentOrder.status === "done"
            ? `text text_type_main-default mt-2 ${styles.doneOrder}`
            : "text text_type_main-default mt-2"
        }
      >
        {defineStatus(currentOrder.status)}
      </p>
      <h3 className={`text text_type_main-medium mt-15 mb-3`}>Состав:</h3>
      <div className={styles.orderScroll}>
        {uniqueIngredients.map((item) => {
          const ingredientInfo = allIngredients.find(
            (ingredient) => ingredient._id === item
          );
          return (
            <div className={styles.ingredientElement} key={ingredientInfo._id}>
              <div className={styles.row}>
                <img
                  className={styles.ingredient}
                  alt={ingredientInfo.name}
                  src={ingredientInfo.image}
                  key={ingredientInfo._id}
                />
                <p className={`text text_type_main-default ml-4`}>
                  {ingredientInfo.name}
                </p>
              </div>
              <div className={styles.row}>
                <p className={`text text_type_digits-default mr-2`}>
                  {counter(currentOrder.ingredients, item)} x
                  {ingredientInfo.price}
                </p>
                <CurrencyIcon />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.footerModal}>
        <p className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(currentOrder.createdAt)} />
        </p>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default mr-2">{totalPrice} </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>{" "}
    </>
  );
}

export default InfoOrder;