import { Link, Outlet } from 'react-router-dom';
import style from '../styles/App.module.css';
import { useEffect, useState } from 'react';

function fetchProducts(setItems, setLoading, setError) {
  fetch('https://fakestoreapi.com/products?limit=8', { mode: 'cors' })
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
}

export default function App({ handleAddToCart, givenItems }) {
  const [addedToCarts, setAddedToCarts] = useState(0);
  const [activeLink, setActiveLink] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchProducts(setItems, setLoading, setError); // Call the separated function here
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

    // Increment the total count of items in the cart
    setAddedToCarts((prevCount) => prevCount + 1);
  }

  function handleDeleteItem(id) {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            if (item.amount > 1) {
              return { ...item, amount: item.amount - 1 };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);
    });

    setAddedToCarts((prevCount) => prevCount - 1);
  }

  const actualHandleAddToCart = handleAddToCart || internalHandleAddToCart;

  const actualItems = givenItems || items;

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(2);

  return (
    <>
      <div className={style.navbar}>
        <p>Buy Something</p>
        <ul className={style.links}>
          <Link
            to="homepage"
            onClick={() => handleLinkClick('homepage')}
            style={{ color: 'black' }}
          >
            Home Page
          </Link>
          <br />
          <Link
            to="shoppingpage"
            onClick={() => handleLinkClick('shoppingpage')}
            style={{ color: 'black' }}
          >
            Shop
          </Link>
          <br />
          <Link
            to="cart"
            onClick={() => handleLinkClick('cart')}
            style={{ color: 'black' }}
          >
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
        <Outlet
          context={{
            actualHandleAddToCart,
            actualItems,
            cartItems,
            totalPrice,
            handleDeleteItem,
          }}
        />
      </div>
    </>
  );
}
