import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ChangeUserDTO } from "../types";
import { usersURL } from "../../../constants/urls";
import { User } from "app/types";

type ThunkArgs = {
  id: number;
  dto: ChangeUserDTO;
};

type State = {
  users: User[];
  loading: boolean;
};

const initialState: State = {
  users: [],
  loading: false,
};

const getUsers = createAsyncThunk("get-users", async () => {
  const response = await axios.get(usersURL, { withCredentials: true });
  return response.data;
});

const changeUser = createAsyncThunk(
  "change-user",
  async ({ id, dto }: ThunkArgs) => {
    const response = await axios.patch(usersURL + id, dto, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  }
);

const deleteUser = createAsyncThunk("delete-user", async (id: number) => {
  await axios.delete(usersURL + id, { withCredentials: true });
  return id;
});

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return { ...user, ...action.payload };
          } else return user;
        });
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      }),
});

export { getUsers, changeUser, deleteUser };
export default slice.reducer;
