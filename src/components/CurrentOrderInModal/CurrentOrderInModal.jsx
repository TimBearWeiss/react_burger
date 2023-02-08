import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./CurrentOrderInModal.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
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
