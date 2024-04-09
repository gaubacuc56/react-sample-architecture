import { PropsWithChildren, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "@libs/features/auth/auth.slice";
import {
  RETURN_URL_QUERY,
  UNAUTHENTICATED_ENTRY_PATH,
} from "@constant/route.constant";
import { useAuthentication } from "@/libs/hooks/useAuthentication";

type AuthenticationGuardProps = PropsWithChildren<{
  ignore?: boolean;
}>;

const AuthenticationGuard = (props: AuthenticationGuardProps) => {
  const { ignore = true, children } = props;

  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useAuthentication();

  useEffect(() => {
    // User could already login, but there's token expired.
    // Force log out, navigate back to log in screen
    if (!isAuthenticated && !ignore) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated, ignore]);

  if (ignore || isAuthenticated) {
    return <>{children}</>;
  }
  return (
    <Navigate
      to={`${UNAUTHENTICATED_ENTRY_PATH}?${RETURN_URL_QUERY}=${location.pathname}`}
    />
  );
};

export default AuthenticationGuard;
