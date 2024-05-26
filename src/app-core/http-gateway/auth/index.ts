import { createApi } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@config/app.config";
import { baseQueryWithReAuth } from "@app-core/redux-manager/baseQuery";

export const AuthService = createApi({
    reducerPath: "AuthService",
    baseQuery: baseQueryWithReAuth(appConfig.apiDomain_dev),
    endpoints: () => ({}),
});
