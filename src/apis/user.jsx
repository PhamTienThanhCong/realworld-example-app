import { POST } from "./config";

export const LOGIN = (data) => {
  data = {
    user: {
      ...data,
    },
  };
  return POST("/users/login", data);
};

export const REGISTER = (data) => {
  data = {
    user: {
      ...data,
    },
  };
  return POST("/users", data);
};
