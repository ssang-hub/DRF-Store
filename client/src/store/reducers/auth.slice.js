import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem(process.env.REACT_APP_APP_NAME) ? true : false,

    user: localStorage.getItem(process.env.REACT_APP_APP_NAME)
      ? {
          ...jwtDecode(JSON.parse(localStorage.getItem(process.env.REACT_APP_APP_NAME)).token),
          token: JSON.parse(localStorage.getItem(process.env.REACT_APP_APP_NAME)).token,
        }
      : undefined,
    cart_number: undefined,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    lougout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.cart_number = undefined;
    },
    refreshToken: (state, action) => {
      state.user = action.payload;
    },
    update_cart_number: (state, action) => {
      state.cart_number = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { updateUser, login, lougout, refreshToken, update_cart_number } = authSlice.actions;
export default authSlice.reducer;
