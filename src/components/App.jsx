import { Link, Outlet } from 'react-router-dom';
import style from '../styles/App.module.css';
import { useEffect, useMemo, useReducer } from 'react';
import reducer from './reducer';

// Fetch Products Function
function fetchProducts(dispatch) {
  fetch('https://fakestoreapi.com/products?limit=8', { mode: 'cors' })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Server error');
      }
      return response.json();
    })
    .then((data) => {
      // Dispatch action to update items in the state
      dispatch({ type: 'SET_ITEMS', payload: data });
    })
    .catch((err) => {
      console.error(err.message); // Log the error but do not manage it in state
    });
}

export default function App({ handleAddToCart, givenItems }) {
  const initialState = {
    addedToCarts: 0,
    activeLink: '',
    cartItems: [],
    items: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts(dispatch); // Fetch products on mount
  }, [dispatch]);

  // Handle link click to update active link state
  function handleLinkClick(linkName) {
    dispatch({
      type: 'SET_ACTIVE_LINK',
      payload: linkName,
    });
  }

  // Internal function to handle adding to cart
  function internalHandleAddToCart(title, image, price, id, amount = 1) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { title, image, price, id, amount },
    });
  }

  // Handle delete item
  function handleDeleteItem(id) {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id },
    });
  }

  // Fallback to internal add to cart if handleAddToCart is not provided
  const actualHandleAddToCart = handleAddToCart || internalHandleAddToCart;

  // Use given items or the fetched items
  const actualItems = givenItems || state.items;

  // Calculate total price of items in the cart
  const totalPrice = useMemo(() => {
    return state.cartItems
      .reduce((acc, item) => acc + item.price * item.amount, 0)
      .toFixed(2);
  }, [state.cartItems]);

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
          {state.addedToCarts}
        </ul>
      </div>

      <div
        className={
          state.activeLink === 'homepage'
            ? style.homePageClass
            : state.activeLink === 'shoppingpage'
              ? style.shoppingPage
              : state.activeLink === 'cart'
                ? style.shoppingPage
                : style.homePageClass
        }
      >
        <Outlet
          context={{
            actualHandleAddToCart,
            actualItems,
            cartItems: state.cartItems,
            totalPrice,
            handleDeleteItem,
          }}
        />
      </div>
    </>
  );
}
