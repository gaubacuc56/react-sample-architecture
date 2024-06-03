import { HttpProtocol, HttpResponse } from "@app-core/@types/http";
import { LiveScoreService } from "@app-core/http-gateway";
import { ISearchTeamResponse } from "@libs/dtos/response/soccer";

const liveScoreService = LiveScoreService.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeams: builder.query<HttpResponse<ISearchTeamResponse[]>, string>({
      query: (query) => ({
        url: `teams?${query}`,
        method: HttpProtocol.GET,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllTeamsQuery } = liveScoreService;
