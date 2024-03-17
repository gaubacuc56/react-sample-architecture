/* eslint-disable @typescript-eslint/no-unused-vars */
import { appFetch } from "../app-core/appFetch";
// import { HttpProtocol } from "../app-core/http";

// interface IUser {
//   username: string,
//   password: string
// }
export interface IUserResponse {
  token: string;
}
export interface ILoginResponse {
  token: string;
}

export const authApi = appFetch("auth", {
  login: () => ({
    url: "login",
    method: "POST",
    responseType: {} as ILoginResponse,
  }),
  getUser: () => ({
    url: "getUser",
    method: "GET",
    responseType: {} as IUserResponse,
  }),
});
export const { useLoginMutation, useGetUserQuery } = authApi;
authApi.endpoints;
/*
request: RequestConfig<T, R>
request: (data?: T) => 
*/
