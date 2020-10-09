import { configureStore } from '@reduxjs/toolkit';
import cartoReducer from './cartoSlice';

export default configureStore({
  reducer: {
    carto: cartoReducer,
  },
});
