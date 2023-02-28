import style from "./IngredientDetail.module.css";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../types/types";
import { FC } from "react";

type TIngredientDetails = {
  allIngredients: Array<TIngredient>;
};

const IngredientDetails: FC<TIngredientDetails> = ({ allIngredients }) => {
  const { id } = useParams();
  const ingredient = allIngredients.find((item) => item._id === id);

  return (
    <>
      {ingredient && (
        <div className={style.box} key={ingredient._id}>
          <img
            className={style.picture}
            src={ingredient.image}
            alt="ингредиент"
          />
          <p className={"text text_type_main-medium mt-1 mb-8"}>
            {ingredient.name}
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
                {ingredient.calories}
              </span>
            </li>
            <li className={style.list}>
              Белки, г
              <span className={"text text_type_digits-default"}>
                {ingredient.proteins}
              </span>
            </li>
            <li className={style.list}>
              Жиры, г
              <span className={"text text_type_digits-default"}>
                {ingredient.fat}
              </span>
            </li>
            <li className={style.list}>
              Углеводы г
              <span className={"text text_type_digits-default"}>
                {ingredient.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
