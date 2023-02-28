import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../../services/rootReducer";
import InfoOrderStory from "../InfoOrderStory.jsx/InfoOrderStory";
import { TOrder } from "../../types/types";

function CurrentOrderInModalProfile() {
  const { id } = useParams();

  const allOrders = useTypedSelector((store) => store.orderFeed.allOrders);

  const currentOrder = allOrders.find((item: TOrder) => item._id === id);

  return (
    <>
      <div>
        {currentOrder && (
          <InfoOrderStory currentOrder={currentOrder}></InfoOrderStory>
        )}
      </div>
    </>
  );
}

export default CurrentOrderInModalProfile;
