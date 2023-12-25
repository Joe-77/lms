import { useContext } from "react";
import { Context } from "../context api/context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = () => {
  const { isLogin } = useContext(Context);

  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectRoutes;
