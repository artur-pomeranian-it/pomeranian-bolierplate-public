import { configureStore } from '@reduxjs/toolkit';
import testSlice from './testSlice';

export const store = configureStore({
  reducer: {
    // we can omit this line on purpose to show debugging of store
    testSlice,
  },
});
