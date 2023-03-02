import OrderListElement from "../OrderListElement/OrderListElement";
import styles from "./StoryList.module.css";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsAction";
import { WS_URL } from "../../utils/api";
import { useEffect } from "react";
import { useDispatch } from "../../services/rootReducer";
import { getCookie } from "../../utils/cookie";
import { FC } from "react";
import { TOrder } from "../../types/types";

type TStoryListProps = {
  allOrders: TOrder[];
};

const StoryList: FC<TStoryListProps> = ({ allOrders }) => {
  const dispatch = useDispatch();

  function switcherConnection() {
    dispatch(wsConnectionStart(`${WS_URL}?token=${getCookie("accessToken")}`));
    return () => dispatch(wsConnectionClosed());
  }

  useEffect(() => {
    switcherConnection();
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
};

export default StoryList;
