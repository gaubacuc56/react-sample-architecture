import React, { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "@/features/auth/auth.slice";
import { useAuthentication } from "@/features/auth";

interface IPrivateRouteWrapper {
  children: ReactNode;
}

const PrivateRouteWrapper: React.FC<IPrivateRouteWrapper> = ({ children }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated]);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/auth/signin?url=${location.pathname}`}></Navigate>
  );
};

export default PrivateRouteWrapper;
