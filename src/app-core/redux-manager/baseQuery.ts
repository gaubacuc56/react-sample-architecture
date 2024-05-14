import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { appConfig } from "@config/app.config";
import { RootState } from "./rootReducer";
import { HttpStatus } from "../@types/http";
import { logout } from "@libs/features/store";

const baseQuery = fetchBaseQuery({
	baseUrl: `${appConfig.apiDomain_dev}`,
	prepareHeaders: (headers, { getState }) => {
		// You can add or modify headers here based on your needs
		const token = (getState() as RootState).authReducer.token;
		if (token) {
			headers.set(
				"Authorization",
				`${appConfig.authorizationHeader} ${token}`
			);
		}
		headers.set("Content-Type", "application/json");
		return headers;
	},
});

const baseQueryWithReAuth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	const result = await baseQuery(args, api, extraOptions);
	if (result?.error?.status === HttpStatus.UNAUTHORIZED) {
		const refreshResult = await baseQuery(
			"auth/refresh",
			api,
			extraOptions
		);
		if (refreshResult?.data) {
			//Retry the last query with new token
			await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logout());
		}
	}
	return result;
};

export const AppService = createApi({
	reducerPath: "AppService",
	baseQuery: baseQueryWithReAuth,
	endpoints: () => ({}),
});

export const rtkQueryService = {
	[AppService.reducerPath]: AppService.reducer,
};

export const rtkQueryMiddleware = [AppService];
