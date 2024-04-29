import { useGetUserQuery } from "@libs/features/auth/auth.service";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
    const { data, isError } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(
        null
    );

    useEffect(() => {
        if (!isError && data !== undefined) setIsAuthenticated(true);
        else if (isError) {
            setIsAuthenticated(false);
        } else setIsAuthenticated(null);
    }, [data, isError]);

    return { isAuthenticated };
};
