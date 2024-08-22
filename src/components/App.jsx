import { Link, Outlet, useLoaderData } from 'react-router-dom';
import style from '../styles/App.module.css';
import { useState } from 'react';
import HomePage from './Homepage';
import ShoppingPage from './ShoppingPage';
import CartPage from './shoppingCart';

export const shoppingLoader = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }

    const items = await response.json();
    return { items }; // Return as an object with `items` key
  } catch (error) {
    console.error(error);
  }
};

export default function App() {
  const [addedToCarts, setAddedToCarts] = useState(0);
  const [activeLink, setActiveLink] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const { items } = useLoaderData();

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
  let content;
  if (activeLink === 'homepage') {
    content = <HomePage />;
  } else if (activeLink === 'shoppingpage') {
    content = <ShoppingPage handleAddToCart={handleAddToCart} items={items} />;
  } else if (activeLink === 'cart') {
    content = <CartPage cartItems={cartItems} />;
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
          <Link to="cart" onClick={() => handleLinkClick('cart')}>
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
                ? style.homePageClass
                : style.homePageClass
        }
      >
        {content}
      </div>
    </>
  );
}
