import { configureStore } from '@reduxjs/toolkit';
import user from './reducer';

export const store = configureStore({
  reducer: {
    user: user,
  },
});
