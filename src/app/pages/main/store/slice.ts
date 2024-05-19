import { createSlice } from "@reduxjs/toolkit";

type State = {
  filter: number;
  category: string | null;
};

const initialState: State = {
  filter: 0,
  category: null,
};

const slice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { changeFilter, changeCategory } = slice.actions;
export default slice.reducer;
