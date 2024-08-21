import { useLoaderData, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from '../styles/App.module.css';

export const shoppingLoader = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  const items = await response.json();
  return { items };
};

export default function ShoppingPage() {
  // Simulate loading state
  const [loading, setLoading] = useState(true);
  const { items } = useLoaderData();
  const { handleAddToCart } = useOutletContext();

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, []);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (loading) {
    return <div className={style.homePageClass}>Fetching items...</div>;
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
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
