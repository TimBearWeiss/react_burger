import style from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ close }) => {
  return <div className={style.overlay} onClick={close}></div>;
};

ModalOverlay.propTypes = {
  close: PropTypes.func,
};

export default ModalOverlay;
