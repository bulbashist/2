import { User } from "app/types";
import { IUser } from "../../types";
import { DeepPartial } from "@reduxjs/toolkit";

export type ChangeIUserDTO = Partial<Omit<IUser, "id">>;

export type ChangeUserDTO = DeepPartial<Omit<User, "id">> | { roleId: number };

export enum UserRoleEnum {
  USER = 1,
  ADMIN = 2,
  BLOCKED = 3,
}
