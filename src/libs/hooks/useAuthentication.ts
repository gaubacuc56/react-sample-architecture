import { useGetUserQuery } from "@libs/features/auth/service";
import { useAppDispatch, useAppSelector } from "@app-core/redux-manager/method";
import { AppCommonActions, AuthSelectors } from "../features/store";
import { useEffect, useState } from "react";
export const useAuthentication = () => {
	const { refetch } = useGetUserQuery();
	const token = useAppSelector(AuthSelectors.token);
	const dispatch = useAppDispatch();
	const [isAuthenticated, setIsAuthenticated] = useState(token.length > 0);

	useEffect(() => {
		dispatch(AppCommonActions.setAppIsFetching(true));
		refetch()
			.then(() => {
				dispatch(AppCommonActions.setAppIsFetching(false));
				setIsAuthenticated(token.length > 0);
			})
			.catch(() => {
				dispatch(AppCommonActions.setAppIsFetching(false));
			});
	}, [dispatch, refetch, token]);

	return { isAuthenticated };
};
