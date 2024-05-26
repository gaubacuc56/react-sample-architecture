import { createApi } from "@reduxjs/toolkit/query";
import { appConfig } from "@config/app.config";
import { baseQueryWithReAuth } from "../baseQuery";

export const AppService = createApi({
	reducerPath: "AppService",
	baseQuery: baseQueryWithReAuth(appConfig.apiDomain_dev),
	endpoints: () => ({}),
});
