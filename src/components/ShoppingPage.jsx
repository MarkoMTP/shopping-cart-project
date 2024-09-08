import style from '../styles/App.module.css';
import { useOutletContext } from 'react-router-dom';

export default function ShoppingPage() {
  const { actualHandleAddToCart, actualItems } = useOutletContext();
  if (actualItems.length === 0) {
    return <div>No actualItems available.</div>;
  }

  const amount = 1;

  return (
    <>
      <h1>Shop</h1>

      <div className={style.shoppingPageInside}>
        {actualItems.map((item) => (
          <div key={item.id} className={style.itemDiv}>
            <a href={item.image} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '150px', height: '150px', borderRadius: '8px' }}
              />
            </a>

            <div style={{ fontSize: '0.8rem' }}>
              <h2>{item.title}</h2>
              <h3>${item.price}</h3>
              <button
                onClick={() =>
                  actualHandleAddToCart(
                    item.title,
                    item.image,
                    item.price,
                    item.id,
                    amount
                  )
                }
                className={style.myButton}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
