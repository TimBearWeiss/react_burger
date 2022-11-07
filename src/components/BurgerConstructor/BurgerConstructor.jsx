import React from "react";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";

const BurgerConstructor = () => {
  // const bun = data.find((item) => item.type === "bun");

  // буяним
  function creatBun(data) {
    const bun = data.find((item) => item.type === "bun");
    return bun;
  }

  const bun = React.useMemo(() => creatBun(data), [data]);

  // буяним

  const mid = data.filter(
    (item) => item.type === "main" || item.type === "sauce"
  );

  return (
    <section className={ConstructorStyle.section}>
      <div className={ConstructorStyle.alignment}>
        <div className={ConstructorStyle.base}>
          <ConstructorElement
            key={bun._id}
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
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
          <ConstructorElement
            key={bun._id}
            type="bottom"
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <div className={ConstructorStyle.down}>
          <div className={ConstructorStyle.price}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
