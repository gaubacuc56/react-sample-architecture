import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../redux-manager/http-config';
export const exampleApi = createApi({
    reducerPath: 'exampleApi',
    baseQuery: baseQuery,
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: 'login',
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: data => ({
                url: 'register',
                method: 'POST',
                body: data,
            }),
        }),
        getUserDetails: builder.query({
            query: token => ({
                url: 'getUser',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});
export const { useLoginMutation, useGetUserDetailsQuery, useRegisterMutation } = exampleApi;
