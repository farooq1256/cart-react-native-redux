import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += product.price;
      } else {
        state.items.push({ ...product, quantity: 1 });
        state.totalAmount += product.price;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(item => item.id === productId);
      if (itemToRemove) {
        state.items = state.items.filter(item => item.id !== productId);
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
      }
    },
    increaseQuantity(state, action) {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },
    decreaseQuantity(state, action) {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
