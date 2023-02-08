import OrderListElement from "../OrderListElement/OrderListElement";
import styles from "./StoryList.module.css";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsAction";
import { WS_URL } from "../../utils/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StoryList({ allOrders }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    dispatch(
      wsConnectionStart(`${WS_URL}?token=${accessToken.split("Bearer ")[1]}`)
    );
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);
  return (
    <div className={styles.scrollProfile}>
      {allOrders.map((el) => (
        <OrderListElement
          link={"profile/orders"}
          status={el.status}
          item={el}
          key={el._id}
        />
      ))}
    </div>
  );
}

export default StoryList;
