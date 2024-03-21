import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../app-core/redux-manager/baseQuery';

import { ILoginRequest } from '../../dtos/request/auth.request';
import { ILoginResponse } from '../../dtos/response/auth.response';
import { HttpProtocol } from '../../app-core/http';

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
    }),
});

export const { useLoginMutation } = authService;