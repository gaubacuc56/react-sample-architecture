/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
  QueryDefinition,
  createApi,
  fetchBaseQuery,
  ApiEndpointQuery,
  EndpointDefinition,
} from "@reduxjs/toolkit/query/react";
import { HttpProtocol, HttpProtocolType } from "./http";
import { baseUrl } from "../constant/baseUrl";
type EndpointType<T, R> =
   QueryDefinition<
      T,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      R,
      string
    >
  | MutationDefinition<
      T,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      R,
      string
    >;
export interface RequestOptions<T = unknown, R = unknown> {
  customBaseUrl?: string;
  url: string;
  method: HttpProtocolType;
  body?: T;
  responseType: R
}

type RequestConfig = Record<string, (data?: any) => RequestOptions>;

export const appFetch = (
  reducerPath: string,
  request: RequestConfig,
  customBaseQuery?: string
) => {
  const url = customBaseQuery ?? baseUrl;
  const api = createApi({
    reducerPath: reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) =>  {
   /*    const endpoints: Record<string, EndpointDefinition<any, any, any, any>>= {};
      for (const [endpointName, requestFn] of Object.entries(request)) {
        const { url, method, body, responseType } = requestFn();
        if (method === HttpProtocol.get) {
          endpoints[endpointName] =  builder.query({
            query: () => `${reducerPath}/${url}`,
          });

        } else {
          endpoints[endpointName] = builder.mutation({
            query: (data) => ({
              url: `${reducerPath}/${url}`,
              method,
              body: data || body,
            }),
          });
        }
      }
      return endpoints */
    },
  });
};
