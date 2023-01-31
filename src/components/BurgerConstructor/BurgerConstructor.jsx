import React, { useState } from "react";
import { useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import { getOrder } from "../../services/actions/order";
import {
  addIngredientInConstructor,
  addBunsInConstructor,
} from "../../services/actions/burgerConstructor";

import { CLOSE_ORDER_MODAL } from "../../services/actions/order";
import emptyPlace from "../../images/emptyPlace.svg";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import CardConstructor from "../../components/CardConstructor/CardConstructor";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.user.userIsAuth);
  const accessToken = useSelector((store) => store.user.accessToken);

  // ингредиенты конструтора
  const midIngredients = useSelector(
    (store) => store.burgerConstructor.constructorIngredients
  );

  const buns = useSelector((store) => store.burgerConstructor.constructorBuns);

  const allIngredients = [...midIngredients, buns];

  // динамическая цена выбранных ингредиентов

  const totalPrice = useMemo(() => {
    let totalPrice = 0;
    midIngredients.map((item) => {
      totalPrice = totalPrice + item.price;
    });

    if (isNaN(buns.price)) {
      buns.price = 0;
    }
    const bunsPrice = buns.price * 2;

    return (totalPrice = totalPrice + bunsPrice);
  });

  // отправка заказа на сервер

  const IdIngredients = [];
  allIngredients.forEach((item) => {
    IdIngredients.push(item._id);
  });

  function openOrderModal() {
    if (!auth) {
      navigate("/login");
      return;
    }
    dispatch(getOrder("orders", IdIngredients, accessToken));
  }

  const closeOrderModal = useCallback(() => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  }, [dispatch]);

  const numberOfOrder = useSelector((store) => store.order.orderNumber);

  // функция перетаскивания на прием

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch(addBunsInConstructor({ ...item }));
      } else {
        dispatch(addIngredientInConstructor({ ...item, id: uuidv4() }));
      }
    },
  });

  // состояние кнопки

  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    if (buns.length === 0 || midIngredients.length === 0) {
      setButtonState(true);
    } else if (buns && midIngredients.length > 0) {
      setButtonState(false);
    }
  }, [buns, midIngredients]);

  return (
    <section className={ConstructorStyle.section}>
      {numberOfOrder && (
        <Modal close={closeOrderModal}>
          <OrderDetails numberOfOrder={numberOfOrder} />
        </Modal>
      )}
      <div ref={dropTarget} className={ConstructorStyle.alignment}>
        <div className={ConstructorStyle.base}>
          {buns.length === 0 ? (
            <ConstructorElement
              type="top"
              text={"добавь ингредиенты"}
              price={0}
              thumbnail={emptyPlace}
              isLocked={true}
            />
          ) : (
            <ConstructorElement
              type="top"
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
              isLocked={true}
            />
          )}
        </div>

        <div className={ConstructorStyle.scroll}>
          {midIngredients.map((item, index) => (
            <CardConstructor
              data={item}
              index={index}
              key={item.id}
              id={item.id}
            ></CardConstructor>
          ))}
        </div>

        <div className={ConstructorStyle.base}>
          {buns.length === 0 ? (
            <ConstructorElement
              type="bottom"
              text={"добавь ингредиенты"}
              price={0}
              thumbnail={emptyPlace}
              isLocked={true}
            />
          ) : (
            <ConstructorElement
              type="bottom"
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={buns.image}
              isLocked={true}
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
            disabled={buttonState}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
