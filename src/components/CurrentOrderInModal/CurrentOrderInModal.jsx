import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InfoOrder from "../InfoOrder/InfoOrder";

const CurrentOrderInModal = ({ allIngredients }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const allOrders = useSelector((store) => store.orderFeed.allOrders);

  const currentOrder = allOrders.find((item) => item._id === id);

  return (
    <>
      <div>
        {currentOrder && <InfoOrder currentOrder={currentOrder}></InfoOrder>}
      </div>
    </>
  );
};

export default CurrentOrderInModal;
