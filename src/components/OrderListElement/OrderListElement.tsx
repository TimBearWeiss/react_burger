import styles from "./OrderListElement.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { useTypedSelector } from "../../services/rootReducer";
import { TIngredient, TOrder } from "../../types/types";

type TOrderList = {
  item: TOrder;
  status?: string;
  link: string;
};

const OrderListElement: FC<TOrderList> = ({ item, status, link }) => {
  const location = useLocation();

  const allIngredients = useTypedSelector(
    (store) => store.ingredients.allIngredients
  );

  const [totalPrice, setPrice] = useState(0);
  const [ingredientOrder, setIngredientOrder] = useState<any>(null);
  const [AmountIngredients, setAmountIngredients] = useState(0);

  useEffect(() => {
    let newArray: any = [];

    item.ingredients.forEach((e: string) => {
      newArray.push(
        allIngredients.find((element: TIngredient) => element._id === e)
      );
    });
    const AmountIngredients = newArray.slice(5, item.ingredients.length).length;

    const totalPrice = newArray?.reduce(
      (acc: number, cur: TIngredient) => acc + cur?.price!,
      0
    );

    setPrice(totalPrice);
    setIngredientOrder(newArray);
    setAmountIngredients(AmountIngredients);
  }, []);

  function defineStatus(st: string) {
    if (st === "done") {
      return "Выполнен";
    }
    if (st === "created") {
      return "Создан";
    } else {
      return "Готовится";
    }
  }

  return (
    <Link
      to={`/${link}/${item._id}`}
      state={{ background: location }}
      className={`${styles.orderCell} mr-2 mb-4`}
    >
      <div className={`${styles.head} mt-6 ml-6 mr-6`}>
        <p className="text text_type_digits-default">{item.number}</p>
        <p className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(item.createdAt)} />
        </p>
      </div>
      <h2 className={`${styles.main} text text_type_main-medium mt-6 ml-6`}>
        {item.name}
      </h2>
      {status ? (
        <p
          className={
            status === "done"
              ? `text text_type_main-default ml-6 mt-2 ${styles.doneOrder}`
              : "text text_type_main-default ml-6 mt-2"
          }
        >
          {defineStatus(status)}
        </p>
      ) : null}
      <div className={styles.ingredientCell}>
        <div className={styles.ingredientRow}>
          {ingredientOrder
            ? ingredientOrder.slice(0, 5).map(
                (ingredient: TIngredient, index: number) =>
                  ingredient && (
                    <img
                      className={styles.ingredient}
                      style={{
                        left: `-${index * 20}px`,
                        zIndex: `${5 - index}`,
                      }}
                      alt={ingredient.name}
                      src={ingredient.image_large}
                      key={index}
                    />
                  )
              )
            : null}
          {ingredientOrder && ingredientOrder[5] ? (
            <div
              className={styles.amountCell}
              style={{ left: `-${5 * 20}px`, zIndex: "0" }}
            >
              <div
                className={styles.quantityIngredient}
              >{`+${AmountIngredients}`}</div>
              <img
                className={styles.lastIngredient}
                src={ingredientOrder[5].image}
                alt={ingredientOrder[5].name}
              />
            </div>
          ) : null}
        </div>

        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderListElement;
