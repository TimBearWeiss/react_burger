import { useCallback, useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import {
  addIngredientInConstructor,
  addBunsInConstructor,
} from "../../services/actions/burgerConstructor";
import { CLOSE_ORDER_MODAL, getOrder } from "../../services/actions/order";
import { DELETE_ALL_INGREDIENT } from "../../services/actions/burgerConstructor";
import emptyPlace from "../../images/emptyPlace.svg";
import { v4 as uuidv4 } from "uuid";
import CardConstructor from "../../components/CardConstructor/CardConstructor";
import { getCookie } from "../../utils/data";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((store) => store.user.userIsAuth);
  const orderStatus = useSelector((store) => store.order.orderStatus);
  const numberOfOrder = useSelector((store) => store.order.orderNumber);

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
    dispatch(getOrder("orders", IdIngredients, getCookie("accessToken")));
    dispatch({ type: DELETE_ALL_INGREDIENT });
  }

  const closeOrderModal = useCallback(() => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  }, [dispatch]);

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
            {orderStatus}
          </Button>
        </div>
        {orderStatus === "Подождите..." ? (
          <p
            className={
              ConstructorStyle.annotation + " text text_type_main-medium"
            }
          >
            Идет оформление заказа, не покидайте страницу
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default BurgerConstructor;
