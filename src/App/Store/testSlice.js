import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {
    profile: 'retail',
  },
  darkMode: false,
};

export const storeTest = createSlice({
  name: 'store-test',
  initialState,
  reducers: {
    toggleProfile: (sliceState) => {
      if (sliceState.userProfile.profile === 'retail') {
        sliceState.userProfile.profile = 'business';
      } else {
        sliceState.userProfile.profile = 'retail';
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleProfile, toggleDarkMode } = storeTest.actions;

export const selectProfile = (state) => state?.testSlice?.userProfile?.profile;
export default storeTest.reducer;
