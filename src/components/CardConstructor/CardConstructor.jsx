import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import CardConstructorStyle from "./CardConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteIngredient,
  moveCard,
} from "../../services/actions/burgerConstructor";
import { useDrag } from "react-dnd";

const CardConstructor = ({ index, data, id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "constructorElement",
    collect() {},
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveCard({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorElement",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className={CardConstructorStyle.relative}
      style={{ opacity }}
      draggable={true}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => dispatch(deleteIngredient(index))}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
    </div>
  );
};

export default CardConstructor;
