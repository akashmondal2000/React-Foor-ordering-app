import logoImage from "../assets/logo.jpg";
import Button from "./ui/Button.jsx";

const Header = () => {
  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImage} alt="logo" />
            <h1>Food Ordering App</h1>
        </div>
        <nav>
          <Button textOnly>Cart(0)</Button>
        </nav>

    </header>
  )
}

export default Header