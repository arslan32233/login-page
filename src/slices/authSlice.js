import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../services/authServices";
import { toast } from "react-toastify";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await loginUser(credentials);
      toast.success(res.message || "Login successful!");
      return { user: res.user, token: res.token, expiry: res.expiry || 3600 };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await signupUser(data); 
      toast.success(res.message || "Signup successful!");
      return res;
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    tokenExpiry: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.tokenExpiry = action.payload.tokenExpiry || null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
    },
    setTokenExpiry: (state, action) => {
      state.tokenExpiry = action.payload;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.tokenExpiry = Date.now() + action.payload.expiry * 1000;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, logout, setTokenExpiry } = authSlice.actions;
export default authSlice.reducer;
