import {
	BaseQueryApi,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { appConfig } from "@config/app.config";
import { RootState } from "./rootReducer";
import { HttpStatus } from "../@types/http";
import { logout } from "@libs/features/store";

export const baseHeader = fetchBaseQuery({
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

export const baseQueryWithReAuth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	const result = await baseHeader(args, api, extraOptions);
	if (result?.error?.status === HttpStatus.FORBIDDEN) {
		const refreshResult = await baseHeader(
			"auth/refresh",
			api,
			extraOptions
		);
		if (refreshResult?.data) {
			//Retry the last query with new token
			await baseHeader(args, api, extraOptions);
		} else {
			api.dispatch(logout());
		}
	}
	return result;
};

export const baseQuery = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	return await baseHeader(args, api, extraOptions);
};
