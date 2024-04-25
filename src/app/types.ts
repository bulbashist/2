import { Comment } from "./types2";

export interface ITag {
  id: number;
  name: string;
}

export interface IReview {
  compositionName: string;
  text: string;
  previewImg?: string;
  avgRating: number;
  userRating: number;
  title: string;
  id: number;
  date: string;
  tags: ITag[];
  comments?: Comment[];
  isLiked?: boolean;
}

export interface IUser {
  id: number;
  login: string;
  password?: string;
  name: string;
  isAdmin: boolean;
  isBlocked: boolean;
  reviews?: IReview[];
}
