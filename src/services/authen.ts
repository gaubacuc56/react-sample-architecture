import { appFetch } from "../app-core/appFetch";

interface IUser {
  username: string,
  password: string
}

export const authenApi = appFetch(
  'auth', 
  {
    login: (data: IUser) => ({
      url: 'login',
      method: "POST",
      body: data
    }),
    getUser: () => ({
      url: 'getUser',
      method: 'GET',
    }),
  }
);

// Destructure the generated hooks
export const { useLoginMutation, useGetUserQuery } = authenApi;
// Export the hooks
export const loginService = useLoginMutation;
export const getUserService = useGetUserQuery;