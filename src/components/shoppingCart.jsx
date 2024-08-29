import React from 'react';

function CartPage({ cartItems }) {
  return (
    <div>
      <h2>Your Items:</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} />
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
