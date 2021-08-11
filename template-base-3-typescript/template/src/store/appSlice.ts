import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  error: string | null;
  forceOAuthLogin: boolean;
}

const initialState: AppState = {
  error: null,
  forceOAuthLogin: false, // enable for an initial Login screen
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

export const setError = (payload: unknown) => ({ type: 'app/setError', payload });
export const setBottomSheetOpen = (payload: unknown) => ({
  type: 'app/setBottomSheetOpen',
  payload,
});
