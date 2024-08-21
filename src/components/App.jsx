import { Link, Outlet } from 'react-router-dom';
import style from '../styles/App.module.css';
import { useState } from 'react';

export default function App() {
  const [addedToCarts, setAddedToCarts] = useState(0);
  const [activeLink, setActiveLink] = useState('');
  const [cartItems, setCartItems] = useState([]);

  function handleLinkClick(linkName) {
    // Add a delay before setting the active link
    setActiveLink(linkName);
  }

  function handleAddToCart(title, image, price, id) {
    setAddedToCarts((prevCount) => prevCount + 1);
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { title, image, price, id },
    ]);
  }

  return (
    <>
      <div className={style.navbar}>
        <p>Buy Something</p>

        <ul className={style.links}>
          <Link to="homepage" onClick={() => handleLinkClick('homepage')}>
            HomePage
          </Link>
          <br />
          <Link
            to="shoppingpage"
            onClick={() => handleLinkClick('shoppingpage')}
          >
            Shop
          </Link>
          <br />
          <span>&#37;</span>
          <Link to="homepage" onClick={() => handleLinkClick('cart')}>
            {addedToCarts}
          </Link>
        </ul>
      </div>

      <div
        className={
          activeLink === 'homepage'
            ? style.homePageClass
            : activeLink === 'shoppingpage'
              ? style.shoppingPage
              : activeLink === 'cart'
                ? style.cartClass
                : style.homePageClass
        }
      >
        <Outlet context={{ handleAddToCart, cartItems }} />
      </div>
    </>
  );
}
