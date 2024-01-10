import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth.slice';

const store = configureStore({
  reducer: {
    authState: authSlice,
  },
});
export default store;
