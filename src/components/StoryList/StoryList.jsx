import OrderListElement from "../OrderListElement/OrderListElement";
import styles from "./StoryList.module.css";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsAction";
import { WS_URL } from "../../utils/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/data";

function StoryList({ allOrders }) {
  const dispatch = useDispatch();

  const accessToken = getCookie("accessToken");

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`));
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
