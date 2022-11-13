import React from "react";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data, open }) => {
  function creatBun(data) {
    const bun = data.find((item) => item.type === "bun");
    return bun;
  }

  const bun = React.useMemo(() => creatBun(data), [data]);

  const mid = data.filter(
    (item) => item.type === "main" || item.type === "sauce"
  );

  return (
    <section className={ConstructorStyle.section}>
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
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={open} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.array,
  open: PropTypes.func,
};

export default BurgerConstructor;
