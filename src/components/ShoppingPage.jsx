import { useState, useEffect } from 'react';
import style from '../styles/App.module.css';
import { useLoaderData } from 'react-router-dom';

export const shoppingLoader = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }

    const items = await response.json();
    console.log('Fetched items:', items); // Log the fetched items
    return { items }; // Return an object with `items` key
  } catch (error) {
    console.error(error);
    return { items: [] }; // Ensure that the returned object always has `items`
  }
};

export default function ShoppingPage({ handleAddToCart }) {
  // Simulate loading state
  const [loading, setLoading] = useState(true);
  const { items } = useLoaderData();

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Example delay of 1 second

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (loading) {
    return <div className={style.homePageClass}>Fetching items...</div>;
  }

  return (
    <div>
      <h1>Shop</h1>

      {items &&
        items.map((item) => (
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
