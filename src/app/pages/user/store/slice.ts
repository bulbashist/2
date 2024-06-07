import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "app/constants/urls";
import { User } from "app/types";
import { ChangeNameDto } from "./types";

type State = {
  data: User | null;
  loading: boolean;
};

const initialState: State = {
  data: null,
  loading: false,
};

const getUserData = createAsyncThunk("load-user-data", async (id: number) => {
  const response = await axios.get(usersURL + id);
  return response.data;
});

const changeUserName = createAsyncThunk(
  "user-change-name-1",
  async (data: ChangeNameDto) => {
    await axios.patch(
      usersURL + data.id,
      { name: data.name },
      { withCredentials: true }
    );

    return data.name;
  }
);

const slice = createSlice<State, any>({
  name: "user-data",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })

      .addCase(changeUserName.fulfilled, (state, action) => {
        state.data!.name = action.payload;
      }),
});

export { getUserData, changeUserName };
export default slice.reducer;
