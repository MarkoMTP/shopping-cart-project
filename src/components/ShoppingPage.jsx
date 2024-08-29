import { useState, useEffect } from 'react';
import style from '../styles/App.module.css';

export default function ShoppingPage({ handleAddToCart, items }) {
  if (items.length === 0) {
    return <div>No items available.</div>;
  }

  return (
    <div>
      <h1>Shop</h1>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px' }}>
          <h2>{item.title}</h2>
          <a href={item.image} target="_blank" rel="noopener noreferrer">
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '150px', height: '150px', borderRadius: '8px' }}
            />
          </a>
          <h3>${item.price}</h3>
          <button
            onClick={() =>
              handleAddToCart(item.title, item.image, item.price, item.id)
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
