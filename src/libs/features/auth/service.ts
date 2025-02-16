import { HttpProtocol, HttpResponse } from "@app-core/@types/http";
import { AuthService } from "@app-core/http-gateway";
import { TOKEN_LIFETIME } from "@constant/common.constant";
import {
    IForgetPasswordRequest,
    ILoginRequest,
    IResetPasswordRequest,
} from "@libs/dtos/request/auth.request";
import {
    IGetUserResponse,
    ILoginResponse,
} from "@libs/dtos/response/auth.response";

export const authService = AuthService.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<HttpResponse<ILoginResponse>, ILoginRequest>({
            query: (data: ILoginRequest) => ({
                url: `auth/login`,
                method: HttpProtocol.POST,
                body: data,
            }),
        }),
        getUser: builder.query<IGetUserResponse, void>({
            query: () => ({
                url: `auth/me`,
                method: HttpProtocol.GET,
            }),
        }),

        forgetPassword: builder.mutation<void, IForgetPasswordRequest>({
            query: (data: IForgetPasswordRequest) => ({
                url: `auth/forgot-password`,
                method: HttpProtocol.POST,
                body: { ...data },
            }),
        }),

        resetPassword: builder.mutation<void, IResetPasswordRequest>({
            query: (data: IResetPasswordRequest) => ({
                url: `auth/reset-password`,
                method: HttpProtocol.POST,
                body: { ...data },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useGetUserQuery,
    useForgetPasswordMutation,
    useResetPasswordMutation,
} = authService;
