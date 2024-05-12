import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "app/constants/urls";
import { User } from "app/types";
import { paycardsURI } from "app/constants/urls";
import { AddPaycardDto, ChangeNameDto } from "./types";

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

const addPaycard = createAsyncThunk(
  "user-add-paycard",
  async (data: AddPaycardDto) => {
    const resp = await axios.post(paycardsURI, data);
    return resp.data;
  }
);

const removePaycard = createAsyncThunk(
  "user-remove-paycard",
  async (id: number) => {
    await axios.delete(paycardsURI + id);
    return id;
  }
);

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
      .addCase(addPaycard.fulfilled, (state, action) => {
        state.data!.cards = [...state.data!.cards, action.payload];
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.data!.name = action.payload;
      })
      .addCase(removePaycard.fulfilled, (state, action) => {
        const index = state.data?.cards.findIndex(
          (card) => card.id === action.payload
        );
        return {
          loading: false,
          data: {
            ...state.data!,
            cards: state.data!.cards.filter((v, i) => i !== index),
          },
        };
        // state.data!.cards = state.data!.cards.filter((v, i) => i !== index);
      }),
});

export { getUserData, changeUserName, addPaycard, removePaycard };
export default slice.reducer;
