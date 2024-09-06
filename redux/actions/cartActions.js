// Add to cart action
export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  // Remove from cart action
  export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });
  
  // Increase quantity action
  export const increaseQuantity = (id) => ({
    type: 'INCREASE_QUANTITY',
    payload: id,
  });
  
  // Decrease quantity action
  export const decreaseQuantity = (id) => ({
    type: 'DECREASE_QUANTITY',
    payload: id,
  });
  