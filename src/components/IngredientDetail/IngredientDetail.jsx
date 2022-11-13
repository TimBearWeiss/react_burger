import React from "react";
import style from "./IngredientDetail.module.css";
import PropTypes from "prop-types";
import ingredietnPropTypes from "../../utils/data.js";

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      {ingredient.map((item) => {
        return (
          <div className={style.box} key={item._id}>
            <img className={style.picture} src={item.image} alt="ингредиент" />
            <p className={"text text_type_main-medium mt-1 mb-8"}>
              {item.name}
            </p>
            <ul
              className={
                style.structure +
                " text text_type_main-default text_color_inactive"
              }
            >
              <li className={style.list}>
                Калории,ккал
                <span className={"text text_type_digits-default"}>
                  {item.calories}
                </span>
              </li>
              <li className={style.list}>
                Белки, г
                <span className={"text text_type_digits-default"}>
                  {item.proteins}
                </span>
              </li>
              <li className={style.list}>
                Жиры, г
                <span className={"text text_type_digits-default"}>
                  {item.fat}
                </span>
              </li>
              <li className={style.list}>
                Углеводы г
                <span className={"text text_type_digits-default"}>
                  {item.carbohydrates}
                </span>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(ingredietnPropTypes),
};

export default IngredientDetails;
