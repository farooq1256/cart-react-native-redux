// Cart initial state
const initialCartState = {
  items: [],
  totalAmount: 0,
};

// Helper functions
const addItemToCart = (state, product) => {
  const existingItem = state.items.find(item => item.id === product.id);

  if (existingItem) {
    // If the item already exists in the cart, increase its quantity
    const updatedItems = state.items.map(item =>
      item.id === product.id ? {...item, quantity: item.quantity + 1} : item,
    );

    return {
      ...state,
      items: updatedItems,
      totalAmount: state.totalAmount + product.price,
    };
  } else {
    // If the item is new, add it to the cart
    return {
      ...state,
      items: [...state.items, {...product, quantity: 1}],
      totalAmount: state.totalAmount + product.price,
    };
  }
};
const removeItemFromCart = (state, productId) => {
  const itemToRemove = state.items.find(item => item.id === productId);
  const updatedItems = state.items.filter(item => item.id !== productId);

  return {
    ...state,
    items: updatedItems,
    totalAmount: state.totalAmount - itemToRemove.price * itemToRemove.quantity,
  };
};

const updateQuantity = (state, productId, amount) => {
  const updatedItems = state.items.map(item =>
    item.id === productId ? {...item, quantity: item.quantity + amount} : item,
  );
  const updatedItem = state.items.find(item => item.id === productId);
  const newTotalAmount = state.totalAmount + updatedItem.price * amount;

  return {
    ...state,
    items: updatedItems,
    totalAmount: newTotalAmount,
  };
};

// Cart reducer
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return addItemToCart(state, action.payload);

    case 'REMOVE_FROM_CART':
      return removeItemFromCart(state, action.payload);

    case 'INCREASE_QUANTITY':
      return updateQuantity(state, action.payload, 1);

    case 'DECREASE_QUANTITY':
      const item = state.items.find(item => item.id === action.payload);
      if (item.quantity === 1) return state; 
      return updateQuantity(state, action.payload, -1);

    default:
      return state;
  }
};

export default cartReducer;
