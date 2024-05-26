import { HttpProtocol } from "@app-core/@types/http";
import { LiveScoreService } from "@app-core/http-gateway";

const liveScoreService = LiveScoreService.injectEndpoints({
    endpoints: (builder) => ({
        getAllLeagues: builder.query<any, void>({
            query: () => ({
                url: `leagues`,
                method: HttpProtocol.GET,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllLeaguesQuery } = liveScoreService;
