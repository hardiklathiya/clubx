import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk("products", async () => {
  const response = await axios.get("http://localhost:80/products");
  // Inferred return type: Promise<MyData>
  return await Object.values(response.data)[0];
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    products: [],
    error: false,
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export default productSlice.reducer;
