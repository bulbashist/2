import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "app/types";

export type CartProduct = {
  product: Product;
  count: number;
};

type ChangeCartProductDTO = {
  id: number;
  amount: number;
};

const slice = createSlice({
  name: "cart",
  initialState: [] as CartProduct[],
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const index = state.findIndex(
        (slice) => slice.product.id === action.payload.product.id
      );
      if (index !== -1) {
        return state.map((product, i) => {
          if (i === index) {
            return {
              ...product,
              count: product.count + action.payload.count,
            };
          } else return product;
        });
      } else return [...state, action.payload];
    },
    changeProductAmount: (
      state,
      action: PayloadAction<ChangeCartProductDTO>
    ) => {
      if (action.payload.amount === 0)
        return state.filter((slice) => slice.product.id !== action.payload.id);

      return state.map((slice) => {
        if (slice.product.id === action.payload.id) {
          return {
            ...slice,
            count: action.payload.amount,
          };
        } else return slice;
      });
    },
    deleteFromCart: (state, action: PayloadAction<number>) =>
      state.filter((slice) => slice.product.id !== action.payload),
    resetCart: () => [],
  },
});

export const { addToCart, changeProductAmount, deleteFromCart, resetCart } =
  slice.actions;
export default slice.reducer;
