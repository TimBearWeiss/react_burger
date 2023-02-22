import style from "./ModalOverlay.module.css";

const ModalOverlay = ({ close }) => {
  return <div className={style.overlay} onClick={close}></div>;
};

export default ModalOverlay;
