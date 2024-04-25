import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersURI } from "app/constants/urls2";
import { Order, OrderStatus } from "app/pages/orders/types";
import { Office, User } from "app/types2";
import { CartProduct } from "app/pages/cart/slice";

type State = {
  data: Order | null;
  loading: boolean;
  error: boolean;
};

const initialState: State = {
  data: null,
  loading: false,
  error: false,
};

type CreateOrderDto = {
  office: Pick<Office, "id">;
  user: Pick<User, "id">;
  products: CartProduct[];
  status: Pick<OrderStatus, "id">;
};

const getOrder = createAsyncThunk("getOrder", async (id: number) => {
  const response = await axios.get(ordersURI + id, {
    withCredentials: true,
  });
  return response.data;
});

const createOrder = createAsyncThunk(
  "create-order",
  async (data: CreateOrderDto) => {
    await axios.post<never, never, CreateOrderDto>(ordersURI, data);

    // TODO
  }
);

const deleteOrder = createAsyncThunk("delete-order", async (id: number) => {
  const resp = await axios.delete(ordersURI + id);
  return resp.data;
});

const changeRating = createAsyncThunk(
  "change-comp-rating",
  async ({ id, score }: { id: number; score: number }) => {
    await axios.patch("" + id, { score }, { withCredentials: true });
    return score;
  }
);

const slice = createSlice<State, any, any>({
  name: "composition-page-store",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.fulfilled, () => {})
      .addCase(deleteOrder.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = true;
      }),
  // .addCase(changeRating.fulfilled, (state, action) => {
  //   state.data!.userRating = action.payload;
  //   state.loading = false;
  // }),
});

export { getOrder, changeRating, createOrder, deleteOrder };
export default slice.reducer;
