export type RegisterUser = {
    username: string;
    email: string;
    password: string;
  }

export type LoginUser = {
    email: string;
    password: string;
}

export const DEFAULT_REGISTER_USER:RegisterUser = {
    username: "",
    email: "",
    password: "",
  };

export const DEFAULT_LOGIN_USER:LoginUser = { 
    email: "",
    password: "",
};

export interface User{
    bio: string|null;
    email: string;
    image: string;
    token: string;
    username: string;
}