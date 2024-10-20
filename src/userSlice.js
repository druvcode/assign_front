// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Async thunk for login
export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, { withCredentials: true });
    return response.data; // Assuming response.data contains user info
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data || 'Login failed');
  }
});

// Async thunk for session check
export const checkUserSession = createAsyncThunk('user/checkSession', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/check`, { withCredentials: true });
    return response.data; // Assuming response.data contains user info if logged in
  } catch (error) {
    return thunkAPI.rejectWithValue('Session not found');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login logic
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })

      // Session check logic
      .addCase(checkUserSession.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(checkUserSession.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
      });
  },
});

export const { logout,updateUser } = userSlice.actions;

export default userSlice.reducer;
