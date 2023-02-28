import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Pages.module.css";
import { useTypedSelector } from "../services/rootReducer";
import { TIngredient } from "../types/types";

function IngredientInfoPage() {
  const { id } = useParams();
  const allIngredients = useTypedSelector(
    (store) => store.ingredients.allIngredients
  );

  const currentIngredient = allIngredients.find(
    (e: TIngredient) => e._id === id
  );

  return (
    <>
      {!currentIngredient ? (
        <p className="text text_type_main-medium text_color_inactive mt-30">
          Загрузка...
        </p>
      ) : (
        <div className={style.ingredientInfoCell + " pt-30"}>
          <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
          <img
            alt={currentIngredient.name}
            src={currentIngredient.image_large}
          />
          <h3 className={`text text_type_main-medium pt-4 pb-8`}>
            {currentIngredient.name}
          </h3>
          <ul className={style.structure}>
            <li className={style.list}>
              <h3 className="text text_type_main-default">Калории,ккал</h3>
              <p className="text text_type_digits-default">
                {currentIngredient.calories}
              </p>
            </li>
            <li className={style.list}>
              <h3 className="text text_type_main-default">Белки, г</h3>
              <p className="text text_type_digits-default">
                {currentIngredient.proteins}
              </p>
            </li>
            <li className={style.list}>
              <h3 className="text text_type_main-default">Жиры, г</h3>
              <p className="text text_type_digits-default">
                {currentIngredient.fat}
              </p>
            </li>
            <li className={style.list}>
              <h3 className="text text_type_main-default">Углеводы, г</h3>
              <p className="text text_type_digits-default">
                {currentIngredient.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default IngredientInfoPage;
