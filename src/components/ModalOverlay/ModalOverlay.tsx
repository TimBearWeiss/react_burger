import style from "./ModalOverlay.module.css";
import { FC } from "react";

type TModalOverlay = {
  close: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ close }) => {
  return <div className={style.overlay} onClick={close}></div>;
};

export default ModalOverlay;
