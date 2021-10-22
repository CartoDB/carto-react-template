---
to: src/store/<%= h.changeCase.camelCase(file_name) -%>.ts
---
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '<%= h.changeCase.camelCase(name) -%>',
  initialState: {
    data: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default slice.reducer;

export const setData = (payload: any) => ({ type: '<%= h.changeCase.camelCase(name) -%>/setData', payload });
