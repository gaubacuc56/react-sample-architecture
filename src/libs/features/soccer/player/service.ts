import { HttpProtocol, HttpResponse } from "@app-core/@types/http";
import { LiveScoreService } from "@app-core/http-gateway";
import { ISearchPlayerResponse } from "@libs/dtos/response/soccer";

const liveScoreService = LiveScoreService.injectEndpoints({
	endpoints: (builder) => ({
		getAllPlayers: builder.query<
			HttpResponse<ISearchPlayerResponse[]>,
			string
		>({
			query: (query) => ({
				url: `players?${query}`,
				method: HttpProtocol.GET,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetAllPlayersQuery } = liveScoreService;
