import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./CurrentOrderInModalProfile.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import InfoOrderStory from "../InfoOrderStory.jsx/InfoOrderStory";

function CurrentOrderInModalProfile() {
  const { id } = useParams();

  const allIngredients = useSelector(
    (store) => store.ingredients.allIngredients
  );
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
