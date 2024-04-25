import { Comment } from "app/types2";
import { ITag } from "../../types";

export interface IReview {
  id: number;
  composition: {
    name: string;
    tag: ITag;
  };
  text: string;
  title: string;
  author: {
    id: number;
    name: string;
  };
  date: string;
  avgRating: number;
  userRating: number;
  isLiked: boolean;
  tags: ITag[];
  comments: Comment[];
}
