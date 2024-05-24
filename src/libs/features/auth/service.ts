import { AppService } from "@app-core/redux-manager/baseQuery";
import { HttpProtocol } from "@app-core/@types/http";

import { ILoginRequest } from "@libs/dtos/request/auth.request";
import {
	IGetUserResponse,
	ILoginResponse,
} from "@libs/dtos/response/auth.response";
import { TOKEN_LIFETIME } from "@constant/common.constant";

const authService = AppService.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<ILoginResponse, ILoginRequest>({
			query: (data: ILoginRequest) => ({
				url: `auth/login`,
				method: HttpProtocol.POST,
				body: { ...data, expiresInMins: TOKEN_LIFETIME },
			}),
		}),
		getUser: builder.query<IGetUserResponse, void>({
			query: () => ({
				url: `auth/me`,
				method: HttpProtocol.GET,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useLoginMutation, useGetUserQuery } = authService;
