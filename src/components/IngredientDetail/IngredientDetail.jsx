import style from "./IngredientDetail.module.css";
import { ingredietnPropTypes } from "../../utils/data.js";
import { useParams } from "react-router-dom";

const IngredientDetails = ({ allIngredients }) => {
  const { id } = useParams();
  console.log("inDetails", id, allIngredients);
  const ingredient = allIngredients.find((item) => item._id === id);

  return (
    <div className={style.box} key={ingredient._id}>
      <img className={style.picture} src={ingredient.image} alt="ингредиент" />
      <p className={"text text_type_main-medium mt-1 mb-8"}>
        {ingredient.name}
      </p>
      <ul
        className={
          style.structure + " text text_type_main-default text_color_inactive"
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
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredietnPropTypes,
};

export default IngredientDetails;
