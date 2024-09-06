import productList from '../../data/ProductList';

const initialState = { products: productList };

const productReducer = (state = initialState, action) => {
  return state;
};

export default productReducer;
