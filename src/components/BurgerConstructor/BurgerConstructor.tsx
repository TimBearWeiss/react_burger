import { useCallback, useMemo, useEffect, useState, FC } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  addIngredientInConstructor,
  addBunsInConstructor,
} from "../../services/actions/burgerConstructor";
import { closeOrderModalAction, getOrder } from "../../services/actions/order";
import { DELETE_ALL_INGREDIENT } from "../../services/actions/burgerConstructor";
import emptyPlace from "../../images/emptyPlace.svg";
import { v4 as uuidv4 } from "uuid";
import CardConstructor from "../CardConstructor/CardConstructor";
import { useTypedSelector, useDispatch } from "../../services/rootReducer";
import { TIngredient } from "../../types/types";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let auth = useTypedSelector((store) => store.user.userIsAuth);
  const orderStatus = useTypedSelector((store) => store.order.orderStatus);
  const numberOfOrder = useTypedSelector((store) => store.order.orderNumber);

  // ингредиенты конструтора
  const midIngredients = useTypedSelector(
    (store) => store.burgerConstructor.constructorIngredients
  );

  const buns = useTypedSelector(
    (store) => store.burgerConstructor.constructorBuns
  );

  const allIngredients = [...midIngredients, ...buns];

  // динамическая цена выбранных ингредиентов

  const totalPrice = useMemo(() => {
    let total = 0;
    midIngredients.map((item: TIngredient) => {
      total = total + item.price;
    });
    buns.map((item: TIngredient) => {
      total = total + item.price;
    });
    return total;
  }, [buns, midIngredients]);

  // отправка заказа на сервер

  const IdIngredients: Array<string> = [];
  allIngredients.forEach((item) => {
    IdIngredients.push(item._id);
  });

  /// Внимательнее убрал диспатч
  const openOrderModal = () => {
    if (!auth) {
      navigate("/login");
      return;
    }

    dispatch(getOrder(IdIngredients));
    dispatch({ type: DELETE_ALL_INGREDIENT });
  };

  const closeOrderModal = useCallback(() => {
    dispatch(closeOrderModalAction());
  }, [dispatch]);

  // функция перетаскивания на прием

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      if (item.type === "bun") {
        dispatch(addBunsInConstructor([item]));
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
              text={`${buns[0].name} (верх)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
              isLocked={true}
            />
          )}
        </div>

        <div className={ConstructorStyle.scroll}>
          {midIngredients &&
            midIngredients.map((item: TIngredient, index: number) => (
              <CardConstructor
                data={item}
                index={index}
                key={item.id}
                id={item.id}
              />
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
              text={`${buns[0].name} (низ)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
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
