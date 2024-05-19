import { Office, Product, Transaction } from "app/types";

export type Preview = {
  id: number;
  compositionName: string;
  date: string;
  avgRating: number;
  title: string;
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
    sum: number;
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
