import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "@libs/features/auth/auth.slice";
import {
  RETURN_URL_QUERY,
  UNAUTHENTICATED_ENTRY_PATH,
} from "@constant/route.constant";
import { useGetUserQuery } from "@libs/features/auth/auth.service";

const AuthenticationGuard = (props: PropsWithChildren) => {
  const { children } = props;
  const { data, isError, isSuccess } = useGetUserQuery();

  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isError && data !== undefined) setIsAuthenticated(true);
    else if (isError) {
      dispatch(logout());
      setIsAuthenticated(false);
    } else setIsAuthenticated(null);
  }, [data, dispatch, isError, isSuccess]);

  if (isAuthenticated !== null && isAuthenticated) {
    return <>{children}</>;
  }

  else if (isAuthenticated !== null && !isAuthenticated)
  return (
    <Navigate
      to={`${UNAUTHENTICATED_ENTRY_PATH}?${RETURN_URL_QUERY}=${pathname}`}
    />
  );
};

export default AuthenticationGuard;
