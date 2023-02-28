import styles from "./Pages.module.css";
import OrderListElement from "../components/OrderListElement/OrderListElement";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_URL } from "../utils/api";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsAction";
import { useTypedSelector } from "../services/rootReducer";
import { TOrder } from "../types/types";

const OrderListPage = () => {
  const totalOrders = useTypedSelector((store) => store.orderFeed.total);
  const totalToday = useTypedSelector((store) => store.orderFeed.totalToday);
  const readyOrders = useTypedSelector((store) => store.orderFeed.readyOrders);
  const allOrders = useTypedSelector((store) => store.orderFeed.allOrders);
  const preparingOrders = useTypedSelector(
    (store) => store.orderFeed.preparingOrders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    {
      dispatch(wsConnectionStart(`${WS_URL}/all`));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <>
      <section className={styles.section}>
        <h2 className="text text_type_main-large mb-2">Лента заказов</h2>
        <div className={styles.scroll}>
          {allOrders.map((el: TOrder) => (
            <OrderListElement link={"feed"} item={el} key={el._id} />
          ))}
        </div>
      </section>
      <section className={` ml-15 mt-9 mr-30`}>
        <div className={styles.numbersCell}>
          <div style={{ minWidth: "300px" }} className={` mr-9`}>
            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
            <div>
              {readyOrders.slice(0, 5).map((el, index) => (
                <p
                  className={`${styles.readyNumbers} text text_type_digits-default mb-2`}
                  key={index}
                >
                  {el.number}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
            <div>
              {preparingOrders.slice(0, 10).map((el, index) => (
                <p className="text text_type_digits-default mb-2" key={index}>
                  {el.number}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className={` mb-15`}>
          <h2 className="text text_type_main-medium ">
            Выполнено за все время:
          </h2>
          <p className={`${styles.largeNumbers} text text_type_digits-large`}>
            {totalOrders}
          </p>
        </div>
        <div>
          <h2 className="text text_type_main-medium ">Выполнено за сегодня:</h2>
          <p className={`${styles.largeNumbers} text text_type_digits-large`}>
            {totalToday}
          </p>
        </div>
      </section>
    </>
  );
};

export default OrderListPage;
