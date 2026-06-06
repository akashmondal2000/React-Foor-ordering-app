import { createPortal } from "react-dom";

const Modal = () => {
  return createPortal(<dialog></dialog>,document.getElementById("modal"))
}

export default Modal;