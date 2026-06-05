import { useContext } from "react";
import { currencyFormater } from "../util/formatter.js";
import Button from "./ui/Button.jsx";
import CartContext from "../store/cartContext.jsx";


const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart(){
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormater.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
