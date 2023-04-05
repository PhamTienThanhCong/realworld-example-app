export type RegisterUser = {
    username: string;
    email: string;
    password: string;
  }

export type LoginUser = {
    email: string;
    password: string;
}

export interface Auth {
  logged: Boolean,
  user: User,
}

export interface authContext {
  auth: Auth,
  logout: () => void,
  changeProfile: (user: User) => void,
  setLocalStorage: (token: string) => void,
}

export interface User{
  bio: string|null;
  email: string;
  image: string;
  token: string;
  username: string;
  password?: string;
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

export const DEFAULT_USER: User = {
  bio: null,
  email: "",
  image: "",
  token: "",
  username: "",
}

export const DEFAULT_AUTH: Auth = {
  logged: false,
  user: DEFAULT_USER,
}

export const DEFAULT_AUTH_CONTEXT = {
  auth: DEFAULT_AUTH,
  logout: () => {},
  changeProfile: (user: User) => {},
  setLocalStorage: (token: string) => {},
}