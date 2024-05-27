import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "@app-core/redux-manager/baseQuery";

export const LiveScoreService = createApi({
	reducerPath: "LiveScoreService",
	baseQuery: baseQueryWithReAuth("https://v3.football.api-sports.io", {
		override: true,
		headers: {
			"x-rapidapi-host": "v3.football.api-sports.io",
			"x-rapidapi-key": "33fce0290be5b7f2f94845388db4ea1d",
		},
	}),
	endpoints: () => ({}),
});
