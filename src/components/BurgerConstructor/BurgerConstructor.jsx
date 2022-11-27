import React from "react";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { IngredientsContest } from "../services/ingredientsContext.js";
import { getNumberOfOrder } from "../../utils/api.js";

const BurgerConstructor = () => {
  const { ingredients, setIngredients } = React.useContext(IngredientsContest);

  // функционал модального окна
  const [CurrentOrder, setCurrentOrder] = React.useState(false);

  const openOrderModal = () => {
    setCurrentOrder(true);
  };
  const closeOrderModal = () => {
    setCurrentOrder(false);
  };
  // находим ингредиенты
  function creatBun(ingredients) {
    const bun = ingredients.find((item) => item.type === "bun");
    return bun;
  }
  const bun = React.useMemo(() => creatBun(ingredients), [ingredients]);
  const mid = ingredients.filter(
    (item) => item.type === "main" || item.type === "sauce"
  );

  // динамическая цена выбранных ингредиентов

  const totalPrice = ingredients.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  // отправка заказа на сервер
  const IdIngredients = [];
  ingredients.forEach((item) => {
    IdIngredients.push(item._id);
  });

  const apiOrders = "https://norma.nomoreparties.space/api/orders";
  const [numberOfOrder, setOrder] = React.useState(0);

  const startOrder = () => {
    getNumberOfOrder(apiOrders, IdIngredients)
      .then((res) => {
        setOrder(res.order.number);
      })
      .then(() => {
        openOrderModal();
      });
  };

  return (
    <section className={ConstructorStyle.section}>
      {CurrentOrder && (
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
              text={bun.name}
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
              text={bun.name}
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
          <Button onClick={startOrder} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
