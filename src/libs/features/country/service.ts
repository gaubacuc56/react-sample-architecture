import { HttpProtocol, HttpResponse } from "@app-core/@types/http";
import { LiveScoreService } from "@app-core/http-gateway";
import { ISearchCountryResponse } from "@libs/dtos/response/country.response";

const liveScoreService = LiveScoreService.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query<
      HttpResponse<ISearchCountryResponse[]>,
      string
    >({
      query: (query) => ({
        url: `countries?${query}`,
        method: HttpProtocol.GET,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCountriesQuery } = liveScoreService;
