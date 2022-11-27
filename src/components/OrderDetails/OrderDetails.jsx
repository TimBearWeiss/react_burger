import styles from "./OrderDetails.module.css";
import icon from "../../images/graphics.svg";

const OrderDetails = ({ numberOfOrder }) => {
  return (
    <div className={styles.block}>
      <h2 className={styles.number + " text text_type_digits-large mb-8 mt-20"}>
        {numberOfOrder}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <span className={styles.icon + " mb-15"}>
        <img src={icon} alt="иконка оплаченного заказа" />
      </span>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
