import { Link } from 'react-router-dom';
import style from '../styles/App.module.css';
import { useEffect, useState } from 'react';
import HomePage from './Homepage';
import ShoppingPage from './ShoppingPage';
import CartPage from './shoppingCart';

export default function App() {
  const [addedToCarts, setAddedToCarts] = useState(0);
  const [activeLink, setActiveLink] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5', { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  function handleLinkClick(linkName) {
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
  if (loading) {
    content = <div>Loading items...</div>; // Show loading message
  } else if (error) {
    content = <div>Error: {error}</div>; // Show error message
  } else if (activeLink === 'homepage') {
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
            In Cart
          </Link>
          {addedToCarts}
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
