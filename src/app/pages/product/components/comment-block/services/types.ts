export enum WSEvents {
  AddComment = "createComment",
  RemoveComment = "removeComment",
}

export type CreateCommentDto = {
  user: {
    id: number;
  };
  product: {
    id: number;
  };
  text: string;
  rating: number;
};

export type RemoveCommentDto = {
  id: number;
};

export enum WSOrderEvents {
  FindAllOrders = "findAllOrders",
  FindOneOrder = "findOneOrder",
  UpdateOrder = "updateOrder",
  CreateOrder = "createOrder",
  RemoveOrder = "removeOrder",
}
