/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HttpProtocol, HttpProtocolType } from "./http";
import { baseUrl } from "../constant/baseUrl";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RequestOptions {
  customBaseUrl?: string
  url: string;
  method: HttpProtocolType;
  body?: any;
}

type RequestConfig = Record<string, (body?: any ) => RequestOptions>;

export const appFetch = (reducerPath: string, request: RequestConfig, customBaseQuery?: string ) => {
  const url = customBaseQuery ?? baseUrl  
  return createApi({
    reducerPath: reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => {
      const endpoints: Record<string, any> = {};
      for (const [endpointName, requestFn] of Object.entries(request)) {
        const { url, method, body } = requestFn();
        if (method === HttpProtocol.get) {
          endpoints[endpointName] = builder.query({
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
      return endpoints;
    },
  });
};
