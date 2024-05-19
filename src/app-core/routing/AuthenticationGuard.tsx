import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
    RETURN_URL_QUERY,
    UNAUTHENTICATED_ENTRY_PATH,
} from "@constant/route.constant";
import { useAuthentication } from "@libs/hooks/useAuthentication";

const AuthenticationGuard = (props: PropsWithChildren) => {
    const { children } = props;

    const { pathname } = useLocation();

    const { isAuthenticated } = useAuthentication();

    const handleNavigate = () => {
        console.log("here");
    };

    if (isAuthenticated !== null && isAuthenticated) {
        return <>{children}</>;
    } else if (isAuthenticated !== null && !isAuthenticated) {
        handleNavigate();
        return (
            <Navigate
                to={`${UNAUTHENTICATED_ENTRY_PATH}?${RETURN_URL_QUERY}=${pathname}`}
            />
        );
    }
};

export default AuthenticationGuard;
