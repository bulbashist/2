import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "./products/thunks";
import { Product } from "app/types";
import axios from "axios";
import { productsURI } from "app/constants/urls";

type State = {
  data: null | Product;
  isBeingEdited: boolean;
  loading: boolean;
  err: boolean;
  errMsg: string;
};

const initialState: State = {
  data: null,
  isBeingEdited: false,
  loading: false,
  err: false,
  errMsg: "",
};

const removeProduct = createAsyncThunk("remove-product", (id: number) => {
  return axios.delete(productsURI + id, { withCredentials: true });
});

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setEditingState: (state, action) => {
      state.isBeingEdited = action.payload;
    },
    addComment: (state, action) => {
      if (action.payload.err) {
        state.err = true;
        state.errMsg = action.payload.msg;
      } else {
        state.data!.comments = [action.payload, ...state.data!.comments];
      }
    },
    deleteComment: (state, action) => {
      state.data!.comments = state.data!.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    resetError: (state) => {
      state.err = false;
      state.errMsg = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(removeProduct.fulfilled, (state, _) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(removeProduct.pending, (state, _) => {
        state.loading = true;
      }),
});

export { getProduct, removeProduct };
export const { setEditingState, addComment, deleteComment, resetError } =
  slice.actions;
export default slice.reducer;
