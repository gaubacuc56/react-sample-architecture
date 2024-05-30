import { HttpProtocol, HttpResponse } from "@app-core/@types/http";
import { LiveScoreService } from "@app-core/http-gateway";
import { ISearchLeagueResponse } from "@libs/dtos/response/soccer";

const liveScoreService = LiveScoreService.injectEndpoints({
	endpoints: (builder) => ({
		getAllLeagues: builder.query<
			HttpResponse<ISearchLeagueResponse[]>,
			string
		>({
			query: (query) => ({
				url: `leagues?${query}`,
				method: HttpProtocol.GET,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetAllLeaguesQuery } = liveScoreService;
