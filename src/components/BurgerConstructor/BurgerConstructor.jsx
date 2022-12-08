import React from "react";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { useDispatch, useSelector } from "react-redux";

import { getOrder } from "../../services/actions/actions";
import { useCallback } from "react";
import { CLOSE_ORDER_MODAL } from "../../services/actions/actions";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  // ингредиенты конструтора
  const allIngredients = useSelector(
    (store) => store.ingredients.allIngredients
  );

  // находим ингредиенты
  function creatBun(ingredients) {
    const bun = ingredients.find((item) => item.type === "bun");
    return bun;
  }
  const bun = React.useMemo(() => creatBun(allIngredients), [allIngredients]);
  const mid = allIngredients.filter(
    (item) => item.type === "main" || item.type === "sauce"
  );

  // динамическая цена выбранных ингредиентов

  const totalPrice = allIngredients.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  // отправка заказа на сервер
  const IdIngredients = [];
  allIngredients.forEach((item) => {
    IdIngredients.push(item._id);
  });

  function openOrderModal() {
    dispatch(getOrder("orders", IdIngredients));
  }

  const closeOrderModal = useCallback(() => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  }, [dispatch]);

  const numberOfOrder = useSelector((store) => store.ingredients.orderNumber);

  return (
    <section className={ConstructorStyle.section}>
      {numberOfOrder && (
        <Modal close={closeOrderModal}>
          <OrderDetails numberOfOrder={numberOfOrder} />
        </Modal>
      )}
      <div className={ConstructorStyle.alignment}>
        <div className={ConstructorStyle.base}>
          {bun && (
            <ConstructorElement
              key={bun._id}
              type="top"
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>

        <div className={ConstructorStyle.scroll}>
          {mid.map((item) => (
            <div className={ConstructorStyle.relative} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className={ConstructorStyle.base}>
          {bun && (
            <ConstructorElement
              key={bun._id}
              type="bottom"
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>

        <div className={ConstructorStyle.down}>
          <div className={ConstructorStyle.price}>
            <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType={"button"}
            onClick={openOrderModal}
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
