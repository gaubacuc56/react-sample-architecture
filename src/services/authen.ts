/* eslint-disable @typescript-eslint/no-unused-vars */
import {  appFetch } from "../app-core/appFetch";
// import { HttpProtocol } from "../app-core/http";

// interface IUser {
//   username: string,
//   password: string
// }
export interface IUserResponse {
  token: string
}
export interface ILoginResponse {
  token: string
}


export const authApi = appFetch('auth', {
  login: (data: string)    => ({
    url: 'login',
    method: 'POST',
    body: data,
    responseType: {} as ILoginResponse
  }),
  getUser: () => ({
    url: 'getUser',
    method: 'GET',
    responseType: {} as IUserResponse
  }),
});
export const {useLoginMutation, useGetUserQuery} = authApi;
/*
request: RequestConfig<T, R>
request: (data?: T) => 
*/
