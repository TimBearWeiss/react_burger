import { useParams } from "react-router-dom";
import InfoOrder from "../InfoOrder/InfoOrder";
import { useTypedSelector } from "../../services/rootReducer";
import { TIngredient } from "../../types/types";
import { FC } from "react";

const CurrentOrderInModal: FC = () => {
  const { id } = useParams();

  const allOrders = useTypedSelector((store: any) => store.orderFeed.allOrders);
  const currentOrder = allOrders.find((item: TIngredient) => item._id === id);

  return (
    <>
      <div>
        {currentOrder && <InfoOrder currentOrder={currentOrder}></InfoOrder>}
      </div>
    </>
  );
};

export default CurrentOrderInModal;
