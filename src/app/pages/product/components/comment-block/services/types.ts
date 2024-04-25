export enum WSEvents {
  AddComment = "createComment",
  RemoveComment = "removeComment",
}

export type CreateCommentDto = {
  user: number;
  product: number;
  text: string;
};

export type RemoveCommentDto = {
  id: number;
};
