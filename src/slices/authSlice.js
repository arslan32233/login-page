import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../services/authServices";

export const loginThunk = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await loginUser(credentials);
    return response.user; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Login failed");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      
  },
});

export const { setProfile, logout } = authSlice.actions;
export default authSlice.reducer;
