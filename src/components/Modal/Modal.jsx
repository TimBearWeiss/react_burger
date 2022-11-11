import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import modalStyle from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRootElement = document.querySelector("#modal");

const Modal = ({ heading, children, close }) => {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      close();
    }
  });

  return ReactDOM.createPortal(
    <div>
      <div className={modalStyle.modal}>
        <div className={modalStyle.close}>
          <CloseIcon type="primary" onClick={close} />
        </div>
        <h2 className={"text text_type_main-large"}>{heading}</h2>
        {children}
      </div>
      <ModalOverlay close={close} />
    </div>,
    modalRootElement
  );
};

Modal.propTypes = {
  heading: PropTypes.func,
  children: PropTypes.object,
  title: PropTypes.string,
};

export default Modal;
