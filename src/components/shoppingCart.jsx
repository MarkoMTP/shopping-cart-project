import React from 'react';

function CartPage({ cartItems, totalPrice }) {
  return (
    <div>
      <h2>Your Items:</h2>
      <h2>Total: {totalPrice}</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} />
              <p>Price: ${item.price}</p>
              <h3>{item.amount} of items</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
