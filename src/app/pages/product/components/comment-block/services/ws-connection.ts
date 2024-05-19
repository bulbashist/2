import { Socket, io } from "socket.io-client";
import { store } from "../../../../../store/store";
import { CreateCommentDto, WSEvents } from "./types";
import { addComment, deleteComment } from "app/pages/product/store/slice";

class WSConnection {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  connect(uri: string) {
    this.socket = io(uri, { withCredentials: true });

    this.socket.on("createComment", (payload: CreateCommentDto) => {
      store.dispatch(addComment(payload));
    });

    this.socket.on(WSEvents.RemoveComment, (id: number) => {
      store.dispatch(deleteComment(id));
    });
  }

  addComment(args: CreateCommentDto) {
    this.socket?.emit(WSEvents.AddComment, args);
  }

  deleteComment(id: number) {
    this.socket?.emit(WSEvents.RemoveComment, id);
  }

  close() {
    this.socket?.disconnect();
  }
}

export const connection = new WSConnection();
