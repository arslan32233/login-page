import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPosts } from "../services/postServices";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await getAllPosts();
  return res.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
