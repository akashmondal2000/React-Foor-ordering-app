import { useContext } from "react";
import Modal from "./ui/Modal.jsx";
import CartContext from "../store/cartContext.jsx";
import { currencyFormater } from "../util/formatter.js";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleClose(){
    userProgressCtx.hideCheckout();
  };

  return (
    <Modal open={userProgressCtx.progress === 'checkout'}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormater.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code"/>
            <Input label="city" type="text" id="city"/>
        </div>

        <p className="modal-actions">
            <Button onClick={handleClose} type="button" textOnly>Close</Button>
            <Button>Subimt Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
