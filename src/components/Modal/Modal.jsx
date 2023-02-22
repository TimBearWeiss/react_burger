import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import modalStyle from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useEffect } from "react";

const modalRootElement = document.querySelector("#modal");

const Modal = ({ heading, children, close }) => {
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

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
  heading: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default Modal;
