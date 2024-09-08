import { useOutletContext } from 'react-router-dom';

function CartPage() {
  const { cartItems, totalPrice, actualHandleAddToCart, handleDeleteItem } =
    useOutletContext();

  return (
    <div>
      <h2>Your Items:</h2>
      <h2>Total: {totalPrice}</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3>{item.title}</h3>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '150px', height: '150px', borderRadius: '8px' }}
              />
              <p>Price: ${item.price}</p>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  style={{
                    width: '4rem',
                    maxHeight: '2rem',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                  onClick={() => handleDeleteItem(item.id)}
                >
                  -
                </button>{' '}
                <h2>{item.amount} of items</h2>
                <button
                  style={{
                    width: '4rem',
                    maxHeight: '2rem',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                  onClick={() =>
                    actualHandleAddToCart(
                      item.title,
                      item.image,
                      item.price,
                      item.id,
                      item.amount
                    )
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
