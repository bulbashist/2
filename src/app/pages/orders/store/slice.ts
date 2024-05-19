import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order } from "app/pages/orders/types";

type State = {
  data: Order[] | null;
  loading: boolean;
  error: boolean;
};

const initialState: State = {
  data: null,
  loading: false,
  error: false,
};

//TODO: ADD pagination
const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.data = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.data = [action.payload, ...state.data!];
    },
    changeOrderStatus: (
      state,
      action: PayloadAction<Pick<Order, "id" | "status">>
    ) => {
      state.data = state.data!.map((order) => {
        if (order.id === action.payload.id) {
          return {
            ...order,
            status: action.payload.status,
          };
        } else return order;
      });
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.data = state.data!.filter((order) => order.id !== action.payload);
    },
    resetOrders: (state) => {
      state.data = [];
    },
    pushInquiry: (state) => {
      // state.loading = true;
    },
  },
});

export const {
  setOrders,
  addOrder,
  changeOrderStatus,
  deleteOrder,
  resetOrders,
} = slice.actions;
export default slice.reducer;
