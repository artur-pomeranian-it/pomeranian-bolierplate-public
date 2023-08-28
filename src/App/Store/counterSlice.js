import { createSlice } from '@reduxjs/toolkit';

const name = 'counter-slice';
const initialState = {
  value: 0,
  errorMessage: '',
};
const saveInLocalStorage = (sliceState) => {
  localStorage.setItem(name, JSON.stringify(sliceState));
};

const getFromLocalStorage = () => {
  const stored = localStorage.getItem(name);
  if (!stored) return initialState;
  return JSON.parse(stored);
};

// redux-persist

const counterSlice = createSlice({
  name,
  initialState: getFromLocalStorage(),
  reducers: {
    increment: (state) => {
      state.value += 1;
      saveInLocalStorage(state);
    },
    incrementByAmount: (state, action) => {
      const amount = action.payload;
      state.value += amount;
      saveInLocalStorage(state);
    },
    decrement: (state) => {
      state.value -= 1;
      saveInLocalStorage(state);
    },
    decrementByAmount: (state, action) => {
      const amount = action.payload;
      state.value -= amount;
      saveInLocalStorage(state);
    },
    reset: (state) => {
      state.value = 0;
      saveInLocalStorage(state);
    },
    decrementWithEnsure: (state, action) => {
      const amount = action.payload;
      if (state.value - amount < 0) {
        state.errorMessage = 'Wynik nie może być mniejszy niż zero.';
        state.value = 0;
      } else {
        state.errorMessage = '';
        state.value -= amount;
      }
      saveInLocalStorage(state);
    },
  },
});

export const selectValue = (store) => store?.counterSlice?.value;
export const selectErrorMessage = (store) => store?.counterSlice?.errorMessage;
export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  reset,
  decrementWithEnsure,
} = counterSlice.actions;
export default counterSlice.reducer;
