import { useParams } from "react-router-dom";
import InfoOrder from "../InfoOrder/InfoOrder";
import { useTypedSelector } from "../../services/rootReducer";
import { FC } from "react";
import { TOrder } from "../../types/types";

const CurrentOrderInModal: FC = () => {
  const { id } = useParams();

  const allOrders = useTypedSelector((store) => store.orderFeed.allOrders);
  const currentOrder = allOrders.find((item: TOrder) => item._id === id);

  return (
    <div>
      {currentOrder && <InfoOrder currentOrder={currentOrder}></InfoOrder>}
    </div>
  );
};

export default CurrentOrderInModal;
