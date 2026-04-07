import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

/* ================= TYPES ================= */

interface User {
  id: string;
  username: string;
  name: string,
  token: string;
}

interface SignupInput {
  name: string;
  username: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

/* ================= ASYNC ACTION ================= */

export const loginUser = createAsyncThunk<
  User,
  LoginInput,
  { rejectValue: string }
>("auth/loginUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/login", userData);

    Cookies.set("access_token", response.data.token);
    Cookies.set("name", response.data.token);
    Cookies.set("username", response.data.token);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const signupUser = createAsyncThunk<
  User,
  SignupInput,
  { rejectValue: string }
>("auth/signupUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/register", userData);

    Cookies.set("access_token", response.data.token);
    Cookies.set("name", response.data.token);
    Cookies.set("username", response.data.token);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove('access_token');
    },
    setError: (state, action) => {
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;