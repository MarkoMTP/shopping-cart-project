import { useLoaderData } from 'react-router-dom';

export const shoppingLoader = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  const items = await response.json();
  return { items };
};

export default function ShoppingPage({ onClick }) {
  const { items } = useLoaderData();

  return (
    <div>
      <h1>Shop</h1>

      {items.map((item) => (
        <div key={item.id}>
          <h1> {item.title} </h1>
          <a href={item.image} target="_blank" rel="noopener noreferrer">
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '150px', height: '150px' }}
            />
          </a>

          <h2>{item.price}</h2>

          <button onClick={onClick}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
