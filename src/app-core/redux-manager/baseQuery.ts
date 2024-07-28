import {
    BaseQueryApi,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { appConfig } from "@config/app.config";
import { AuthActions } from "@libs/features/store";

import { RootState } from "./rootReducer";
import { HttpProtocol, HttpStatus } from "../@types/http";

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

const createBaseQuery = (
    baseUrl: string,
    extraHeaders?: IExtraHeaders,
    refresh?: boolean
) => {
    return fetchBaseQuery({
        baseUrl,
        credentials: "same-origin",
        prepareHeaders: (headers, { getState }) => {
            if (refresh !== undefined && refresh === true) {
                const refreshToken = (getState() as RootState).authReducer
                    .refreshToken as string;
                DefaultHeader(headers, refreshToken);
                return headers;
            } else {
                if (!extraHeaders?.override) {
                    const token = (getState() as RootState).authReducer
                        .token as string;
                    DefaultHeader(headers, token);
                }
                if (extraHeaders) {
                    Object.entries(extraHeaders.headers).forEach(
                        ([key, value]) => {
                            headers.set(key, value);
                        }
                    );
                }
                return headers;
            }
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
            // Base query with refresh token as header.
            const refreshBaseQuery = createBaseQuery(baseUrl, undefined, true);
            const refreshResult = await refreshBaseQuery(
                {
                    url: "auth/refresh-token",
                    method: HttpProtocol.POST,
                },
                api,
                extraOptions
            );
            if (refreshResult?.data) {
                const newData = refreshResult.data as {
                    token: string;
                    refreshToken: string;
                };
                // Retrieve and store new user data.
                api.dispatch(AuthActions.setAppToken(newData));
                // Base query with new token as header.
                const newBaseQuery = createBaseQuery(baseUrl, extraHeaders);
                //Retry the last query with new data
                await newBaseQuery(args, api, extraOptions);
            } else {
                api.dispatch(AuthActions.logout());
            }
        }
        return result;
    };
