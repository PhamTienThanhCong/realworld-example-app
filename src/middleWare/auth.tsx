import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

const AuthRoutes = () => {
  const isAuth = useContext(AuthContext).auth.logged;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const GuestRoutes = () => {
  const isAuth = useContext(AuthContext).auth.logged;
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export { AuthRoutes, GuestRoutes };
