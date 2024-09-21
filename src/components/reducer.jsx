export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'SET_ACTIVE_LINK':
      return {
        ...state,
        activeLink: action.payload,
      };
    case 'ADD_TO_CART': {
      const { id, amount } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex > -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          amount: updatedCartItems[existingItemIndex].amount + 1,
        };
        return {
          ...state,
          cartItems: updatedCartItems,
          addedToCarts: state.addedToCarts + 1,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          addedToCarts: state.addedToCarts + 1,
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      const { id } = action.payload;
      const updatedCartItems = state.cartItems
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

      return {
        ...state,
        cartItems: updatedCartItems,
        addedToCarts: state.addedToCarts - 1,
      };
    }
    default:
      return state;
  }
}
