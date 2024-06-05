import { User } from "app/types";
import { IUser } from "../../types";
import { DeepPartial } from "@reduxjs/toolkit";

export type ChangeIUserDTO = Partial<Omit<IUser, "id">>;

export type ChangeUserDTO = DeepPartial<Omit<User, "id">> | { roleId: number };

export enum UserRoleEnum {
  USER = 1,
  SELLER = 2,
  ADMIN = 3,
  BLOCKED = 4,
}
