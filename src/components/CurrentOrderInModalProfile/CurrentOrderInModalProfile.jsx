import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import InfoOrderStory from "../InfoOrderStory.jsx/InfoOrderStory";

function CurrentOrderInModalProfile() {
  const { id } = useParams();

  const allOrders = useSelector((store) => store.orderFeed.allOrders);

  const currentOrder = allOrders.find((item) => item._id === id);

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
