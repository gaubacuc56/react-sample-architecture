import { PropsWithChildren, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "@libs/features/auth/auth.slice";
import {
    RETURN_URL_QUERY,
    UNAUTHENTICATED_ENTRY_PATH,
} from "@constant/route.constant";
import { useAuthentication } from "@/libs/hooks/useAuthentication";

const AuthenticationGuard = (props: PropsWithChildren) => {
    const { children } = props;

    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const { isAuthenticated } = useAuthentication();

    useEffect(() => {
        if (isAuthenticated !== null && !isAuthenticated) dispatch(logout());
    }, [isAuthenticated, dispatch]);

    if (isAuthenticated !== null && isAuthenticated) {
        return <>{children}</>;
    } else if (isAuthenticated !== null && !isAuthenticated)
        return (
            <Navigate
                to={`${UNAUTHENTICATED_ENTRY_PATH}?${RETURN_URL_QUERY}=${pathname}`}
            />
        );
};

export default AuthenticationGuard;
