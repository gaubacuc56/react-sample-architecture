import { useEffect, useState } from "react";
import { useGetUserQuery } from "@libs/features/auth/auth.service";
import { useAppDispatch } from "@app-core/redux-manager/method";
import { AppCommonActions } from "../features/store";

export const useAuthentication = () => {
	const { data, isError, isFetching } = useGetUserQuery(undefined, {
		// Always check if current token is expired when window is reloaded
		refetchOnMountOrArgChange: true,
	});

	console.log("data", data);

	const dispatch = useAppDispatch();

	const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(
		null
	);

	useEffect(() => {
		dispatch(AppCommonActions.setAppIsFetching(isFetching));
	}, [isFetching]);

	useEffect(() => {
		if (!isError && data !== undefined) setIsAuthenticated(true);
		else if (isError) {
			setIsAuthenticated(false);
		} else setIsAuthenticated(null);
	}, [data, isError]);

	return { isAuthenticated };
};
