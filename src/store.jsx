import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "./reducers/productDetailReducer";
import productSlice from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    products: productSlice,
    productDetail: productDetailReducer,
  },
});
export default store;
