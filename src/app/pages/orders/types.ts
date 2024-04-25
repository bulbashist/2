import { Office, Product, Transaction } from "app/types2";
import { ITag } from "../../types";

export type Preview = {
  id: number;
  compositionName: string;
  date: string;
  avgRating: number;
  title: string;
  tags: ITag[];
};

export type OrderStatus = {
  id: number;
  name: string;
};

export type Order = {
  id: number;
  status: OrderStatus;
  products: {
    product: Product;
    count: number;
  }[];
  transaction: Transaction;
  office: Office;
  date: string;
};

export type GetOrderListDTO = {
  uri: string;
  page: number;
};

export type PatchOrderListDTO = {
  id: number;
  statusId: number;
};
