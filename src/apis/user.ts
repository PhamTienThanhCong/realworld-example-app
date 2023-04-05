import { POST, GET, PUT } from "./config";
import { LoginUser, RegisterUser, User } from "../models/user";

export const login = (data:LoginUser) => {
  return POST("/users/login", { user: data });
};

export const register = (data:RegisterUser) => {
  return POST("/users", { user: data });
};

export const getCurrentUser = () => {
  return GET("/user");
}

export const updateCurrentUser = (data:User) => {
  return PUT("/user", { user: data });
}