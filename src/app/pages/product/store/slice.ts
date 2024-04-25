import { createSlice } from "@reduxjs/toolkit";
import { getProduct, deleteReview } from "./products/thunks";
import { Comment, Product } from "app/types2";

type State = {
  product: null | Product;
  isBeingEdited: boolean;
  loading: boolean;
};

const initialState: State = {
  product: null,
  isBeingEdited: false,
  loading: false,
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setEditingState: (state, action) => {
      state.isBeingEdited = action.payload;
    },
    addComment: (state, action) => {
      console.log(action.payload);
      state.product!.comments = [action.payload, ...state.product!.comments];
    },
    deleteComment: (state, action) => {
      state.product!.comments = state.product!.comments.filter(
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
        state.product = action.payload;
        state.loading = false;
      })

      .addCase(deleteReview.fulfilled, (state, _) => {
        state.product = null;
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

export { getProduct, deleteReview };
export const { setEditingState, addComment, deleteComment } = slice.actions;
export default slice.reducer;
