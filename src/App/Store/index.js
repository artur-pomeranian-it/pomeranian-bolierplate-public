import { configureStore } from '@reduxjs/toolkit';
import { storeTest } from './storeTest';

export const store = configureStore({
  reducer: {
    testSlice: storeTest.reducer,
  },
});
