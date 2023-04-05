import { useState, createContext, useLayoutEffect } from "react";
import {
  User,
  authContext,
  DEFAULT_AUTH,
  DEFAULT_AUTH_CONTEXT,
  Auth,
} from "../models/user";
import { getCurrentUser } from "../apis/user";
import Loading from "../components/web/Loading";

export const AuthContext = createContext<authContext>(DEFAULT_AUTH_CONTEXT);

// Provide Context
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<Auth>(DEFAULT_AUTH);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  const logout = () => {
    setAuth(DEFAULT_AUTH);
    localStorage.removeItem("token");
  };
  
  const login = (user: User) => {
    setAuth({ logged: true, user: user });
  };
  const changeProfile = (user: User) => {
    if (!auth.logged) return;
    setAuth({ logged: true, user });
  };
  const setLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const value: authContext = {
    auth,
    logout,
    changeProfile,
    setLocalStorage,
  };
  
  async function fetchUser() {
    const user:any = await getCurrentUser();
    login(user.data.user);
    setLoading(false);
  }
  
  useLayoutEffect(() => {
    setLoading(true);
    if (token !== "") {
      try {  
        fetchUser();
      } catch (error) {
        localStorage.removeItem("token");
        logout();
        setLoading(false);
      }
    } else {
      logout();
      setLoading(false);
    }
  }, [token]);
  

  return <AuthContext.Provider value={value}>
    {
      loading ? <Loading heightValue="100vh" sizeValue="xl" /> : children
    }
  </AuthContext.Provider>;
};
