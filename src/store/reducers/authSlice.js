import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendApi from "../../Utils/backendApi";

const saveToStorage = (token, user) => {
  localStorage.setItem("movix_token", token);
  localStorage.setItem("movix_user", JSON.stringify(user));
};
const clearStorage = () => {
  localStorage.removeItem("movix_token");
  localStorage.removeItem("movix_user");
};

//REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await backendApi.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // for avatar upload
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Registration failed");
    }
  }
);

//LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Trying login with:", email); 
      const response = await backendApi.post("/login", { email, password });
      console.log("Login response:", response.data); 
      const { token, user } = response.data;
      saveToStorage(token, user);
      return { token, user };
    } catch (err) {
      console.log("Login error:", err); 
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

//GET CURRENT USER
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await backendApi.get("/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch user");
    }
  }
);

//SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:    JSON.parse(localStorage.getItem("movix_user")) || null,
    token:   localStorage.getItem("movix_token") || null,
    loading: false,
    error:   null,
    success: null,
  },
  reducers: {
    logout(state) {
      state.user  = null;
      state.token = null;
      state.error = null;
      clearStorage();
    },
    clearMessages(state) {
      state.error   = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(registerUser.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // Login
    builder
      .addCase(loginUser.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
        state.success = "Login successful!";
      })
      .addCase(loginUser.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending,   (state) => { state.loading = true; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload;
      })
      .addCase(fetchCurrentUser.rejected,  (state) => {
        state.loading = false;
        state.user    = null;
        clearStorage();
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
