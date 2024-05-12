import { Socket, io } from "socket.io-client";
import { store } from "app/store/store";
import { Order } from "app/pages/orders/types";
import {
  addOrder,
  changeOrderStatus,
  deleteOrder,
  setOrders,
} from "../store/slice";
import { WSOrderEvents } from "../../product/components/comment-block/services/types";
import { setOrder } from "app/pages/order/store/slice";

class WSOrderConnection {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  connect(uri: string, token: string) {
    this.socket = io(uri, {
      auth: {
        token,
      },
    });

    if (token) {
      this.socket.on(WSOrderEvents.FindAllOrders, (payload: Order[]) => {
        store.dispatch(setOrders(payload));
      });

      this.socket.on(WSOrderEvents.FindOneOrder, (payload: Order) => {
        store.dispatch(setOrder(payload));
      });

      this.socket.on(WSOrderEvents.CreateOrder, (payload: Order) => {
        store.dispatch(addOrder(payload));
      });

      this.socket.on("updateOrder", (payload: any) => {
        store.dispatch(changeOrderStatus(payload));
      });

      this.socket.on("removeOrder", (payload: number) => {
        store.dispatch(deleteOrder(payload));
      });
    }
  }

  emit(event: string, ...args: any) {
    this.socket?.emit(event, ...args);
  }

  close() {
    this.socket?.disconnect();
  }
}

export const orderWSC = new WSOrderConnection();
