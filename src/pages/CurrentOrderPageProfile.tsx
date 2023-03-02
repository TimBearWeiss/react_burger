import { useParams } from "react-router-dom";
import { useDispatch } from "../services/rootReducer";
import { useEffect } from "react";
import { WS_URL } from "../utils/api";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../components/CurrentOrderInModal/CurrentOrderInModal.module.css";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsAction";
import { getCookie } from "../utils/cookie";
import { useTypedSelector } from "../services/rootReducer";
import { TIngredient, TOrder } from "../types/types";
import { FC } from "react";

const CurrentOrderPageInProfile: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    {
      dispatch(
        wsConnectionStart(`${WS_URL}?token=${getCookie("accessToken")}`)
      );
    }

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const allIngredients = useTypedSelector(
    (store) => store.ingredients.allIngredients
  );
  const allOrders = useTypedSelector((store) =>
    store.orderFeed.allOrders.reverse()
  );
  const currentOrder = allOrders.find((item: TOrder) => item._id === id);

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

  const uniqueIngredients = currentOrder?.ingredients
    .filter((element: string, index: number) => {
      return currentOrder.ingredients.indexOf(element) === index;
    })
    .reverse();

  function counter(arr: Array<string>, index: string) {
    return arr.filter((item) => item == index).length;
  }

  const orderIngredients = currentOrder?.ingredients.map((item: string) =>
    allIngredients.find((data: TIngredient) => data._id === item)
  );

  const totalPrice = orderIngredients?.reduce(
    (previous, current) => previous + current?.price!,
    0
  );

  return (
    <>
      {!currentOrder ? (
        <p>Загрузка</p>
      ) : (
        <div style={{ maxWidth: "640px", marginTop: "120px" }}>
          {" "}
          <p
            style={{ textAlign: "center" }}
            className={`text text_type_digits-default mb-10`}
          >
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
            {uniqueIngredients &&
              uniqueIngredients.map((item: string) => {
                const ingredientInfo = allIngredients.find(
                  (ingredient: TIngredient) => ingredient._id === item
                );
                return (
                  <>
                    {ingredientInfo && (
                      <div
                        className={styles.ingredientElement}
                        key={ingredientInfo._id}
                      >
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
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
          </div>
          <div className={styles.footerModal}>
            <p className="text text_type_main-small text_color_inactive">
              <FormattedDate date={new Date(currentOrder.createdAt)} />
            </p>
            <div className={styles.totalPrice}>
              <p className="text text_type_digits-default mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentOrderPageInProfile;
