import { useEffect, useState } from "react";
import { useGetUserQuery } from "@libs/features/auth/auth.service";
import { useAppDispatch } from "@/app-core/redux-manager/method";
import { setAppIsFetching } from "../features/store";

export const useAuthentication = () => {
	const { data, isError, isFetching } = useGetUserQuery(undefined, {
		// Always check if current token is expired when window is reloaded
		refetchOnMountOrArgChange: true,
	});

	const dispatch = useAppDispatch();

	const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(
		null
	);

	useEffect(() => {
		if (!isError && data !== undefined) setIsAuthenticated(true);
		else if (isError) {
			setIsAuthenticated(false);
		} else setIsAuthenticated(null);
	}, [data, isError]);

	useEffect(() => {
		dispatch(setAppIsFetching(isFetching));
	}, [isFetching]);

	return { isAuthenticated };
};
