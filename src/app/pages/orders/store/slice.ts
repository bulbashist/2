import axios from "axios";
import {
  DeepPartial,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { ordersURI } from "app/constants/urls";
import { Order, OrderStatus, PatchOrderListDTO } from "app/pages/orders/types";

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

const changeOrderStatusFromList = createAsyncThunk(
  "orderlist-change-status",
  async (data: PatchOrderListDTO) => {
    return axios
      .patch(ordersURI + data.id, {
        status: {
          id: data.statusId,
        },
      })
      .then(() => data);
  }
);

const deleteOrderFromList = createAsyncThunk(
  "orderlist-delete",
  async (id: number) => {
    return axios.delete<number>(ordersURI + id).then((resp) => resp.data);
  }
);

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

export { deleteOrderFromList, changeOrderStatusFromList };
export const {
  setOrders,
  addOrder,
  changeOrderStatus,
  deleteOrder,
  resetOrders,
} = slice.actions;
export default slice.reducer;
