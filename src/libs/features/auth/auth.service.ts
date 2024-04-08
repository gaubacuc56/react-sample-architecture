import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@app-core/redux-manager/baseQuery';
import { HttpProtocol } from '@app-core/@types/http';

import { ILoginRequest } from '@libs/dtos/request/auth.request';
import { IGetUserResponse, ILoginResponse, IRefreshTokenResponse } from '@libs/dtos/response/auth.response';

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
            }),
        }),
        refreshToken: builder.mutation<IRefreshTokenResponse, void>({
            query: () => ({
                url: `auth/refresh`,
                method: HttpProtocol.POST,
            }),
        }),
    }),
});

export const { useLoginMutation, useGetUserQuery } = authService;