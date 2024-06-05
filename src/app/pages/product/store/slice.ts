import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "./products/thunks";
import { Product } from "app/types";
import axios from "axios";
import { productsURI } from "app/constants/urls";

type State = {
  data: null | Product;
  isBeingEdited: boolean;
  loading: boolean;
};

const initialState: State = {
  data: null,
  isBeingEdited: false,
  loading: false,
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
      state.data!.comments = [action.payload, ...state.data!.comments];
    },
    deleteComment: (state, action) => {
      state.data!.comments = state.data!.comments.filter(
        (comment) => comment.id !== action.payload
      );
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
  // .addCase(
  //   changeRating.fulfilled,
  //   (state, action: PayloadAction<number>) => {
  //     state.product!.userRating = action.payload;
  //   }
  // )
  // .addCase(
  //   changeLike.fulfilled,
  //   (state, action: PayloadAction<boolean>) => {
  //     state.review!.isLiked = action.payload;
  //   }
  // ),
});

export { getProduct, removeProduct };
export const { setEditingState, addComment, deleteComment } = slice.actions;
export default slice.reducer;
