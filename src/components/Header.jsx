import { useContext } from "react";
import logoImage from "../assets/logo.jpg";
import Button from "./ui/Button.jsx";
import CartContext from "../store/cartContext.jsx";


const Header = () => {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item)=>{
    return totalNumberOfItems + item.quantity;
  },0) ;
  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImage} alt="logo" />
            <h1>Food Ordering App</h1>
        </div>
        <nav>
          <Button textOnly>Cart({totalCartItems})</Button>
        </nav>

    </header>
  )
}

export default Header