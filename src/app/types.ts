import { Order } from "./pages/orders/types";

export enum UserRights {
  REGISTRED = 0b1,
  SELLER = 0b10,
  ADMIN = 0b100,
}

export type Photo = {
  id: number;
  url: string;
};

export type Manufacturer = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  width: number;
  breadth: number;
  height: number;
  price: number;
  description: string;
  // count: number;  diploma??
  seller: User;
  manufacturer: Manufacturer;
  category: Category;
  photos: Photo[];
  comments: Comment[];
  avgRating?: number;
};

export type Transaction = {
  id: number;
  date: string;
  sum: number;
};

export type Office = {
  id: number;
  location: string;
  lng: number;
  lat: number;
};

/* 0 0 0 0 0 blocked admin user */
export type UserRole = {
  id: number;
  name: string;
  rights: number;
};

export type Paycard = {
  id: number;
  cardNumber: string;
  validThrough: string;
  cvv: number;
};

export type User = {
  id: number;
  login: string;
  password: string;
  name?: string;
  role: UserRole;
  cards: Paycard[];
  orders?: Order[];
};

export type Comment = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  date: string;
  text: string;
  rating: number;
};

export interface IUser {
  id: number;
  login: string;
  password?: string;
  name: string;
  isAdmin: boolean;
  isBlocked: boolean;
  products?: Product[];
}
