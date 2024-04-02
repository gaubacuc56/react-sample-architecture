import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "@/features/auth/auth.slice";
import { useAuthentication } from "@/hooks/useAuthentication";

const PrivateRoute = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/auth/signin?url=${location.pathname}`}></Navigate>
  );
};

export default PrivateRoute;
