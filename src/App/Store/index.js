import { configureStore } from '@reduxjs/toolkit';
import { testSlice } from './testSlice';

export const store = configureStore({
  reducer: {
    testSlice: testSlice.reducer,
  },
});
