import { useContext } from "react";
import Modal from "./ui/Modal.jsx";
import CartContext from "../store/cartContext.jsx";
import { currencyFormater } from "../util/formatter.js";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hook/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(fd) {
    // event.preventDefault();

    // const fd = new FormData(event.target);
    /* convert formData object to a sompler js Object*/
    const customerData = Object.fromEntries(fd.entries());  
    console.log(customerData);
    

    sendRequest(
      JSON.stringify({
        order:{
          items: cartCtx.items,
          customer: customerData,
        }
      }),
    );
  }

  let actions = (
    <>
      <Button onClick={handleClose} type="button" textOnly>
        Close
      </Button>
      <Button>Subimt Order</Button>
    </>
  );

  if(isSending){
    actions = <span>Sending Order Data...</span>
  }

  if(data && !error){
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <h2>Sucess</h2>
      <p>Your order was submitted Successfully</p>
      <p>We will get back to you with more details via email within next few minuts</p>
      <p className="modal-actions">
        <Button onClick={handleClose}>Okey</Button>
      </p>
    </Modal>
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormater.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" />
        </div>
        {
          error && <Error title="faild to submit order" message={error} />
        }
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
