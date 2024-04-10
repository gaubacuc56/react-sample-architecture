import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_PREFIX, APP_AUTHORIZATION_HEADER } from "../environment/http";
import { RootState } from "./rootReducer";
import { HttpStatus } from "../@types/http";
import { logout } from "@libs/features/auth/auth.slice";

export const baseQuery = fetchBaseQuery({
    baseUrl: `${API_PREFIX}`,
    prepareHeaders: (headers , {getState}) => {
        // You can add or modify headers here based on your needs
        const token = (getState() as RootState).authReducer.token;
        if (token) {
          headers.set('Authorization', `${APP_AUTHORIZATION_HEADER}${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
      },
})

export const baseQueryWithReAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === HttpStatus.FORBIDDEN) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
    if (refreshResult?.data) {
      //Retry the last query with new token
       await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout())
    }
  }
  return result;
 }