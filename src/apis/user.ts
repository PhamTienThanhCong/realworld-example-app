import { POST } from "./config";
import { LoginUser, RegisterUser } from "../models/user";

export const login = (data:LoginUser) => {
  return POST("/users/login", { user: data });
};

export const register = (data:RegisterUser) => {
  return POST("/users", { user: data });
};
