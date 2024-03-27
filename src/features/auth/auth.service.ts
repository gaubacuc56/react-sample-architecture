import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/app-core/redux-manager/baseQuery';
import { HttpProtocol } from '@/app-core/http';

import { ILoginRequest } from '@/dtos/request/auth.request';
import { IGetUserResponse, ILoginResponse } from '@/dtos/response/auth.response';
import { AuthorizationHeader } from '.';

export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: baseQuery,
    endpoints: builder => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (data: ILoginRequest) => ({
                url: `auth/login`,
                method: HttpProtocol.POST,
                body: data
            }),
        }),
        getUser: builder.query<IGetUserResponse, void>({
            query: () => ({
                url: `auth/me`,
                method: HttpProtocol.GET,
                headers: AuthorizationHeader()
            }),
        }),
    }),
});

export const { useLoginMutation, useGetUserQuery } = authService;