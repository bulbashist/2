export enum WSEvents {
  AddComment = "createComment",
  RemoveComment = "removeComment",
}

export type CreateCommentDto = {
  user: number;
  product: number;
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
