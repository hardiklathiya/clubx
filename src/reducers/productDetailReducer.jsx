import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProductDetail = createAsyncThunk(
  "productDetail",
  async (id) => {
    const response = await axios.get(`http://localhost:80/product/${id}`);
    console.log();
    return await response.data;
  }
);

const productSlice = createSlice({
  name: "productDetail",
  initialState: {
    loading: true,
    product: [],
    error: false,
  },
  extraReducers: {
    [fetchProductDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [fetchProductDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export default productSlice.reducer;
