import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  searchText: string | null;
};

const initialState: InitialState = {
  searchText: null,
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { changeSearchText } = slice.actions;
export default slice.reducer;
