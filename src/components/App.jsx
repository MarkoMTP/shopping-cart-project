import { Link } from 'react-router-dom';
import style from '../styles/App.module.css';
import { useEffect, useState } from 'react';
import HomePage from './Homepage';
import ShoppingPage from './ShoppingPage';
import CartPage from './shoppingCart';

export default function App({ handleAddToCart, givenItems }) {
  const [addedToCarts, setAddedToCarts] = useState(0);
  const [activeLink, setActiveLink] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
  function internalHandleAddToCart(title, image, price, id, amount = 1) {
    setCartItems((prevCartItems) => {
      // Check if the item with the same id already exists in the cart
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex > -1) {
        // If the item exists, update its amount
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          amount: updatedCartItems[existingItemIndex].amount + 1,
        };
        return updatedCartItems;
      } else {
        // If the item doesn't exist, add it as a new item
        return [...prevCartItems, { title, image, price, id, amount }];
      }
    });

    setTotalPrice((prevTotalPrice) => {
      const newTotal = prevTotalPrice + price;
      return parseFloat(newTotal.toFixed(2)); // Round to 2 decimal places
    });

    // Increment the total count of items in the cart
    setAddedToCarts((prevCount) => prevCount + 1);
  }

  function handleDeleteItem(id) {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            // If the item has more than 1 quantity, decrease the amount
            if (item.amount > 1) {
              return { ...item, amount: item.amount - 1 };
            } else {
              // If the item only has 1 quantity, we return null to remove it later
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null); // Filter out items that were set to null
    });

    setTotalPrice((prevTotalPrice) => {
      const item = cartItems.find((item) => item.id === id);
      const newTotal = prevTotalPrice - (item ? item.price : 0);
      return parseFloat(Math.max(newTotal, 0).toFixed(2)); // Round to 2 decimal places and ensure non-negative
    });

    // Decrement the total count of items in the cart
    setAddedToCarts((prevCount) => prevCount - 1);
  }

  const actualHandleAddToCart = handleAddToCart || internalHandleAddToCart;

  const actualItems = givenItems || items;

  let content;
  if (loading) {
    content = <div>Loading items...</div>; // Show loading message
  } else if (error) {
    content = <div>Error: {error}</div>; // Show error message
  } else if (activeLink === 'homepage') {
    content = <HomePage />;
  } else if (activeLink === 'shoppingpage') {
    content = (
      <ShoppingPage
        handleAddToCart={actualHandleAddToCart}
        items={actualItems}
      />
    );
  } else if (activeLink === 'cart') {
    content = (
      <CartPage
        cartItems={cartItems}
        totalPrice={totalPrice}
        handlePlusButton={actualHandleAddToCart}
        handleMinusBtn={handleDeleteItem}
      />
    );
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
                ? style.shoppingPage
                : style.homePageClass
        }
      >
        {content}
      </div>
    </>
  );
}
