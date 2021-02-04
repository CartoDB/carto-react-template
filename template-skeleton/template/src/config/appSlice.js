import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null,
    isolineResult: null,
    bottomSheetOpen: false,
    forceOAuthLogin: false, // enable for an initial Login screen
  },
  reducers: {
    setIsolineResult: (state, action) => {
      state.isolineResult = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBottomSheetOpen: (state, action) => {
      state.bottomSheetOpen = action.payload;
    },
  },
});

export default slice.reducer;

export const setIsolineResult = (payload) => ({ type: 'app/setIsolineResult', payload });
export const setError = (payload) => ({ type: 'app/setError', payload });
export const setBottomSheetOpen = (payload) => ({
  type: 'app/setBottomSheetOpen',
  payload,
});
