import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../services';

import { ILoginRequest } from '../../dtos/request/auth.request';
import { ILoginResponse } from '../../dtos/response/auth.response';

export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: baseQuery,
    endpoints: builder => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (data: ILoginRequest) => ({
                url: `auth/login`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useLoginMutation } = authService;