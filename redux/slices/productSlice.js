import { createSlice } from '@reduxjs/toolkit';
import productList from '../../data/ProductList';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: productList,
  },
  reducers: {},
});

export default productSlice.reducer;
