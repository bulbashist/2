import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "app/constants/urls";
import { User } from "app/types";

type State = {
  data: User | null;
  loading: boolean;
  error: boolean;
  nameError: boolean;
};

const initialState: State = {
  data: null,
  loading: false,
  error: false,
  nameError: false,
};

const getUserData = createAsyncThunk("load-user-data", async (id: number) => {
  return axios.get(usersURL + id).then((res) => res.data);
});

const slice = createSlice({
  name: "user-data",
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.name = action.payload;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      }),
});

export { getUserData };
export const { changeUserName } = slice.actions;
export default slice.reducer;
