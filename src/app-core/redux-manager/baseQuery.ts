import {
    BaseQueryApi,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { appConfig } from "@config/app.config";
import { RootState } from "./rootReducer";
import { HttpStatus } from "../@types/http";
import { AuthActions } from "@libs/features/store";

interface IExtraHeaders {
    headers: HeadersInit;
    override?: boolean;
}

const DefaultHeader = (headers: Headers, token: string) => {
    if (token) {
        headers.set(
            "Authorization",
            `${appConfig.authorizationHeader} ${token}`
        );
    }
    headers.set("Content-Type", "application/json");
};

const createBaseQuery = (baseUrl: string, extraHeaders?: IExtraHeaders) => {
    return fetchBaseQuery({
        baseUrl,
        credentials: "same-origin",
        prepareHeaders: (headers, { getState }) => {
            if (!extraHeaders?.override) {
                const token = (getState() as RootState).authReducer
                    .token as string;
                DefaultHeader(headers, token);
            }
            if (extraHeaders) {
                Object.entries(extraHeaders.headers).forEach(([key, value]) => {
                    headers.set(key, value);
                });
            }
            return headers;
        },
    });
};

export const baseQueryWithReAuth =
    (baseUrl: string, extraHeaders?: IExtraHeaders) =>
    async (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions: object
    ) => {
        const baseQuery = createBaseQuery(baseUrl, extraHeaders);
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
                api.dispatch(AuthActions.logout());
            }
        }
        return result;
    };
