import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import modalStyle from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, ReactNode, FC } from "react";

const modalRootElement = document.querySelector("#modal") as HTMLElement;

type TModal = {
  close: () => void;
  children: ReactNode;
  heading?: string;
};

const Modal: FC<TModal> = ({ heading, children, close }) => {
  useEffect(() => {
    function closeByEscape(evt: { key: string }) {
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

export default Modal;
