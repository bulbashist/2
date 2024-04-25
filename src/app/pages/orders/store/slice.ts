import axios from "axios";
import { DeepPartial, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersURI } from "app/constants/urls2";
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

const getOrderList = createAsyncThunk("orderlist-get", async (page: number) => {
  return axios.get(ordersURI).then((resp) => resp.data);
});

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

const slice = createSlice<State, any, any>({
  name: "orderlist",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getOrderList.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(deleteOrderFromList.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteOrderFromList.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteOrderFromList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = state.data!.filter((v) => v.id !== action.payload);
      })
      .addCase(changeOrderStatusFromList.fulfilled, (state, action) => {
        state.data = state.data!.map((order) => {
          if (order.id === action.payload.id) {
            return {
              ...order,
            };
          } else return order;
        });
      }),
});

export { getOrderList, deleteOrderFromList, changeOrderStatusFromList };
export default slice.reducer;
