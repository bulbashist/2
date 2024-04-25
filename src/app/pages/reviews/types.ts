import { ITag } from "../../types";

export type Preview = {
  id: number;
  compositionName: string;
  date: string;
  avgRating: number;
  title: string;
  tags: ITag[];
};
