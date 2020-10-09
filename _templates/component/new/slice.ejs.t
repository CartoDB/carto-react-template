---
to: "<%= slice ? `src/features/${name}/${h.changeCase.camelCase(name)}Slice.js` : null %>"
---
<% const comp = h.changeCase.camelCase(name) -%>
<% const compParam = h.changeCase.paramCase(name) -%>
import { createSlice } from '@reduxjs/toolkit';

export const <%= comp %>Slice = createSlice({
  name: '<%= comp %>',
  initialState: {
    data: undefined,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = <%= comp %>Slice.actions;

export const setDataAsync = data => dispatch => {
  setTimeout(() => {
    dispatch(setData(data));
  }, 1000);
};

export const selectData = state => state.<%= comp %>.data;

export default <%= comp %>Slice.reducer;
