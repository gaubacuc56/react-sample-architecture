import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "@/libs/features/auth/auth.slice";
import { useAuthentication } from "@/libs/hooks/useAuthentication";
import { RETURN_URL_QUERY, UNAUTHENTICATED_ENTRY_PATH } from "@/constant/route.constant";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useAuthentication();

  useEffect(() => {
    // User could already login, but there's token expired.
    // Force log out, navigate back to log in screen
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated]);

  return isAuthenticated ? (
    <div>
      <h1>Home Layout</h1>
      <Outlet />
    </div>
  ) : (
    <Navigate to={`${UNAUTHENTICATED_ENTRY_PATH}?${RETURN_URL_QUERY}=${location.pathname}`} />
  );
};

export default HomeLayout;
