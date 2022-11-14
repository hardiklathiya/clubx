import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk("products", async (data) => {
  let response;
  let { category, price, ratings, currentPage } = data;

  response = await axios.get(
    `http://localhost:80/products?page=${currentPage}`
  );
  console.log(category);
  if (category) {
    response = await axios.get(
      `http://localhost:80/products?category=${category}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    );
  }
  console.log(response.data);

  // Inferred return type: Promise<MyData>
  return await Object.values(response.data)[0];
});
let productCounter;
const productsCount = async () => {
  let response = await axios.get(`http://localhost:80/products`);
  productCounter = Object.values(response.data)[1];
};
let resultPerPageProducts;
const productsPerPage = async () => {
  let response = await axios.get(`http://localhost:80/products`);
  resultPerPageProducts = Object.values(response.data)[2];
};

productsCount();
productsPerPage();
const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    products: [],
    error: false,
    productCount: 0,
    resultPerPage: 0,
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.productCount = productCounter;
      state.resultPerPage = resultPerPageProducts;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export default productSlice.reducer;
